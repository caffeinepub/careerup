# CareerUp

## Current State
The project contains all mobile job seeker screens (SplashScreen, WelcomeScreen, OnboardingScreen, Dashboard, DiscoverScreen, SearchScreen, ApplicationsScreen, MessagesScreen, ProfileScreen, MarketInsightsScreen, ChatScreen, SavedScreen) under `src/frontend/src/screens/`. However, App.tsx currently defaults to the Recruiter Dashboard and only routes to admin via `#admin`. The mobile app is completely inaccessible.

## Requested Changes (Diff)

### Add
- `MobileApp` component in App.tsx that runs the Splash → Welcome → Onboarding → Dashboard flow
- Routing logic so the mobile app is the default view (no hash or `#mobile`)
- Small footer link on the recruiter login to navigate to `#recruiter`

### Modify
- App.tsx routing: default → Mobile App, `#recruiter` → Recruiter Dashboard, `#admin` → Admin Panel
- `RecruiterEntryPoint` and `AdminEntryPoint` to use `#recruiter` and `#admin` hashes respectively

### Remove
- Nothing removed

## Implementation Plan
1. Update App.tsx to detect hash and route to mobile (`""` or `"#mobile"`), recruiter (`#recruiter`), or admin (`#admin`)
2. Add `MobileApp` component wrapping the splash/welcome/onboarding/dashboard flow
3. Add small "Recruiter Login" link at bottom of WelcomeScreen pointing to `#recruiter`
4. Update login screens to use correct hashes when switching between modes
