import { useState } from "react";
import { MOCK_JOBS } from "../data/mockJobs";

type Status = "all" | "applied" | "interviewing" | "offered" | "rejected";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  applied: { label: "Applied", color: "text-blue-700", bg: "bg-blue-100" },
  interviewing: {
    label: "Interviewing",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  offered: {
    label: "Offer Received",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  rejected: { label: "Not Selected", color: "text-red-600", bg: "bg-red-100" },
};

const MOCK_APPLICATIONS = [
  { ...MOCK_JOBS[0], status: "interviewing", appliedDate: "2 days ago" },
  { ...MOCK_JOBS[1], status: "applied", appliedDate: "1 week ago" },
  { ...MOCK_JOBS[2], status: "offered", appliedDate: "2 weeks ago" },
  { ...MOCK_JOBS[3], status: "rejected", appliedDate: "3 weeks ago" },
];

const TABS: Status[] = [
  "all",
  "applied",
  "interviewing",
  "offered",
  "rejected",
];

export default function ApplicationsScreen() {
  const [filter, setFilter] = useState<Status>("all");

  const filtered =
    filter === "all"
      ? MOCK_APPLICATIONS
      : MOCK_APPLICATIONS.filter((a) => a.status === filter);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          {MOCK_APPLICATIONS.length} total applications
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto px-5 gap-2 pb-4 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab ? "text-white" : "bg-gray-100 text-gray-600"
            }`}
            style={
              filter === tab
                ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)" }
                : {}
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-gray-500 text-sm">
              No applications in this category
            </p>
          </div>
        ) : (
          filtered.map((app) => {
            const cfg = STATUS_CONFIG[app.status];
            return (
              <div
                key={app.id.toString()}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50 mb-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: app.companyColor }}
                >
                  {app.companyInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {app.title}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {app.company} • {app.appliedDate}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
                >
                  {cfg.label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
