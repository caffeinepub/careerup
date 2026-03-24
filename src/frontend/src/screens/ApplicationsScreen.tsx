import { Inbox, Mic, Send, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { MOCK_JOBS } from "../data/mockJobs";

type Status = "applied" | "interviewing" | "rejected";

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; Icon: LucideIcon }
> = {
  applied: {
    label: "Applied",
    color: "text-blue-700",
    bg: "bg-blue-100",
    Icon: Send,
  },
  interviewing: {
    label: "Interviewing",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    Icon: Mic,
  },
  rejected: {
    label: "Not Selected",
    color: "text-red-600",
    bg: "bg-red-100",
    Icon: XCircle,
  },
};

const MOCK_APPLICATIONS: ((typeof MOCK_JOBS)[0] & {
  status: Status;
  appliedDate: string;
})[] = [
  { ...MOCK_JOBS[0], status: "interviewing", appliedDate: "2 days ago" },
  { ...MOCK_JOBS[1], status: "applied", appliedDate: "1 week ago" },
  { ...MOCK_JOBS[2], status: "applied", appliedDate: "2 weeks ago" },
  { ...MOCK_JOBS[3], status: "rejected", appliedDate: "3 weeks ago" },
];

const TABS: Status[] = ["applied", "interviewing", "rejected"];

const COUNTS: Record<Status, number> = {
  applied: MOCK_APPLICATIONS.filter((a) => a.status === "applied").length,
  interviewing: MOCK_APPLICATIONS.filter((a) => a.status === "interviewing")
    .length,
  rejected: MOCK_APPLICATIONS.filter((a) => a.status === "rejected").length,
};

export default function ApplicationsScreen() {
  const [filter, setFilter] = useState<Status>("applied");

  const filtered = MOCK_APPLICATIONS.filter((a) => a.status === filter);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          {MOCK_APPLICATIONS.length} total applications
        </p>
      </div>

      {/* Summary Cards */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {TABS.map((tab) => {
            const cfg = STATUS_CONFIG[tab];
            const isActive = filter === tab;
            return (
              <button
                type="button"
                key={tab}
                data-ocid={`applications.${tab}.tab`}
                onClick={() => setFilter(tab)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                  isActive ? "text-white shadow-lg" : "bg-gray-50 text-gray-700"
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      }
                    : {}
                }
              >
                <cfg.Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                <span className="text-2xl font-bold">{COUNTS[tab]}</span>
                <span
                  className={`text-[10px] font-semibold mt-0.5 ${
                    isActive ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {cfg.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-64"
            data-ocid="applications.empty_state"
          >
            <Inbox className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">
              No applications in this category
            </p>
          </div>
        ) : (
          filtered.map((app, idx) => {
            const cfg = STATUS_CONFIG[app.status];
            return (
              <div
                key={app.id.toString()}
                data-ocid={`applications.item.${idx + 1}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
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
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} whitespace-nowrap`}
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
