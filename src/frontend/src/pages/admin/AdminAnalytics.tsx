import { BarChart3 } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const months = [
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
];

const signupData = months.map((m, i) => ({
  month: m,
  recruiters: 15 + i * 2,
  candidates: 600 + i * 120,
}));
const revenueData = months.map((m, i) => ({ month: m, revenue: 28 + i * 1.8 }));
const jobData = months.map((m, i) => ({
  month: m,
  posted: 140 + i * 15,
  filled: 80 + i * 12,
}));
const matchData = months.map((m, i) => ({ month: m, match: 72 + i * 1.2 }));

export default function AdminAnalytics() {
  const [range, setRange] = useState("12m");

  const sliceData = <T,>(data: T[]): T[] => {
    const slices: Record<string, number> = {
      "7d": 7,
      "30d": 4,
      "90d": 6,
      "12m": 12,
    };
    return data.slice(-slices[range]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Platform Analytics
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Platform-wide performance insights
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          {["7d", "30d", "90d", "12m"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${range === r ? "bg-[#2563EB] text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            User Signups Over Time
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sliceData(signupData)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="recruiters"
                stackId="1"
                stroke="#2563EB"
                fill="#dbeafe"
              />
              <Area
                type="monotone"
                dataKey="candidates"
                stackId="1"
                stroke="#16a34a"
                fill="#dcfce7"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            Revenue Growth (\u20b9 Lakhs)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sliceData(revenueData)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`\u20b9${v}L`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            Job Posting Trends
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sliceData(jobData)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="posted"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="filled"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            AI Match Rate (%)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sliceData(matchData)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[60, 100]} />
              <Tooltip
                formatter={(v: number) => [`${v.toFixed(1)}%`, "Match Rate"]}
              />
              <Area
                type="monotone"
                dataKey="match"
                stroke="#7c3aed"
                fill="#ede9fe"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
