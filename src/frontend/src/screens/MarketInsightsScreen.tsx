import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salaryData = [
  { role: "Product Designer", salary: 145 },
  { role: "Frontend Eng", salary: 155 },
  { role: "UX Lead", salary: 160 },
  { role: "Staff Engineer", salary: 210 },
  { role: "Product Manager", salary: 175 },
  { role: "Data Scientist", salary: 165 },
  { role: "DevOps", salary: 150 },
];

const growthData = [
  { sector: "AI/ML", growth: 38 },
  { sector: "Cloud Infra", growth: 29 },
  { sector: "Fintech", growth: 22 },
  { sector: "HealthTech", growth: 18 },
  { sector: "EdTech", growth: 12 },
  { sector: "E-commerce", growth: 9 },
];

const workModeData = [
  { name: "Remote", value: 42 },
  { name: "Hybrid", value: 35 },
  { name: "On-site", value: 23 },
];

const WORK_MODE_COLORS = ["#2563EB", "#7C3AED", "#10b981"];

const skillsData = [
  { skill: "React", demand: 94 },
  { skill: "TypeScript", demand: 89 },
  { skill: "Python", demand: 85 },
  { skill: "AI/ML", demand: 82 },
  { skill: "AWS", demand: 78 },
  { skill: "Node.js", demand: 74 },
  { skill: "Figma", demand: 68 },
];

const salaryGradientId = "salaryGradient";
const growthGradientId = "growthGradient";
const skillsGradientId = "skillsGradient";

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

const CustomTooltip = ({
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
        <p className="text-sm font-bold text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function MarketInsightsScreen() {
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
        <p className="text-blue-200 text-sm">2024 Job Market Data</p>
      </div>

      {/* Charts */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {/* Chart 1: Salary by Role */}
        <SectionCard>
          <SectionTitle
            title="Average Salary by Role"
            subtitle="Annual compensation in thousands (USD)"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={salaryData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={salaryGradientId}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f0f0f0"
              />
              <XAxis
                type="number"
                domain={[0, 250]}
                tickFormatter={(v) => `$${v}K`}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="role"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="salary"
                fill={`url(#${salaryGradientId})`}
                radius={[0, 6, 6, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Chart 2: Job Growth by Sector */}
        <SectionCard>
          <SectionTitle
            title="Job Growth by Sector"
            subtitle="Year-over-year growth rate in 2024"
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
            subtitle="Skills most requested by top employers"
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

        {/* Footer padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}
