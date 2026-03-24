# CareerUp

## Current State
MarketInsightsScreen has 4 charts: salary (bar, USD), job growth (bar), work mode (pie), top skills (bar). No hiring companies or remote opportunities sections exist.

## Requested Changes (Diff)

### Add
- Top 12 Hiring Companies section with company cards; tapping opens a modal with the full list of all hiring companies
- Remote Opportunities section with company cards; tapping opens a modal with all remote-friendly companies
- Line graph for salary by role in LPA

### Modify
- Salary chart: convert from USD thousands to Indian LPA (₹), switch from bar chart to line chart
- All market data updated to reflect latest 2025 India job market scenario
- Subtitle updated from USD to LPA

### Remove
- Dollar ($) currency symbol references in salary chart

## Implementation Plan
1. Update salaryData to Indian LPA values (e.g., Product Designer: 18L, Staff Engineer: 45L)
2. Replace BarChart with LineChart for salary section
3. Update growthData and skillsData to reflect 2025 India market
4. Add hiringCompaniesData array (20+ companies)
5. Add remoteCompaniesData array (20+ companies)
6. Add Top 12 Hiring Companies section card showing first 12, with "View All" tap opening a modal
7. Add Remote Opportunities section card showing preview, with tap opening a modal
8. Build modal components for both sections
