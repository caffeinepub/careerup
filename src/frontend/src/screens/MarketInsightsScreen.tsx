import { Building2, Wifi, X } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salaryData = [
  { role: "Prod. Designer", salary: 18 },
  { role: "Frontend Eng", salary: 22 },
  { role: "UX Lead", salary: 24 },
  { role: "Staff Eng", salary: 45 },
  { role: "PM", salary: 32 },
  { role: "Data Scientist", salary: 28 },
  { role: "DevOps", salary: 25 },
];

const growthData = [
  { sector: "AI/ML", growth: 45 },
  { sector: "Cloud/SaaS", growth: 34 },
  { sector: "Fintech", growth: 28 },
  { sector: "HealthTech", growth: 22 },
  { sector: "EdTech", growth: 16 },
  { sector: "E-commerce", growth: 14 },
];

const workModeData = [
  { name: "Remote", value: 42 },
  { name: "Hybrid", value: 35 },
  { name: "On-site", value: 23 },
];

const WORK_MODE_COLORS = ["#2563EB", "#7C3AED", "#10b981"];

const skillsData = [
  { skill: "GenAI/LLM", demand: 96 },
  { skill: "React", demand: 92 },
  { skill: "Python", demand: 90 },
  { skill: "TypeScript", demand: 87 },
  { skill: "AWS/GCP", demand: 83 },
  { skill: "Node.js", demand: 76 },
  { skill: "Figma", demand: 70 },
];

const hiringCompanies = [
  {
    name: "Google",
    logo: "G",
    color: "#4285F4",
    openings: 1200,
    sector: "Tech",
  },
  {
    name: "Microsoft",
    logo: "M",
    color: "#00A4EF",
    openings: 980,
    sector: "Tech",
  },
  {
    name: "Amazon",
    logo: "A",
    color: "#FF9900",
    openings: 2100,
    sector: "E-commerce",
  },
  {
    name: "Flipkart",
    logo: "F",
    color: "#2874F0",
    openings: 850,
    sector: "E-commerce",
  },
  {
    name: "Infosys",
    logo: "I",
    color: "#007CC3",
    openings: 3200,
    sector: "IT Services",
  },
  {
    name: "TCS",
    logo: "T",
    color: "#E0261A",
    openings: 4500,
    sector: "IT Services",
  },
  {
    name: "Razorpay",
    logo: "R",
    color: "#2D9CDB",
    openings: 320,
    sector: "Fintech",
  },
  {
    name: "CRED",
    logo: "C",
    color: "#1A1A2E",
    openings: 180,
    sector: "Fintech",
  },
  {
    name: "Swiggy",
    logo: "S",
    color: "#FC8019",
    openings: 650,
    sector: "FoodTech",
  },
  {
    name: "Zomato",
    logo: "Z",
    color: "#E23744",
    openings: 520,
    sector: "FoodTech",
  },
  {
    name: "PhonePe",
    logo: "P",
    color: "#5F259F",
    openings: 410,
    sector: "Fintech",
  },
  {
    name: "Meesho",
    logo: "M",
    color: "#9B2D8E",
    openings: 290,
    sector: "E-commerce",
  },
  {
    name: "Zepto",
    logo: "Z",
    color: "#6C3CE1",
    openings: 220,
    sector: "Quick Commerce",
  },
  {
    name: "Groww",
    logo: "G",
    color: "#00D09C",
    openings: 195,
    sector: "Fintech",
  },
  {
    name: "Ola",
    logo: "O",
    color: "#1C9B48",
    openings: 380,
    sector: "Mobility",
  },
  {
    name: "Paytm",
    logo: "P",
    color: "#00BAF2",
    openings: 440,
    sector: "Fintech",
  },
  {
    name: "Byju's",
    logo: "B",
    color: "#4D44B5",
    openings: 260,
    sector: "EdTech",
  },
  {
    name: "Freshworks",
    logo: "F",
    color: "#FF5D34",
    openings: 310,
    sector: "SaaS",
  },
  { name: "Zoho", logo: "Z", color: "#E42527", openings: 720, sector: "SaaS" },
  {
    name: "HCL Tech",
    logo: "H",
    color: "#0066B2",
    openings: 2800,
    sector: "IT Services",
  },
];

const remoteCompanies = [
  {
    name: "GitLab",
    logo: "G",
    color: "#FC6D26",
    roles: 340,
    type: "Fully Remote",
  },
  {
    name: "Automattic",
    logo: "A",
    color: "#21759B",
    roles: 120,
    type: "Fully Remote",
  },
  {
    name: "Atlassian",
    logo: "A",
    color: "#0052CC",
    roles: 280,
    type: "Remote-first",
  },
  {
    name: "Razorpay",
    logo: "R",
    color: "#2D9CDB",
    roles: 95,
    type: "Hybrid Remote",
  },
  {
    name: "Freshworks",
    logo: "F",
    color: "#FF5D34",
    roles: 150,
    type: "Remote-first",
  },
  {
    name: "Postman",
    logo: "P",
    color: "#EF5B25",
    roles: 80,
    type: "Fully Remote",
  },
  {
    name: "HasGeek",
    logo: "H",
    color: "#444444",
    roles: 35,
    type: "Fully Remote",
  },
  {
    name: "Zoho",
    logo: "Z",
    color: "#E42527",
    roles: 200,
    type: "Hybrid Remote",
  },
  {
    name: "Wingify",
    logo: "W",
    color: "#FF6B35",
    roles: 45,
    type: "Fully Remote",
  },
  {
    name: "Chargebee",
    logo: "C",
    color: "#4F46E5",
    roles: 70,
    type: "Remote-first",
  },
  {
    name: "Browserstack",
    logo: "B",
    color: "#FF6C37",
    roles: 110,
    type: "Remote-first",
  },
  {
    name: "CleverTap",
    logo: "C",
    color: "#E8563A",
    roles: 60,
    type: "Hybrid Remote",
  },
  {
    name: "Druva",
    logo: "D",
    color: "#2196F3",
    roles: 85,
    type: "Fully Remote",
  },
  {
    name: "Unacademy",
    logo: "U",
    color: "#0A0A0A",
    roles: 130,
    type: "Hybrid Remote",
  },
  {
    name: "Springboard",
    logo: "S",
    color: "#F5A623",
    roles: 50,
    type: "Fully Remote",
  },
];

const remoteTypeBadgeColor = (type: string) => {
  if (type === "Fully Remote") return { bg: "#dcfce7", text: "#16a34a" };
  if (type === "Remote-first") return { bg: "#dbeafe", text: "#1d4ed8" };
  return { bg: "#ede9fe", text: "#7c3aed" };
};

const growthGradientId = "growthGradient";
const skillsGradientId = "skillsGradient";
const salaryLineGradientId = "salaryLineGradient";

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-2xl p-4 mb-4"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: { title: string; subtitle: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

function LogoCircle({
  logo,
  color,
  size = 36,
}: { logo: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {logo}
    </div>
  );
}

const SalaryTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-bold text-gray-900">{`\u20B9${payload[0].value} LPA`}</p>
      </div>
    );
  }
  return null;
};

function ModalSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  ocidClose,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  ocidClose: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      {/* Backdrop button */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
        style={{ background: "transparent", border: "none" }}
      />
      <div
        className="relative bg-white rounded-t-3xl"
        style={{ maxHeight: "85vh", overflowY: "auto", scrollbarWidth: "none" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-white z-10 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <button
            type="button"
            data-ocid={ocidClose}
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#f3f4f6" }}
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
        <div className="px-5 py-3">{children}</div>
        <div className="h-6" />
      </div>
    </div>
  );
}

export default function MarketInsightsScreen() {
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [showAllRemote, setShowAllRemote] = useState(false);

  const totalRemoteRoles = remoteCompanies.reduce((sum, c) => sum + c.roles, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #2563EB 60%, #7C3AED 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Market Insights</h1>
        <p className="text-blue-200 text-sm">2025 India Job Market</p>
      </div>

      {/* Charts */}
      <div
        className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Chart 1: Salary Line Graph */}
        <SectionCard>
          <SectionTitle
            title="Average Salary by Role"
            subtitle="Annual compensation in LPA (India, 2025)"
          />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={salaryData}
              margin={{ top: 8, right: 16, left: -8, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={salaryLineGradientId}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="role"
                tick={{ fontSize: 9, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `\u20B9${v}L`}
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 50]}
              />
              <Tooltip content={<SalaryTooltip />} />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ fill: "#2563EB", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#7C3AED" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Chart 2: Job Growth by Sector */}
        <SectionCard>
          <SectionTitle
            title="Job Growth by Sector"
            subtitle="Year-over-year growth rate in 2025"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={growthData}
              margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={growthGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="sector"
                tick={{ fontSize: 9, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `+${v}%`}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`+${value}%`, "Growth"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="growth"
                fill={`url(#${growthGradientId})`}
                radius={[6, 6, 0, 0]}
                barSize={28}
                label={{
                  position: "top",
                  formatter: (v: number) => `+${v}%`,
                  fontSize: 10,
                  fill: "#10b981",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Chart 3: Work Mode Distribution */}
        <SectionCard>
          <SectionTitle
            title="Work Mode Distribution"
            subtitle="Remote vs hybrid vs on-site preferences"
          />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={workModeData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {workModeData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={WORK_MODE_COLORS[index % WORK_MODE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Share"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-1">
            {workModeData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: WORK_MODE_COLORS[i] }}
                />
                <span className="text-xs text-gray-600 font-medium">
                  {d.name} {d.value}%
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Chart 4: Top In-Demand Skills */}
        <SectionCard>
          <SectionTitle
            title="Top In-Demand Skills"
            subtitle="Skills most requested by top employers (2025)"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={skillsData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={skillsGradientId}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f0f0f0"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="skill"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Demand"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="demand"
                fill={`url(#${skillsGradientId})`}
                radius={[0, 6, 6, 0]}
                barSize={14}
                label={{
                  position: "right",
                  formatter: (v: number) => `${v}%`,
                  fontSize: 10,
                  fill: "#6b7280",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Section 5: Top Hiring Companies */}
        <SectionCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Top Hiring Companies
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Active openings in India (2025)
              </p>
            </div>
            <Building2 size={18} className="text-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {hiringCompanies.slice(0, 12).map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-2 p-2 rounded-xl"
                style={{ background: "#f8fafc" }}
              >
                <LogoCircle
                  logo={company.logo}
                  color={company.color}
                  size={32}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {company.name}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {company.openings.toLocaleString()} open
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full inline-block mt-0.5"
                    style={{
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      fontSize: 9,
                    }}
                  >
                    {company.sector}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            data-ocid="hiring.open_modal_button"
            type="button"
            onClick={() => setShowAllCompanies(true)}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            View All Companies
          </button>
        </SectionCard>

        {/* Section 6: Remote Opportunities */}
        <SectionCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Remote Opportunities
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {remoteCompanies.length} companies |{" "}
                {totalRemoteRoles.toLocaleString()}+ remote roles
              </p>
            </div>
            <Wifi size={18} className="text-green-500" />
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {remoteCompanies.slice(0, 4).map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
              >
                <LogoCircle
                  logo={company.logo}
                  color={company.color}
                  size={20}
                />
                <span className="text-xs font-medium text-gray-700">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
          <button
            data-ocid="remote.open_modal_button"
            type="button"
            onClick={() => setShowAllRemote(true)}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #10b981, #2563EB)" }}
          >
            View All Remote Companies
          </button>
        </SectionCard>

        <div className="h-4" />
      </div>

      {/* Modal: All Hiring Companies */}
      <ModalSheet
        open={showAllCompanies}
        onClose={() => setShowAllCompanies(false)}
        title="All Hiring Companies"
        subtitle={`${hiringCompanies.length} companies listed`}
        ocidClose="hiring.close_button"
      >
        {hiringCompanies.map((company) => (
          <div
            key={company.name}
            className="flex items-center gap-3 py-3 border-b border-gray-50"
          >
            <LogoCircle logo={company.logo} color={company.color} size={40} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                {company.name}
              </p>
              <p className="text-xs text-gray-400">{company.sector}</p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "#dbeafe", color: "#1d4ed8" }}
            >
              {company.openings.toLocaleString()} open
            </span>
          </div>
        ))}
      </ModalSheet>

      {/* Modal: Remote Opportunities */}
      <ModalSheet
        open={showAllRemote}
        onClose={() => setShowAllRemote(false)}
        title="Remote Opportunities"
        subtitle={`${remoteCompanies.length} companies | ${totalRemoteRoles.toLocaleString()}+ roles`}
        ocidClose="remote.close_button"
      >
        {remoteCompanies.map((company) => {
          const badge = remoteTypeBadgeColor(company.type);
          return (
            <div
              key={company.name}
              className="flex items-center gap-3 py-3 border-b border-gray-50"
            >
              <LogoCircle logo={company.logo} color={company.color} size={40} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {company.name}
                </p>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-0.5"
                  style={{ background: badge.bg, color: badge.text }}
                >
                  {company.type}
                </span>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "#dbeafe", color: "#1d4ed8" }}
              >
                {company.roles} roles
              </span>
            </div>
          );
        })}
      </ModalSheet>
    </div>
  );
}
