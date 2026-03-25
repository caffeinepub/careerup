import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Shield, Trash2, Users } from "lucide-react";
import { useState } from "react";

const INITIAL_ADMINS = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@careerup.io",
    role: "Super Admin",
    lastLogin: "Today, 9:00 AM",
    status: "Active",
  },
  {
    id: 2,
    name: "Moderator Team",
    email: "mod@careerup.io",
    role: "Moderator",
    lastLogin: "Yesterday",
    status: "Active",
  },
  {
    id: 3,
    name: "Support Agent 1",
    email: "support1@careerup.io",
    role: "Support Agent",
    lastLogin: "2 days ago",
    status: "Active",
  },
  {
    id: 4,
    name: "Support Agent 2",
    email: "support2@careerup.io",
    role: "Support Agent",
    lastLogin: "1 week ago",
    status: "Inactive",
  },
];

const ROLES = [
  {
    name: "Super Admin",
    desc: "Full platform access",
    permissions: [
      "View All",
      "Edit All",
      "Delete",
      "Manage Admins",
      "Billing",
      "Settings",
    ],
  },
  {
    name: "Moderator",
    desc: "Content and user moderation",
    permissions: ["View All", "Moderate Content", "Ban Users", "View Reports"],
  },
  {
    name: "Support Agent",
    desc: "Handle support tickets",
    permissions: ["View Tickets", "Reply Tickets", "View Users", "View Jobs"],
  },
];

type Admin = (typeof INITIAL_ADMINS)[0];

export default function AdminSettings() {
  const [tab, setTab] = useState(0);
  const [admins, setAdmins] = useState<Admin[]>(INITIAL_ADMINS);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Admin | null>(null);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    role: "Moderator",
  });
  const [addFormError, setAddFormError] = useState("");

  const [platformConfig, setPlatformConfig] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    jobAutoApproval: false,
    emailNotifications: true,
    aiMatching: true,
    analyticsTracking: true,
  });
  const [notifPrefs, setNotifPrefs] = useState({
    newRecruiter: true,
    flaggedContent: true,
    supportTicket: true,
    newSubscription: true,
    refundRequest: true,
    systemAlert: true,
  });

  const tabs = [
    "Admin Users",
    "Roles & Permissions",
    "Platform Config",
    "Notifications",
  ];

  const handleAddAdmin = () => {
    if (!addForm.name.trim() || !addForm.email.trim()) {
      setAddFormError("Name and email are required.");
      return;
    }
    setAdmins((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: addForm.name.trim(),
        email: addForm.email.trim(),
        role: addForm.role,
        lastLogin: "Never",
        status: "Active",
      },
    ]);
    setAddForm({ name: "", email: "", role: "Moderator" });
    setAddFormError("");
    setAddAdminOpen(false);
  };

  const handleRemoveAdmin = () => {
    if (!removeTarget) return;
    setAdmins((prev) => prev.filter((a) => a.id !== removeTarget.id));
    setRemoveTarget(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-gray-900">Admin Settings</h2>

      <div className="flex items-center gap-2 border-b border-gray-200">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${tab === i ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {admins.length} admin accounts
            </p>
            <button
              type="button"
              onClick={() => {
                setAddAdminOpen(true);
                setAddFormError("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
            >
              <Plus size={14} />
              Add Admin
            </button>
          </div>
          <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Admin", "Role", "Last Login", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {admins.map((a, i) => (
                  <tr
                    key={a.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 ${i === admins.length - 1 ? "border-0" : ""}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">
                            {a.name[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {a.name}
                          </p>
                          <p className="text-xs text-gray-400">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.role === "Super Admin" ? "bg-purple-100 text-purple-700" : a.role === "Moderator" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {a.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {a.lastLogin}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.status === "Active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-gray-100 text-gray-500"}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {a.role !== "Super Admin" && (
                        <button
                          type="button"
                          onClick={() => setRemoveTarget(a)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash2 size={11} />
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="grid grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  {r.name === "Super Admin" ? (
                    <Shield size={15} className="text-purple-600" />
                  ) : r.name === "Moderator" ? (
                    <Shield size={15} className="text-orange-600" />
                  ) : (
                    <Users size={15} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-400">{r.desc}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {r.permissions.map((p) => (
                  <div key={p} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{p}</span>
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            Platform Configuration
          </h3>
          <div className="flex flex-col gap-4">
            {(
              Object.entries(platformConfig) as [
                keyof typeof platformConfig,
                boolean,
              ][]
            ).map(([key, val]) => {
              const labels: Record<
                keyof typeof platformConfig,
                { label: string; desc: string }
              > = {
                maintenanceMode: {
                  label: "Maintenance Mode",
                  desc: "Temporarily disable access for all users",
                },
                newRegistrations: {
                  label: "Allow New Registrations",
                  desc: "Enable new recruiter and candidate signups",
                },
                jobAutoApproval: {
                  label: "Auto-approve Job Postings",
                  desc: "Skip manual review for new job postings",
                },
                emailNotifications: {
                  label: "Email Notifications",
                  desc: "Send email alerts to users for important events",
                },
                aiMatching: {
                  label: "AI Matching Engine",
                  desc: "Enable AI-powered candidate-job matching",
                },
                analyticsTracking: {
                  label: "Analytics Tracking",
                  desc: "Collect platform usage analytics",
                },
              };
              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {labels[key].label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {labels[key].desc}
                    </p>
                  </div>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) =>
                      setPlatformConfig((prev) => ({ ...prev, [key]: v }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 3 && (
        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            Email Notification Preferences
          </h3>
          <div className="flex flex-col gap-4">
            {(
              Object.entries(notifPrefs) as [keyof typeof notifPrefs, boolean][]
            ).map(([key, val]) => {
              const labels: Record<
                keyof typeof notifPrefs,
                { label: string; desc: string }
              > = {
                newRecruiter: {
                  label: "New Recruiter Signup",
                  desc: "Notify when a new company registers",
                },
                flaggedContent: {
                  label: "Flagged Content Alert",
                  desc: "Notify when content is flagged for review",
                },
                supportTicket: {
                  label: "New Support Ticket",
                  desc: "Notify when a new ticket is opened",
                },
                newSubscription: {
                  label: "New Subscription",
                  desc: "Notify on plan upgrades or new subscriptions",
                },
                refundRequest: {
                  label: "Refund Request",
                  desc: "Notify when a refund is requested",
                },
                systemAlert: {
                  label: "System Alerts",
                  desc: "Critical platform alerts and errors",
                },
              };
              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {labels[key].label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {labels[key].desc}
                    </p>
                  </div>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) =>
                      setNotifPrefs((prev) => ({ ...prev, [key]: v }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      <Dialog
        open={addAdminOpen}
        onOpenChange={(v) => {
          setAddAdminOpen(v);
          setAddFormError("");
        }}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                Full Name *
              </p>
              <Input
                value={addForm.name}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. John Smith"
                className="bg-white border-gray-200 rounded-xl h-9 text-sm"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Email *</p>
              <Input
                type="email"
                value={addForm.email}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="e.g. john@careerup.io"
                className="bg-white border-gray-200 rounded-xl h-9 text-sm"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Role</p>
              <select
                value={addForm.role}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, role: e.target.value }))
                }
                className="w-full h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none"
              >
                <option>Moderator</option>
                <option>Support Agent</option>
              </select>
            </div>
            {addFormError && (
              <p className="text-xs text-red-500">{addFormError}</p>
            )}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={handleAddAdmin}
                className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
              >
                Add Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddAdminOpen(false);
                  setAddFormError("");
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Admin Confirmation Modal */}
      <Dialog open={!!removeTarget} onOpenChange={() => setRemoveTarget(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Remove Admin</DialogTitle>
          </DialogHeader>
          {removeTarget && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-gray-600">
                Are you sure you want to remove{" "}
                <strong>{removeTarget.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRemoveAdmin}
                  className="flex-1 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setRemoveTarget(null)}
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
