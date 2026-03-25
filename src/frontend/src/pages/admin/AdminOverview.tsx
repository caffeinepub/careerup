import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle,
  CreditCard,
  LifeBuoy,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpis = [
  {
    id: "recruiters",
    label: "Total Recruiters",
    value: "248",
    delta: "+12%",
    positive: true,
    icon: <Building2 size={16} />,
    color: "#dbeafe",
    iconColor: "#2563EB",
    sparkData: [20, 24, 22, 28, 30, 35, 40, 38, 44, 50, 55, 60],
    chartType: "bar",
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      value: 180 + i * 6,
    })),
  },
  {
    id: "candidates",
    label: "Total Candidates",
    value: "12,450",
    delta: "+8%",
    positive: true,
    icon: <Users size={16} />,
    color: "#dcfce7",
    iconColor: "#16a34a",
    sparkData: [
      800, 900, 950, 1100, 1200, 1300, 1250, 1400, 1500, 1600, 1700, 1850,
    ],
    chartType: "area",
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      value: 9000 + i * 300,
    })),
  },
  {
    id: "jobs",
    label: "Active Jobs",
    value: "1,832",
    delta: "+5%",
    positive: true,
    icon: <Briefcase size={16} />,
    color: "#fef9c3",
    iconColor: "#ca8a04",
    sparkData: [120, 130, 140, 160, 155, 170, 180, 175, 190, 200, 210, 220],
    chartType: "line",
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      value: 1400 + i * 40,
    })),
  },
  {
    id: "revenue",
    label: "Platform Revenue",
    value: "\u20b948.2L",
    delta: "+18%",
    positive: true,
    icon: <CreditCard size={16} />,
    color: "#fce7f3",
    iconColor: "#db2777",
    sparkData: [3, 3.5, 4, 3.8, 4.2, 4.5, 4.3, 4.8, 5, 5.2, 5.5, 5.8],
    chartType: "area",
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      value: 30 + i * 2,
    })),
  },
  {
    id: "signups",
    label: "New Signups Today",
    value: "34",
    delta: "+4",
    positive: true,
    icon: <TrendingUp size={16} />,
    color: "#ede9fe",
    iconColor: "#7c3aed",
    sparkData: [20, 22, 18, 25, 28, 30, 26, 32, 34, 36, 30, 34],
    chartType: "bar",
    chartData: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: 25 + Math.floor(Math.random() * 15),
    })),
  },
  {
    id: "conversion",
    label: "Subscription Conv.",
    value: "68%",
    delta: "+3%",
    positive: true,
    icon: <BarChart3 size={16} />,
    color: "#dbeafe",
    iconColor: "#0284c7",
    sparkData: [55, 58, 60, 62, 64, 65, 63, 66, 67, 68, 68, 70],
    chartType: "line",
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      value: 55 + i * 1.2,
    })),
  },
  {
    id: "tickets",
    label: "Open Support Tickets",
    value: "12",
    delta: "-3",
    positive: true,
    icon: <LifeBuoy size={16} />,
    color: "#fee2e2",
    iconColor: "#ef4444",
    sparkData: [20, 18, 15, 17, 14, 12, 15, 11, 13, 12, 10, 12],
    chartType: "bar",
    chartData: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: 8 + Math.floor(Math.random() * 8),
    })),
  },
  {
    id: "flagged",
    label: "Flagged Content",
    value: "7",
    delta: "-2",
    positive: true,
    icon: <AlertTriangle size={16} />,
    color: "#fff7ed",
    iconColor: "#ea580c",
    sparkData: [12, 10, 11, 9, 10, 8, 9, 7, 8, 7, 6, 7],
    chartType: "bar",
    chartData: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: 3 + Math.floor(Math.random() * 6),
    })),
  },
];

const recentActivity = [
  {
    id: 1,
    type: "recruiter",
    msg: "New recruiter registered: Infosys Ltd",
    time: "2m ago",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    type: "flag",
    msg: "Job flagged: Senior Developer at TCS",
    time: "8m ago",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 3,
    type: "ticket",
    msg: "Support ticket opened by candidate: Priya Sharma",
    time: "15m ago",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: 4,
    type: "candidate",
    msg: "New candidate registered: Rahul Mehta",
    time: "22m ago",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 5,
    type: "subscription",
    msg: "TechCorp Solutions upgraded to Enterprise plan",
    time: "35m ago",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    id: 6,
    type: "moderation",
    msg: "Spam account removed: fake_recruiter_xyz",
    time: "1h ago",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: 7,
    type: "recruiter",
    msg: "Wipro Technologies renewed Pro subscription",
    time: "2h ago",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 8,
    type: "candidate",
    msg: "Candidate banned: repeated spam applications",
    time: "3h ago",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

const health = [
  { label: "API Uptime", value: "99.9%", status: "green" },
  { label: "DB Response", value: "12ms", status: "green" },
  { label: "Error Rate", value: "0.02%", status: "green" },
  { label: "Active Sessions", value: "1,240", status: "yellow" },
];

function SparkLine({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data
    .map(
      (v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`,
    )
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      className="mt-2"
      aria-label="Sparkline chart"
      role="img"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminOverview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [modalKpi, setModalKpi] = useState<(typeof kpis)[0] | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Platform Overview
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
          <CheckCircle size={14} className="text-green-600" />
          <span className="text-xs font-semibold text-green-700">
            All Systems Operational
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <button
            type="button"
            key={kpi.id}
            className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 text-left w-full"
            onMouseEnter={() => setHovered(kpi.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setModalKpi(kpi)}
          >
            <div className="flex items-start justify-between mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: kpi.color }}
              >
                <span style={{ color: kpi.iconColor }}>{kpi.icon}</span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.positive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#EF4444]"}`}
              >
                {kpi.delta}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{kpi.label}</p>
            <p className="text-xl font-bold text-gray-900 leading-tight">
              {kpi.value}
            </p>
            <SparkLine data={kpi.sparkData} />
            {hovered === kpi.id && (
              <p className="text-[10px] text-blue-500 mt-1 font-medium">
                Click to view trend
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Activity feed */}
        <div className="col-span-2 bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-gray-500" />
            <h3 className="font-semibold text-gray-900">
              Recent Platform Activity
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}
                >
                  <Activity size={13} className={a.color} />
                </div>
                <p className="text-sm text-gray-700 flex-1">{a.msg}</p>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health */}
        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Platform Health</h3>
          <div className="flex flex-col gap-3">
            {health.map((h) => (
              <div key={h.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${h.status === "green" ? "bg-green-500" : h.status === "yellow" ? "bg-yellow-400" : "bg-red-500"}`}
                  />
                  <span className="text-sm text-gray-600">{h.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {h.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 bg-green-50 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700">
              Uptime last 30 days
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">99.97%</p>
            <p className="text-xs text-green-600 mt-0.5">
              0 incidents this month
            </p>
          </div>
        </div>
      </div>

      {/* KPI Modal */}
      <Dialog open={!!modalKpi} onOpenChange={() => setModalKpi(null)}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>{modalKpi?.label} Trend</DialogTitle>
          </DialogHeader>
          {modalKpi && (
            <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {modalKpi.value}
              </p>
              <span
                className={`text-sm font-semibold px-2 py-0.5 rounded-full ${modalKpi.positive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#EF4444]"}`}
              >
                {modalKpi.delta} vs last period
              </span>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  {modalKpi.chartType === "bar" ? (
                    <BarChart data={modalKpi.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey={
                          modalKpi.chartData[0] &&
                          "month" in modalKpi.chartData[0]
                            ? "month"
                            : "day"
                        }
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#2563EB"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : modalKpi.chartType === "area" ? (
                    <AreaChart data={modalKpi.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey={
                          modalKpi.chartData[0] &&
                          "month" in modalKpi.chartData[0]
                            ? "month"
                            : "day"
                        }
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2563EB"
                        fill="#dbeafe"
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={modalKpi.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey={
                          modalKpi.chartData[0] &&
                          "month" in modalKpi.chartData[0]
                            ? "month"
                            : "day"
                        }
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#2563EB"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
