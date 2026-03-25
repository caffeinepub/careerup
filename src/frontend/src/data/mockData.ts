export type CandidateStatus =
  | "Applied"
  | "Screening"
  | "Interviewing"
  | "Offer"
  | "Rejected";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  matchScore: number;
  appliedDate: string;
  lastActivity: string;
  avatar: string;
  photo?: string;
  email: string;
  status: CandidateStatus;
  jobTitle: string;
  bio?: string;
  education?: string;
  phone?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRecruiter: boolean;
}

export interface Conversation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateRole: string;
  avatar: string;
  photo?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

export const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Priya Sharma",
    role: "Senior Frontend Engineer",
    location: "Bangalore, IN",
    experience: "5 yrs",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    matchScore: 96,
    appliedDate: "Mar 20, 2025",
    lastActivity: "2h ago",
    avatar: "PS",
    photo: "/assets/generated/candidate-2.dim_200x200.jpg",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    status: "Screening",
    jobTitle: "Senior Frontend Engineer",
    bio: "Passionate frontend engineer with 5 years of experience building scalable React applications for fintech and SaaS companies.",
    education: "B.Tech Computer Science, IIT Bangalore",
  },
  {
    id: "c2",
    name: "Arjun Mehta",
    role: "Product Manager",
    location: "Mumbai, IN",
    experience: "7 yrs",
    skills: ["Roadmapping", "Agile", "Figma", "SQL"],
    matchScore: 91,
    appliedDate: "Mar 19, 2025",
    lastActivity: "5h ago",
    avatar: "AM",
    photo: "/assets/generated/candidate-1.dim_200x200.jpg",
    email: "arjun.mehta@example.com",
    phone: "+91 87654 32109",
    status: "Interviewing",
    jobTitle: "Senior Product Manager",
    bio: "Strategic product leader who has launched 3 consumer apps to 1M+ users. Expert in 0-to-1 product development.",
    education: "MBA, IIM Ahmedabad",
  },
  {
    id: "c3",
    name: "Kiran Patel",
    role: "UX Designer",
    location: "Pune, IN",
    experience: "4 yrs",
    skills: ["Figma", "Research", "Prototyping", "Design Systems"],
    matchScore: 88,
    appliedDate: "Mar 18, 2025",
    lastActivity: "1d ago",
    avatar: "KP",
    photo: "/assets/generated/candidate-4.dim_200x200.jpg",
    email: "kiran.patel@example.com",
    phone: "+91 76543 21098",
    status: "Applied",
    jobTitle: "UX Designer",
    bio: "Design systems advocate with deep expertise in user research and accessibility. Previously at Flipkart and Swiggy.",
    education: "B.Des, NID Ahmedabad",
  },
  {
    id: "c4",
    name: "Nisha Reddy",
    role: "Data Scientist",
    location: "Hyderabad, IN",
    experience: "3 yrs",
    skills: ["Python", "ML", "TensorFlow", "PySpark"],
    matchScore: 93,
    appliedDate: "Mar 17, 2025",
    lastActivity: "3h ago",
    avatar: "NR",
    photo: "/assets/generated/candidate-6.dim_200x200.jpg",
    email: "nisha.reddy@example.com",
    phone: "+91 65432 10987",
    status: "Offer",
    jobTitle: "Data Scientist",
    bio: "Machine learning engineer specialized in NLP and recommendation systems. Published 2 papers at NeurIPS.",
    education: "M.Tech AI/ML, IIIT Hyderabad",
  },
  {
    id: "c5",
    name: "Rahul Gupta",
    role: "Backend Engineer",
    location: "Delhi, IN",
    experience: "6 yrs",
    skills: ["Go", "Kubernetes", "AWS", "gRPC"],
    matchScore: 87,
    appliedDate: "Mar 16, 2025",
    lastActivity: "4h ago",
    avatar: "RG",
    photo: "/assets/generated/candidate-3.dim_200x200.jpg",
    email: "rahul.gupta@example.com",
    phone: "+91 54321 09876",
    status: "Interviewing",
    jobTitle: "Backend Engineer",
    bio: "Distributed systems expert with experience handling millions of RPM. Built payment infrastructure at Paytm.",
    education: "B.Tech CSE, Delhi Technological University",
  },
  {
    id: "c6",
    name: "Sneha Nair",
    role: "DevOps Engineer",
    location: "Chennai, IN",
    experience: "5 yrs",
    skills: ["Docker", "CI/CD", "Terraform", "ArgoCD"],
    matchScore: 85,
    appliedDate: "Mar 15, 2025",
    lastActivity: "6h ago",
    avatar: "SN",
    photo: "/assets/generated/candidate-8.dim_200x200.jpg",
    email: "sneha.nair@example.com",
    phone: "+91 43210 98765",
    status: "Screening",
    jobTitle: "DevOps Engineer",
    bio: "Cloud-native infrastructure specialist who reduced deployment time by 70% at Zoho. Certified AWS & GCP architect.",
    education: "B.E. IT, Anna University",
  },
  {
    id: "c7",
    name: "Amit Joshi",
    role: "Full Stack Developer",
    location: "Kolkata, IN",
    experience: "4 yrs",
    skills: ["React", "Django", "PostgreSQL", "Redis"],
    matchScore: 82,
    appliedDate: "Mar 14, 2025",
    lastActivity: "1d ago",
    avatar: "AJ",
    photo: "/assets/generated/candidate-7.dim_200x200.jpg",
    email: "amit.joshi@example.com",
    phone: "+91 32109 87654",
    status: "Applied",
    jobTitle: "Full Stack Developer",
    bio: "Full stack engineer passionate about building developer tools and APIs. Open source contributor with 2k+ GitHub stars.",
    education: "B.Tech CSE, Jadavpur University",
  },
  {
    id: "c8",
    name: "Deepa Krishnan",
    role: "Mobile Developer",
    location: "Bangalore, IN",
    experience: "3 yrs",
    skills: ["React Native", "iOS", "Android", "Firebase"],
    matchScore: 89,
    appliedDate: "Mar 13, 2025",
    lastActivity: "2d ago",
    avatar: "DK",
    photo: "/assets/generated/candidate-5.dim_200x200.jpg",
    email: "deepa.krishnan@example.com",
    phone: "+91 21098 76543",
    status: "Rejected",
    jobTitle: "Mobile Developer",
    bio: "Mobile-first engineer who shipped 5 apps to the Play Store and App Store. Specializes in performance optimization.",
    education: "B.Tech IT, VIT Vellore",
  },
  {
    id: "c9",
    name: "Vikram Singh",
    role: "Security Engineer",
    location: "Noida, IN",
    experience: "8 yrs",
    skills: ["Pen Testing", "SIEM", "IAM", "SOC"],
    matchScore: 78,
    appliedDate: "Mar 12, 2025",
    lastActivity: "3d ago",
    avatar: "VS",
    email: "vikram@example.com",
    status: "Applied",
    jobTitle: "Security Engineer",
    bio: "Cybersecurity veteran with OSCP and CISSP certifications. Led red team operations for Fortune 500 clients.",
    education: "M.Tech Cybersecurity, IIIT Delhi",
  },
  {
    id: "c10",
    name: "Ananya Bose",
    role: "Cloud Architect",
    location: "Bangalore, IN",
    experience: "9 yrs",
    skills: ["AWS", "GCP", "Azure", "FinOps"],
    matchScore: 94,
    appliedDate: "Mar 11, 2025",
    lastActivity: "4d ago",
    avatar: "AB",
    email: "ananya@example.com",
    status: "Screening",
    jobTitle: "Cloud Architect",
    bio: "Multi-cloud architect who designed infrastructure for 3 unicorn startups. Saved $2M/year through FinOps practices.",
    education: "B.Tech CSE, NIT Durgapur",
  },
  {
    id: "c11",
    name: "Siddharth Rao",
    role: "ML Engineer",
    location: "Hyderabad, IN",
    experience: "4 yrs",
    skills: ["PyTorch", "MLOps", "LLMs", "FastAPI"],
    matchScore: 90,
    appliedDate: "Mar 10, 2025",
    lastActivity: "5d ago",
    avatar: "SR",
    email: "siddharth@example.com",
    status: "Applied",
    jobTitle: "ML Engineer",
    bio: "GenAI specialist who deployed large language models to production at Juspay. Fine-tuned LLaMA and Mistral models.",
    education: "M.Tech ML, IISC Bangalore",
  },
  {
    id: "c12",
    name: "Lakshmi Iyer",
    role: "Engineering Manager",
    location: "Bangalore, IN",
    experience: "10 yrs",
    skills: ["Leadership", "Architecture", "Hiring", "OKRs"],
    matchScore: 86,
    appliedDate: "Mar 9, 2025",
    lastActivity: "1w ago",
    avatar: "LI",
    email: "lakshmi@example.com",
    status: "Interviewing",
    jobTitle: "Engineering Manager",
    bio: "Engineering leader who scaled teams from 5 to 50 engineers. Previously VP Engineering at a Series C startup.",
    education: "B.Tech CSE, IIT Madras",
  },
  {
    id: "c13",
    name: "Rohit Verma",
    role: "ML Engineer",
    location: "Delhi, IN",
    experience: "5 yrs",
    skills: ["NLP", "Transformers", "Python", "MLflow"],
    matchScore: 81,
    appliedDate: "Mar 8, 2025",
    lastActivity: "1w ago",
    avatar: "RV",
    email: "rohit@example.com",
    status: "Applied",
    jobTitle: "ML Engineer",
    bio: "NLP researcher turned engineer with 4 years of production experience. Speaker at ACL and EMNLP conferences.",
    education: "M.Tech AI, IIT Delhi",
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "cv1",
    candidateId: "c1",
    candidateName: "Priya Sharma",
    candidateRole: "Senior Frontend Engineer",
    avatar: "PS",
    photo: "/assets/generated/candidate-2.dim_200x200.jpg",
    lastMessage: "That sounds great! Looking forward to the interview.",
    timestamp: "2h ago",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "recruiter",
        text: "Hi Priya! We've reviewed your profile and are impressed with your React expertise. Would you be available for a 30-minute call this week?",
        timestamp: "Yesterday",
        isRecruiter: true,
      },
      {
        id: "m2",
        senderId: "c1",
        text: "Hi! Thank you so much. I'd be happy to chat. I'm free Tuesday and Thursday afternoon.",
        timestamp: "Yesterday",
        isRecruiter: false,
      },
      {
        id: "m3",
        senderId: "recruiter",
        text: "Perfect. Let's lock in Thursday at 3 PM IST. I'll send a calendar invite.",
        timestamp: "2h ago",
        isRecruiter: true,
      },
      {
        id: "m4",
        senderId: "c1",
        text: "That sounds great! Looking forward to the interview.",
        timestamp: "2h ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv2",
    candidateId: "c2",
    candidateName: "Arjun Mehta",
    candidateRole: "Product Manager",
    avatar: "AM",
    photo: "/assets/generated/candidate-1.dim_200x200.jpg",
    lastMessage: "I'll bring a case study to the interview.",
    timestamp: "5h ago",
    unread: 1,
    messages: [
      {
        id: "m5",
        senderId: "recruiter",
        text: "Arjun, your product background at Paytm is exactly what we're looking for. Can we schedule a product sense interview?",
        timestamp: "Yesterday",
        isRecruiter: true,
      },
      {
        id: "m6",
        senderId: "c2",
        text: "Absolutely! I'd love to explore this opportunity. What does the process look like?",
        timestamp: "Yesterday",
        isRecruiter: false,
      },
      {
        id: "m7",
        senderId: "recruiter",
        text: "There's a 45-min product case study, then a 30-min leadership interview with our Head of Product.",
        timestamp: "6h ago",
        isRecruiter: true,
      },
      {
        id: "m8",
        senderId: "c2",
        text: "I'll bring a case study to the interview.",
        timestamp: "5h ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv3",
    candidateId: "c4",
    candidateName: "Nisha Reddy",
    candidateRole: "Data Scientist",
    avatar: "NR",
    photo: "/assets/generated/candidate-6.dim_200x200.jpg",
    lastMessage: "When can I expect the offer letter?",
    timestamp: "3h ago",
    unread: 3,
    messages: [
      {
        id: "m9",
        senderId: "recruiter",
        text: "Nisha, congratulations! The team loved your ML interview. We'd like to extend an offer.",
        timestamp: "Yesterday",
        isRecruiter: true,
      },
      {
        id: "m10",
        senderId: "c4",
        text: "That's wonderful news! I'm very excited about this opportunity.",
        timestamp: "Yesterday",
        isRecruiter: false,
      },
      {
        id: "m11",
        senderId: "recruiter",
        text: "The offer package includes ₹32 LPA base plus ESOPs. HR will reach out shortly.",
        timestamp: "4h ago",
        isRecruiter: true,
      },
      {
        id: "m12",
        senderId: "c4",
        text: "When can I expect the offer letter?",
        timestamp: "3h ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv4",
    candidateId: "c5",
    candidateName: "Rahul Gupta",
    candidateRole: "Backend Engineer",
    avatar: "RG",
    photo: "/assets/generated/candidate-3.dim_200x200.jpg",
    lastMessage: "Yes, I have 4 years with Kubernetes in production.",
    timestamp: "1d ago",
    unread: 0,
    messages: [
      {
        id: "m13",
        senderId: "recruiter",
        text: "Rahul, do you have experience managing Kubernetes clusters in production?",
        timestamp: "2d ago",
        isRecruiter: true,
      },
      {
        id: "m14",
        senderId: "c5",
        text: "Yes, I have 4 years with Kubernetes in production.",
        timestamp: "1d ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv5",
    candidateId: "c3",
    candidateName: "Kiran Patel",
    candidateRole: "UX Designer",
    avatar: "KP",
    photo: "/assets/generated/candidate-4.dim_200x200.jpg",
    lastMessage: "I'd love to share my design portfolio.",
    timestamp: "2d ago",
    unread: 0,
    messages: [
      {
        id: "m15",
        senderId: "recruiter",
        text: "Hi Kiran, we're looking for a UX designer with strong research skills. Are you open to a design challenge?",
        timestamp: "3d ago",
        isRecruiter: true,
      },
      {
        id: "m16",
        senderId: "c3",
        text: "Of course! I enjoy design challenges. I'd love to share my design portfolio.",
        timestamp: "2d ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv6",
    candidateId: "c6",
    candidateName: "Sneha Nair",
    candidateRole: "DevOps Engineer",
    avatar: "SN",
    photo: "/assets/generated/candidate-8.dim_200x200.jpg",
    lastMessage: "Great, I'll prepare accordingly for the CI/CD focus.",
    timestamp: "3d ago",
    unread: 0,
    messages: [
      {
        id: "m17",
        senderId: "recruiter",
        text: "Sneha, the screening call will focus on CI/CD pipelines and infrastructure as code. Does that work?",
        timestamp: "4d ago",
        isRecruiter: true,
      },
      {
        id: "m18",
        senderId: "c6",
        text: "Great, I'll prepare accordingly for the CI/CD focus.",
        timestamp: "3d ago",
        isRecruiter: false,
      },
    ],
  },
  {
    id: "cv7",
    candidateId: "c7",
    candidateName: "Amit Joshi",
    candidateRole: "Full Stack Developer",
    avatar: "AJ",
    photo: "/assets/generated/candidate-7.dim_200x200.jpg",
    lastMessage: "I'm very interested in the full stack role!",
    timestamp: "4d ago",
    unread: 0,
    messages: [
      {
        id: "m19",
        senderId: "recruiter",
        text: "Amit, we noticed your open source contributions. We think you'd be a great fit for our full stack team.",
        timestamp: "5d ago",
        isRecruiter: true,
      },
      {
        id: "m20",
        senderId: "c7",
        text: "I'm very interested in the full stack role!",
        timestamp: "4d ago",
        isRecruiter: false,
      },
    ],
  },
];

export const KPI_DATA = {
  activePostings: { value: 24, delta: "+3 this week", positive: true },
  totalApplicants: { value: 1482, delta: "+8% this month", positive: true },
  interviewsScheduled: { value: 89, delta: "+12% this week", positive: true },
  offersExtended: { value: 31, delta: "+5 this month", positive: true },
  avgTimeToHire: { value: "18 days", delta: "-2 days", positive: true },
  acceptanceRate: { value: "73%", delta: "+4% vs last month", positive: true },
};

export const OPEN_ROLES = [
  {
    id: "r1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Bangalore / Remote",
    applicants: 48,
    posted: "Mar 1, 2025",
  },
  {
    id: "r2",
    title: "Senior Product Manager",
    department: "Product",
    location: "Mumbai / Hybrid",
    applicants: 32,
    posted: "Mar 5, 2025",
  },
  {
    id: "r3",
    title: "Data Scientist",
    department: "Analytics",
    location: "Hyderabad / Remote",
    applicants: 27,
    posted: "Mar 8, 2025",
  },
  {
    id: "r4",
    title: "Cloud Architect",
    department: "Infrastructure",
    location: "Delhi / Remote",
    applicants: 19,
    posted: "Mar 12, 2025",
  },
  {
    id: "r5",
    title: "Product Designer",
    department: "Design",
    location: "Pune / Hybrid",
    applicants: 41,
    posted: "Mar 15, 2025",
  },
];

export const TEAM_MEMBERS = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Lead Recruiter",
    avatar: "SC",
    joined: "Jan 2023",
    email: "sarah@techcorp.io",
  },
  {
    id: "t2",
    name: "David Park",
    role: "Technical Recruiter",
    avatar: "DP",
    joined: "Mar 2023",
    email: "david@techcorp.io",
  },
  {
    id: "t3",
    name: "Priyanka Iyer",
    role: "Talent Sourcer",
    avatar: "PI",
    joined: "Jun 2023",
    email: "priyanka@techcorp.io",
  },
  {
    id: "t4",
    name: "Marcus Lee",
    role: "HR Business Partner",
    avatar: "ML",
    joined: "Sep 2023",
    email: "marcus@techcorp.io",
  },
];

export const BILLING_HISTORY = [
  {
    id: "b1",
    date: "Mar 1, 2025",
    description: "Pro Plan — Monthly",
    amount: "$299",
    status: "Paid",
  },
  {
    id: "b2",
    date: "Feb 1, 2025",
    description: "Pro Plan — Monthly",
    amount: "$299",
    status: "Paid",
  },
  {
    id: "b3",
    date: "Jan 1, 2025",
    description: "Pro Plan — Monthly",
    amount: "$299",
    status: "Paid",
  },
  {
    id: "b4",
    date: "Dec 1, 2024",
    description: "Pro Plan — Monthly",
    amount: "$299",
    status: "Paid",
  },
];

export const JOB_TEMPLATES = [
  {
    id: "jt1",
    title: "Software Engineer (SWE)",
    category: "Engineering",
    description:
      "We are looking for a talented software engineer to join our team.",
    fields: [
      "Role Summary",
      "Responsibilities",
      "Requirements",
      "Nice to Haves",
      "Benefits",
    ],
  },
  {
    id: "jt2",
    title: "Product Manager (PM)",
    category: "Product",
    description:
      "We are seeking an experienced product manager to drive our product strategy.",
    fields: ["Mission", "Key Outcomes", "Experience", "Skills", "Culture Fit"],
  },
  {
    id: "jt3",
    title: "UX/UI Designer",
    category: "Design",
    description:
      "Join our design team to create beautiful and intuitive user experiences.",
    fields: [
      "Role Overview",
      "Design Responsibilities",
      "Portfolio Requirements",
      "Tools",
      "Perks",
    ],
  },
  {
    id: "jt4",
    title: "Data Scientist",
    category: "Analytics",
    description:
      "We need a data scientist to transform our data into actionable insights.",
    fields: [
      "Position Summary",
      "Key Responsibilities",
      "Required Skills",
      "Education",
      "What We Offer",
    ],
  },
];
