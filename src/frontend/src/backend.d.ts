import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UpdateJobListingInput {
    id: Id;
    title: string;
    responsibilities: Array<string>;
    skillsRequired: Array<string>;
    description: string;
    employmentType: EmploymentType;
    company: string;
    perks: Array<string>;
    salaryRange: {
        max: bigint;
        min: bigint;
    };
    location: string;
}
export interface JobApplication {
    status: Variant_applied_rejected_interviewing_offered;
    jobListingId: Id;
    timestamp: bigint;
}
export interface JobListing {
    id: Id;
    title: string;
    responsibilities: Array<string>;
    skillsRequired: Array<string>;
    description: string;
    employmentType: EmploymentType;
    company: string;
    timestamp: bigint;
    perks: Array<string>;
    salaryRange: {
        max: bigint;
        min: bigint;
    };
    location: string;
}
export interface Profile {
    bio: string;
    experienceLevel: ExperienceLevel;
    name: string;
    jobPreferences: Variant_onsite_remote_hybrid;
    email: string;
    resumeText: string;
    skills: Array<string>;
    location: string;
    desiredSalaryRange: {
        max: bigint;
        min: bigint;
    };
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type Id = bigint;
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface PartialJobListing {
    title: string;
    responsibilities: Array<string>;
    skillsRequired: Array<string>;
    description: string;
    employmentType: EmploymentType;
    company: string;
    perks: Array<string>;
    salaryRange: {
        max: bigint;
        min: bigint;
    };
    location: string;
}
export enum EmploymentType {
    internship = "internship",
    contract = "contract",
    partTime = "partTime",
    fullTime = "fullTime"
}
export enum ExperienceLevel {
    mid = "mid",
    junior = "junior",
    lead = "lead",
    senior = "senior"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_applied_rejected_interviewing_offered {
    applied = "applied",
    rejected = "rejected",
    interviewing = "interviewing",
    offered = "offered"
}
export enum Variant_onsite_remote_hybrid {
    onsite = "onsite",
    remote = "remote",
    hybrid = "hybrid"
}
export interface backendInterface {
    addJobListing(listing: PartialJobListing): Promise<Id>;
    applyToJob(jobListingId: Id): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteJobListing(jobId: Id): Promise<void>;
    getAllJobListings(): Promise<Array<JobListing>>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallersSavedJobs(profile: Profile): Promise<Array<JobListing>>;
    getCurrentJobApplicationsProfileInput(user: Principal, profile: Profile): Promise<Array<JobApplication>>;
    getCurrentJobListings(user: Principal, profile: Profile): Promise<Array<JobListing>>;
    getJobListing(id: Id): Promise<JobListing>;
    getLatestJobListings(): Promise<Array<JobListing>>;
    getSavedJobsProfileInput(user: Principal, profile: Profile): Promise<Array<JobListing>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    saveJob(jobListingId: Id): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    swipeLeft(jobListingId: Id): Promise<void>;
    swipeRight(jobListingId: Id): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unsaveJob(jobListingId: Id): Promise<void>;
    updateJobListing(input: UpdateJobListingInput): Promise<Id>;
    verifyToken(tokenId: string): Promise<Principal>;
}
