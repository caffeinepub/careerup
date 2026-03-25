import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Ban, CheckCircle, ShieldAlert } from "lucide-react";
import { useState } from "react";

type ModStatus = "Pending" | "Approved" | "Removed" | "Banned";

const FLAGGED_JOBS = [
  {
    id: 1,
    title: "Sales Executive (Urgent)",
    company: "Byju's",
    reason: "Misleading salary claims",
    reporter: "Aarav Patel",
    reported: "Today",
    status: "Pending" as ModStatus,
  },
  {
    id: 2,
    title: "Work from Home Data Entry",
    company: "Unknown Co.",
    reason: "Potential scam / fake job",
    reporter: "Priya Sharma",
    reported: "Yesterday",
    status: "Pending" as ModStatus,
  },
  {
    id: 3,
    title: "HR Manager",
    company: "Zepto",
    reason: "Discriminatory requirements",
    reporter: "Rohan Mehta",
    reported: "2 days ago",
    status: "Pending" as ModStatus,
  },
];

const REPORTED_USERS = [
  {
    id: 1,
    name: "fake_recruiter_xyz",
    type: "Recruiter",
    reason: "Posting fraudulent jobs",
    reporter: "Multiple candidates",
    reported: "Today",
    status: "Pending" as ModStatus,
  },
  {
    id: 2,
    name: "spam_user_001",
    type: "Candidate",
    reason: "Sending spam messages",
    reporter: "TechCorp Solutions",
    reported: "Yesterday",
    status: "Pending" as ModStatus,
  },
  {
    id: 3,
    name: "bot_account_12",
    type: "Candidate",
    reason: "Automated application bot",
    reporter: "System",
    reported: "3 days ago",
    status: "Banned" as ModStatus,
  },
  {
    id: 4,
    name: "abusive_recruiter",
    type: "Recruiter",
    reason: "Abusive messaging to candidates",
    reporter: "Ananya Singh",
    reported: "4 days ago",
    status: "Pending" as ModStatus,
  },
];

const CONTENT = [
  {
    id: 1,
    content: "Offensive language in job description",
    company: "Removed Co.",
    reason: "Hate speech",
    reporter: "System AI",
    reported: "Today",
    status: "Pending" as ModStatus,
  },
  {
    id: 2,
    content: "Inappropriate profile photo",
    user: "user_xyz",
    reason: "Violates community guidelines",
    reporter: "Candidate report",
    reported: "2 days ago",
    status: "Removed" as ModStatus,
  },
];

const SPAM = [
  {
    id: 1,
    name: "auto_apply_bot",
    type: "Candidate",
    reason: "Applied to 500+ jobs in 1 hour",
    detected: "System",
    reported: "Today",
    status: "Pending" as ModStatus,
  },
];

export default function AdminModeration() {
  const [tab, setTab] = useState(0);
  const [flaggedJobs, setFlaggedJobs] = useState(FLAGGED_JOBS);
  const [reportedUsers, setReportedUsers] = useState(REPORTED_USERS);
  const [content, setContent] = useState(CONTENT);
  const [spam, setSpam] = useState(SPAM);
  const [confirmModal, setConfirmModal] = useState<{
    item: Record<string, unknown>;
    action: string;
    type: string;
  } | null>(null);

  const tabs = [
    {
      label: "Flagged Jobs",
      count: flaggedJobs.filter((j) => j.status === "Pending").length,
    },
    {
      label: "Reported Users",
      count: reportedUsers.filter((u) => u.status === "Pending").length,
    },
    {
      label: "Inappropriate Content",
      count: content.filter((c) => c.status === "Pending").length,
    },
    {
      label: "Spam Accounts",
      count: spam.filter((s) => s.status === "Pending").length,
    },
  ];

  const doAction = () => {
    if (!confirmModal) return;
    const { item, action, type } = confirmModal;
    const id = item.id as number;
    const newStatus: ModStatus =
      action === "Approve"
        ? "Approved"
        : action === "Remove"
          ? "Removed"
          : "Banned";
    if (type === "jobs")
      setFlaggedJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)),
      );
    if (type === "users")
      setReportedUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
      );
    if (type === "content")
      setContent((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      );
    if (type === "spam")
      setSpam((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
      );
    setConfirmModal(null);
  };

  const statusStyle: Record<ModStatus, string> = {
    Pending: "bg-yellow-50 text-yellow-700",
    Approved: "bg-[#DCFCE7] text-[#16A34A]",
    Removed: "bg-[#FEE2E2] text-[#EF4444]",
    Banned: "bg-gray-100 text-gray-600",
  };

  const ActionButtons = ({
    item,
    type,
  }: { item: Record<string, unknown>; type: string }) => (
    <div className="flex items-center gap-1.5">
      {(item.status as string) === "Pending" && (
        <>
          <button
            type="button"
            onClick={() => setConfirmModal({ item, action: "Approve", type })}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
          >
            <CheckCircle size={11} />
            Approve
          </button>
          <button
            type="button"
            onClick={() => setConfirmModal({ item, action: "Remove", type })}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
          >
            <AlertTriangle size={11} />
            Remove
          </button>
          {(type === "users" || type === "spam") && (
            <button
              type="button"
              onClick={() => setConfirmModal({ item, action: "Ban", type })}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Ban size={11} />
              Ban
            </button>
          )}
        </>
      )}
      {(item.status as string) !== "Pending" && (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[item.status as ModStatus]}`}
        >
          {item.status as string}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <ShieldAlert size={20} className="text-orange-500" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Moderation</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and take action on flagged content
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-200">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setTab(i)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${tab === i ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t.label}{" "}
            {t.count > 0 && (
              <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="flex flex-col gap-3">
          {flaggedJobs.map((j) => (
            <div
              key={j.id}
              className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {j.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {j.company} · Reported by {j.reporter} · {j.reported}
                  </p>
                  <p className="text-xs text-orange-600 mt-1 bg-orange-50 px-2 py-0.5 rounded-full inline-block">
                    Reason: {j.reason}
                  </p>
                </div>
                <ActionButtons
                  item={j as unknown as Record<string, unknown>}
                  type="jobs"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="flex flex-col gap-3">
          {reportedUsers.map((u) => (
            <div
              key={u.id}
              className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {u.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {u.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Reported by {u.reporter} · {u.reported}
                  </p>
                  <p className="text-xs text-red-600 mt-1 bg-red-50 px-2 py-0.5 rounded-full inline-block">
                    Reason: {u.reason}
                  </p>
                </div>
                <ActionButtons
                  item={u as unknown as Record<string, unknown>}
                  type="users"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="flex flex-col gap-3">
          {content.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {c.content}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Detected by {c.reporter} · {c.reported}
                  </p>
                  <p className="text-xs text-orange-600 mt-1 bg-orange-50 px-2 py-0.5 rounded-full inline-block">
                    Reason: {c.reason}
                  </p>
                </div>
                <ActionButtons
                  item={c as unknown as Record<string, unknown>}
                  type="content"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div className="flex flex-col gap-3">
          {spam.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {s.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Detected by {s.detected} · {s.reported}
                  </p>
                  <p className="text-xs text-red-600 mt-1 bg-red-50 px-2 py-0.5 rounded-full inline-block">
                    Reason: {s.reason}
                  </p>
                </div>
                <ActionButtons
                  item={s as unknown as Record<string, unknown>}
                  type="spam"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!confirmModal} onOpenChange={() => setConfirmModal(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Confirm {confirmModal?.action}</DialogTitle>
          </DialogHeader>
          {confirmModal && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-gray-600">
                Are you sure you want to{" "}
                <strong>{confirmModal.action.toLowerCase()}</strong> this item?
                This action will be logged.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={doAction}
                  className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
                >
                  Confirm {confirmModal.action}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
