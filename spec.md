# CareerUp Admin Panel - Wire All CTAs

## Current State
Admin panel exists with all 10 sections. Several CTAs are present in the UI but have no handlers:
- Header: Notifications bell (no panel/dropdown), Admin User dropdown (no menu)
- Recruiters: "Add Recruiter" button (no modal/handler)
- Subscriptions: No "Reactivate" for cancelled plans, no "View Details" per row
- Transactions: "Invoice" button on every row (no handler)
- Settings: "Add Admin" and "Remove" admin buttons (no handlers)

## Requested Changes (Diff)

### Add
- Header notifications bell: clicking opens a dropdown/panel with sample notifications (flagged content, new signup, ticket opened, etc.)
- Header admin user dropdown: clicking opens a menu with Admin Profile, Change Password, and Sign Out options
- Recruiters "Add Recruiter" modal: form with Company Name, Contact Name, Email, Plan (dropdown), submit saves to list
- Subscriptions "View Details" button per row: opens a modal with plan details, billing history, seats usage
- Subscriptions "Reactivate" button for cancelled plans: sets status back to Active
- Transactions "Invoice" button: opens a modal with invoice details (company, amount, plan, date, method, transaction ID) + a "Download PDF" button (simulated print/download)
- Settings "Add Admin" modal: form with Name, Email, Role (dropdown: Moderator, Support Agent), submit saves to admin list
- Settings "Remove" button for non-Super Admin users: confirm dialog before removing from list

### Modify
- AdminTransactions.tsx: wire Invoice button to open invoice detail modal with download option
- AdminSubscriptions.tsx: add View Details modal + Reactivate button for cancelled rows
- AdminSettings.tsx: wire Add Admin button to modal, wire Remove buttons with confirm dialog; state should be local (useState) not hardcoded ADMINS constant
- AdminRecruiters.tsx: wire Add Recruiter button to a modal form
- AdminApp.tsx: wire header bell and user dropdown

### Remove
- Nothing removed

## Implementation Plan
1. AdminApp.tsx: add notifications state + bell dropdown panel; add admin user dropdown menu (profile info, sign out)
2. AdminRecruiters.tsx: add Add Recruiter modal with form; add to state on submit
3. AdminSubscriptions.tsx: add View Details modal; add Reactivate button/action for cancelled
4. AdminTransactions.tsx: wire Invoice button to open detail modal with printable invoice layout + Download button (window.print or blob URL)
5. AdminSettings.tsx: convert ADMINS to useState; wire Add Admin modal with form; wire Remove with confirm dialog
