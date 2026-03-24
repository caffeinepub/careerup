# CareerUp

## Current State
- WelcomeScreen has a career-themed video background (mixkit office video)
- OnboardingScreen has 4 steps: Preferences, Resume Upload, AI Analysis, Confirm Profile
- DiscoverScreen shows swipe cards with letter-only CompanyAvatar (no images)
- JobDetailsSheet opens on card tap with full job info, no company images
- Dashboard has 5 tabs: Discover, Applied, Messages, Saved, Profile
- No market insights chart anywhere
- mockJobs.ts has 5 jobs with companyColor and companyInitial fields only

## Requested Changes (Diff)

### Add
- Career-themed video on the onboarding welcome/intro screen (embed in OnboardingScreen as an intro step or in StepPreferences header area, using a career/professional CDN video)
- Company logo images on each swipe card (replacing plain letter avatars) -- generated images stored in /assets/generated/
- Company office/culture image banner on each swipe card below the header
- Enhanced JobDetailsSheet with company logo image and a company photo section
- Market Insights screen/tab in the Dashboard with realistic charts:
  - Salary by role (bar chart)
  - Job growth by sector (horizontal bar)
  - Remote vs On-site vs Hybrid (donut/pie)
  - Top in-demand skills (bar chart)
- MarketInsightsScreen component using recharts

### Modify
- MockJob data: add `companyLogo` and `companyBanner` image path fields
- DiscoverScreen JobCard: replace CompanyAvatar letter with actual logo image
- JobDetailsSheet: show company logo image and a company culture image
- Dashboard: add "Insights" tab (chart icon) rendering MarketInsightsScreen
- OnboardingScreen: add a video intro before StepPreferences (brief career video clip with skip option)

### Remove
- Plain letter-only CompanyAvatar component in DiscoverScreen (replaced by image)

## Implementation Plan
1. Update MockJob interface and MOCK_JOBS data to include `companyLogo` (path to generated logo) and `companyBanner` (path to office banner)
2. Create MarketInsightsScreen using recharts with 4 realistic charts (salary, growth, work-mode, skills)
3. Update DiscoverScreen JobCard to show company logo image (with fallback)
4. Update JobDetailsSheet to show company logo image at top and a small culture image section
5. Add Insights tab to Dashboard linking to MarketInsightsScreen
6. Add a video intro step to OnboardingScreen (career-themed CDN video, auto-advances after 4s or user taps skip)
