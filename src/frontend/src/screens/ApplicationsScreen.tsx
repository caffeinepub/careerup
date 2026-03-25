import { ChevronRight, Inbox, Mic, Send, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  type AppStatus,
  useApplications,
} from "../context/ApplicationsContext";

const STATUS_CONFIG: Record<
  AppStatus,
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

const TABS: AppStatus[] = ["applied", "interviewing", "rejected"];

const NEXT_STATUS: Record<AppStatus, AppStatus | null> = {
  applied: "interviewing",
  interviewing: "rejected",
  rejected: null,
};

const MOVE_LABEL: Record<AppStatus, string> = {
  applied: "Move to Interviewing",
  interviewing: "Move to Rejected",
  rejected: "",
};

export default function ApplicationsScreen() {
  const { applications, updateStatus } = useApplications();
  const [filter, setFilter] = useState<AppStatus>("applied");

  const counts: Record<AppStatus, number> = {
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interviewing")
      .length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const filtered = applications.filter((a) => a.status === filter);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          {applications.length} total application
          {applications.length !== 1 ? "s" : ""}
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
                <span className="text-2xl font-bold">{counts[tab]}</span>
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
            <Inbox className="w-12 h-12 text-gray-300 mb-3" />
            {filter === "applied" ? (
              <>
                <p className="text-gray-700 font-semibold text-base mb-1">
                  No applications yet
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Start swiping to apply for jobs!
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                No jobs in this category yet
              </p>
            )}
          </div>
        ) : (
          filtered.map((app, idx) => {
            const cfg = STATUS_CONFIG[app.status];
            const nextStatus = NEXT_STATUS[app.status];
            return (
              <div
                key={app.job.id.toString()}
                data-ocid={`applications.item.${idx + 1}`}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: app.job.companyColor }}
                >
                  {app.job.companyInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {app.job.title}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {app.job.company} &bull; {app.appliedDate}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}
                  >
                    {cfg.label}
                  </span>
                </div>
                {nextStatus && (
                  <button
                    type="button"
                    data-ocid={`applications.item.${idx + 1}.edit_button`}
                    onClick={() => updateStatus(app.job.id, nextStatus)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 text-gray-500 text-[10px] font-semibold bg-gray-50 active:scale-95 transition-transform whitespace-nowrap"
                    title={MOVE_LABEL[app.status]}
                  >
                    <ChevronRight size={12} />
                    {MOVE_LABEL[app.status]}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
