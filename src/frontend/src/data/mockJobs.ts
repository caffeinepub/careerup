export interface MockJob {
  id: bigint;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  matchScore: number;
  aiReason: string;
  description: string;
  responsibilities: string[];
  perks: string[];
  employmentType: string;
  companyColor: string;
  companyInitial: string;
  companyLogo: string;
  companyBanner: string;
}

export const MOCK_JOBS: MockJob[] = [
  {
    id: 1n,
    title: "Senior Product Designer",
    company: "Stripe",
    location: "San Francisco, CA",
    salaryMin: 150000,
    salaryMax: 200000,
    skills: ["Figma", "Design Systems", "User Research"],
    matchScore: 98,
    aiReason: "Matches your Figma + Design Systems experience",
    description:
      "Join Stripe's world-class design team and shape the future of financial infrastructure.",
    responsibilities: [
      "Lead end-to-end design for new product features",
      "Build and maintain design system components",
      "Collaborate with engineers and PMs",
    ],
    perks: [
      "Remote flexible",
      "Equity package",
      "Health + dental",
      "Learning budget",
    ],
    employmentType: "Full-time",
    companyColor: "#6366f1",
    companyInitial: "S",
    companyLogo: "/assets/generated/logo-stripe-transparent.dim_120x120.png",
    companyBanner: "/assets/generated/company-office-banner.dim_800x400.jpg",
  },
  {
    id: 2n,
    title: "Frontend Engineer",
    company: "Airbnb",
    location: "Remote",
    salaryMin: 130000,
    salaryMax: 180000,
    skills: ["React", "TypeScript", "GraphQL"],
    matchScore: 94,
    aiReason: "Your React + TypeScript skills are a strong match",
    description:
      "Build beautiful, accessible user interfaces for millions of travelers worldwide.",
    responsibilities: [
      "Build performant React components",
      "Own frontend architecture decisions",
      "Mentor junior engineers",
    ],
    perks: ["Remote-first", "Travel credits", "Stock options", "401k match"],
    employmentType: "Full-time",
    companyColor: "#ef4444",
    companyInitial: "A",
    companyLogo: "/assets/generated/logo-airbnb-transparent.dim_120x120.png",
    companyBanner: "/assets/generated/company-office-banner.dim_800x400.jpg",
  },
  {
    id: 3n,
    title: "UX Lead",
    company: "Notion",
    location: "New York, NY",
    salaryMin: 140000,
    salaryMax: 190000,
    skills: ["UX Research", "Prototyping", "Leadership"],
    matchScore: 91,
    aiReason: "Your leadership + UX research background aligns perfectly",
    description:
      "Lead design strategy for Notion's collaborative workspace platform.",
    responsibilities: [
      "Define UX strategy and vision",
      "Lead a team of 4 designers",
      "Run user research programs",
    ],
    perks: ["Hybrid schedule", "Equity", "Wellness stipend", "Book budget"],
    employmentType: "Full-time",
    companyColor: "#1f2937",
    companyInitial: "N",
    companyLogo: "/assets/generated/logo-notion-transparent.dim_120x120.png",
    companyBanner: "/assets/generated/company-office-banner.dim_800x400.jpg",
  },
  {
    id: 4n,
    title: "Staff Engineer",
    company: "Linear",
    location: "Remote",
    salaryMin: 180000,
    salaryMax: 250000,
    skills: ["React", "Node.js", "Architecture"],
    matchScore: 88,
    aiReason: "Strong match on system architecture + full-stack skills",
    description:
      "Shape Linear's technical direction and build tools developers love.",
    responsibilities: [
      "Drive technical roadmap",
      "Design scalable systems",
      "Lead cross-team initiatives",
    ],
    perks: [
      "Fully remote",
      "Top-of-market comp",
      "Annual retreat",
      "Equipment budget",
    ],
    employmentType: "Full-time",
    companyColor: "#5c6bc0",
    companyInitial: "L",
    companyLogo: "/assets/generated/logo-linear-transparent.dim_120x120.png",
    companyBanner: "/assets/generated/company-office-banner.dim_800x400.jpg",
  },
  {
    id: 5n,
    title: "Product Manager",
    company: "Figma",
    location: "San Francisco, CA",
    salaryMin: 160000,
    salaryMax: 220000,
    skills: ["Product Strategy", "Data Analysis", "Leadership"],
    matchScore: 85,
    aiReason: "Your product + design background is a rare combination",
    description:
      "Define and execute the product vision for Figma's collaboration features.",
    responsibilities: [
      "Own product roadmap",
      "Analyze user data to drive decisions",
      "Work cross-functionally",
    ],
    perks: ["Hybrid", "Equity", "Health insurance", "Parental leave"],
    employmentType: "Full-time",
    companyColor: "#f59e0b",
    companyInitial: "F",
    companyLogo: "/assets/generated/logo-figma-transparent.dim_120x120.png",
    companyBanner: "/assets/generated/company-office-banner.dim_800x400.jpg",
  },
];
