// CareerUp - AI-powered job matching app backend

import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Generic shared data types
  type Id = Nat;

  // Pro Subscription Logic
  module ProSubscription {
    public type Status = {
      #active;
      #inactive;
    };

    public func compare(status1 : Status, status2 : Status) : Order.Order {
      switch (status1, status2) {
        case (#active, #active) { #equal };
        case (#active, #inactive) { #greater };
        case (#inactive, #active) { #less };
        case (#inactive, #inactive) { #equal };
      };
    };
  };

  // 1. User Profiles
  module UserProfile {
    public type ExperienceLevel = {
      #junior;
      #mid;
      #senior;
      #lead;
    };

    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      Text.compare(profile1.email, profile2.email);
    };

    public type Profile = {
      name : Text;
      email : Text;
      bio : Text;
      skills : [Text];
      experienceLevel : ExperienceLevel;
      location : Text;
      jobPreferences : {
        #remote;
        #hybrid;
        #onsite;
      };
      desiredSalaryRange : {
        min : Nat;
        max : Nat;
      };
      resumeText : Text;
    };
  };

  // 2. Job Listings
  module EmploymentType {
    public type EmploymentType = {
      #fullTime;
      #partTime;
      #contract;
      #internship;
    };

    public func compare(type1 : EmploymentType, type2 : EmploymentType) : Order.Order {
      switch (type1, type2) {
        case (#fullTime, #fullTime) { #equal };
        case (#fullTime, _) { #less };
        case (#partTime, #fullTime) { #greater };
        case (#partTime, #partTime) { #equal };
        case (#partTime, #contract) { #less };
        case (#partTime, #internship) { #less };
        case (#contract, #internship) { #greater };
        case (#contract, #contract) { #equal };
        case (#contract, #fullTime) { #greater };
        case (#contract, #partTime) { #greater };
        case (#internship, #internship) { #equal };
        case (#internship, _) { #less };
      };
    };
  };

  module JobListing {
    public type JobListing = {
      id : Id;
      title : Text;
      company : Text;
      location : Text;
      salaryRange : {
        min : Nat;
        max : Nat;
      };
      description : Text;
      responsibilities : [Text];
      skillsRequired : [Text];
      perks : [Text];
      employmentType : EmploymentType.EmploymentType;
      timestamp : Int;
    };

    public func compare(job1 : JobListing, job2 : JobListing) : Order.Order {
      Nat.compare(job1.id, job2.id);
    };

    public func compareByTimestamp(job1 : JobListing, job2 : JobListing) : Order.Order {
      Int.compare(job2.timestamp, job1.timestamp);
    };
  };

  // 3. Job Applications
  module JobApplication {
    public type JobApplication = {
      jobListingId : Id;
      status : {
        #applied;
        #interviewing;
        #rejected;
        #offered;
      };
      timestamp : Int;
    };

    public func compare(app1 : JobApplication, app2 : JobApplication) : Order.Order {
      Int.compare(app2.timestamp, app1.timestamp);
    };
  };

  // 4. System State
  var nextJobListingId = 1;

  // Initialize access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles - confirmed by login and email
  let userProfiles = Map.empty<Principal, UserProfile.Profile>();

  func getUserProfileInternal(user : Principal) : UserProfile.Profile {
    switch (userProfiles.get(user)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) { profile };
    };
  };

  // Stripe integration
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;
  let proSubscriptionStatus = Map.empty<Principal, ProSubscription.Status>();

  public query ({ caller }) func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public type TokenType = {
    #daily;
    #monthly;
    #yearly;
  };

  module TokenType {
    public func compare(x : TokenType, y : TokenType) : Order.Order {
      Nat.compare(tokenTypeOrder(x), tokenTypeOrder(y));
    };
    func tokenTypeOrder(t : TokenType) : Nat {
      switch (t) {
        case (#daily) { 0 };
        case (#monthly) { 1 };
        case (#yearly) { 2 };
      };
    };
  };

  let tokenProducts = Map.empty<TokenType, Text>(); // (tokenType, productId)
  let mintedTokens = Map.empty<Text, Principal>(); // (tokenId, owner)

  func getTokenProductId(tokenType : TokenType) : Text {
    switch (tokenProducts.get(tokenType)) {
      case (null) { Runtime.trap("Token is not purchased yet") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func verifyToken(tokenId : Text) : async Principal {
    switch (mintedTokens.get(tokenId)) {
      case (null) { Runtime.trap("Token does not exist") };
      case (?owner) { owner };
    };
  };

  // Stripe integration - Admin only
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  // Add more data and functions as needed
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Job applications - user must be logged in and persistent
  let savedJobs = Map.empty<Principal, Set.Set<Id>>(); // Saved jobs by user
  let jobApplications = Map.empty<Principal, Map.Map<Id, JobApplication.JobApplication>>(); // Job applications by user
  let swipeHistory = Map.empty<Principal, Set.Set<Id>>(); // Swiped jobs by user

  // Job listings - persistent
  let jobListings = Map.empty<Id, JobListing.JobListing>();

  public type PartialJobListing = {
    title : Text;
    company : Text;
    location : Text;
    salaryRange : {
      min : Nat;
      max : Nat;
    };
    description : Text;
    responsibilities : [Text];
    skillsRequired : [Text];
    perks : [Text];
    employmentType : EmploymentType.EmploymentType;
  };

  // Add job listing - must be done by human admin
  public shared ({ caller }) func addJobListing(listing : PartialJobListing) : async Id {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let jobId = nextJobListingId;
    nextJobListingId += 1;

    let jobListing : JobListing.JobListing = {
      listing with
      id = jobId;
      timestamp = Time.now();
    };

    jobListings.add(jobId, jobListing);
    jobId;
  };

  // Job matching - open to everyone
  func filterJobs(jobFilter : (JobListing.JobListing, UserProfile.Profile) -> Bool, userProfile : UserProfile.Profile) : [JobListing.JobListing] {
    jobListings.values().toArray().filter(func(job) { jobFilter(job, userProfile) });
  };

  // Job matching - for logged in user only
  func getUserMatchingJobs(jobFilter : (JobListing.JobListing, UserProfile.Profile) -> Bool, userProfile : UserProfile.Profile, user : Principal) : [JobListing.JobListing] {
    let userSwiped = switch (swipeHistory.get(user)) {
      case (null) { Set.empty<Id>() };
      case (?s) { s };
    };

    let userSaved = switch (savedJobs.get(user)) {
      case (null) { Set.empty<Id>() };
      case (?s) { s };
    };

    jobListings.values().toArray().filter(
      func(job) {
        let notSwipedOrSaved = not userSwiped.contains(job.id) and not userSaved.contains(job.id);
        let notRejected = switch (jobApplications.get(user)) {
          case (null) { true };
          case (?longMap) {
            switch (longMap.get(job.id)) {
              case (null) { true };
              case (?app) {
                switch (app.status) {
                  case (#rejected) { false };
                  case (_) { true };
                };
              };
            };
          };
        };
        jobFilter(job, userProfile) and notSwipedOrSaved and notRejected;
      }
    );
  };

  public shared ({ caller }) func applyToJob(jobListingId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can apply to jobs");
    };

    if (jobListingId > 0) {
      let application : JobApplication.JobApplication = {
        jobListingId;
        status = #applied;
        timestamp = Time.now();
      };
      switch (jobApplications.get(caller)) {
        case (null) {
          let newMap = Map.empty<Id, JobApplication.JobApplication>();
          newMap.add(jobListingId, application);
          jobApplications.add(caller, newMap);
        };
        case (?apps) {
          apps.add(jobListingId, application);
        };
      };
    };
  };

  public shared ({ caller }) func unsaveJob(jobListingId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unsave jobs");
    };

    switch (savedJobs.get(caller)) {
      case (null) { Runtime.trap("Job is not saved") };
      case (?set) {
        set.remove(jobListingId);
      };
    };
  };

  public shared ({ caller }) func saveJob(jobListingId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save jobs");
    };

    if (jobListingId > 0) {
      switch (savedJobs.get(caller)) {
        case (null) {
          let newSet = Set.singleton<Id>(jobListingId);
          savedJobs.add(caller, newSet);
        };
        case (?set) {
          set.add(jobListingId);
        };
      };
    };
  };

  public shared ({ caller }) func swipeRight(jobListingId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can swipe on jobs");
    };

    recordSwipe(caller, jobListingId);
  };

  public shared ({ caller }) func swipeLeft(jobListingId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can swipe on jobs");
    };

    recordSwipe(caller, jobListingId);
  };

  func recordSwipe(user : Principal, jobListingId : Id) {
    if (jobListingId > 0) {
      let newSwipeId = Set.singleton<Id>(jobListingId);
      switch (swipeHistory.get(user)) {
        case (null) {
          swipeHistory.add(user, newSwipeId);
        };
        case (?set) {
          let newSet = set.union(newSwipeId);
          swipeHistory.add(user, newSet);
        };
      };
    };
  };

  public query func getAllJobListings() : async [JobListing.JobListing] {
    jobListings.values().toArray().sort();
  };

  public query func getLatestJobListings() : async [JobListing.JobListing] {
    jobListings.values().toArray().sort(JobListing.compareByTimestamp);
  };

  public query ({ caller }) func getSavedJobsProfileInput(user : Principal, profile : UserProfile.Profile) : async [JobListing.JobListing] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own saved jobs");
    };

    let userSaved = switch (savedJobs.get(user)) {
      case (null) { Set.empty<Id>() };
      case (?s) { s };
    };

    jobListings.values().toArray().filter(
      func(job) {
        userSaved.contains(job.id);
      }
    );
  };

  public query ({ caller }) func getCurrentJobListings(user : Principal, profile : UserProfile.Profile) : async [JobListing.JobListing] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own job listings");
    };

    getUserMatchingJobs(func(_job, _currentUser) { true }, profile, user);
  };

  public query ({ caller }) func getCurrentJobApplicationsProfileInput(user : Principal, profile : UserProfile.Profile) : async [JobApplication.JobApplication] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own applications");
    };

    let userApps = switch (jobApplications.get(user)) {
      case (null) { Map.empty<Id, JobApplication.JobApplication>() };
      case (?apps) { apps };
    };
    userApps.values().toArray();
  };

  public query ({ caller }) func getCallersSavedJobs(profile : UserProfile.Profile) : async [JobListing.JobListing] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view saved jobs");
    };

    let userSaved = switch (savedJobs.get(caller)) {
      case (null) { Set.empty<Id>() };
      case (?s) { s };
    };

    jobListings.values().toArray().filter(
      func(job) {
        userSaved.contains(job.id);
      }
    );
  };

  public query ({ caller }) func getJobListing(id : Id) : async JobListing.JobListing {
    switch (jobListings.get(id)) {
      case (null) { Runtime.trap("Job listing not found") };
      case (?listing) { listing };
    };
  };

  // Get caller's user profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile.Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?profile };
    };
  };

  public shared ({ caller }) func deleteJobListing(jobId : Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    jobListings.remove(jobId);
  };

  // Update job listing - must be done by human admin
  public type UpdateJobListingInput = {
    id : Id;
    title : Text;
    company : Text;
    location : Text;
    salaryRange : {
      min : Nat;
      max : Nat;
    };
    description : Text;
    responsibilities : [Text];
    skillsRequired : [Text];
    perks : [Text];
    employmentType : EmploymentType.EmploymentType;
  };

  public shared ({ caller }) func updateJobListing(input : UpdateJobListingInput) : async Id {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (jobListings.get(input.id)) {
      case (null) { Runtime.trap("Job listing not found") };
      case (?existing) {
        let updatedListing : JobListing.JobListing = {
          input with
          timestamp = existing.timestamp; // Preserve original timestamp
        };
        jobListings.add(input.id, updatedListing);
        input.id;
      };
    };
  };

  // Save caller's user profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile.Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    userProfiles.add(caller, profile);
  };

  // Get another user's profile (admin or self only)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile.Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    switch (userProfiles.get(user)) {
      case (null) { null };
      case (?profile) { ?profile };
    };
  };

  // Stripe checkout - users only
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };

    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };
};
