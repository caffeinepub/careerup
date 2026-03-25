import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Building2,
  CreditCard,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  Moon,
  Plus,
  Save,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BILLING_HISTORY, JOB_TEMPLATES } from "../data/mockData";

const TABS = [
  { id: "company", label: "Company Info", icon: <Building2 size={14} /> },
  { id: "templates", label: "Job Templates", icon: <FileText size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} /> },
  { id: "billing", label: "Billing", icon: <CreditCard size={14} /> },
  { id: "security", label: "Security", icon: <Shield size={14} /> },
] as const;

type Tab = (typeof TABS)[number]["id"];

type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  fields: string[];
};

const SESSIONS = [
  {
    id: "s1",
    device: "MacBook Pro — Chrome",
    location: "Bangalore, India",
    time: "Current session",
    current: true,
  },
  {
    id: "s2",
    device: "iPhone 15 — Safari",
    location: "Mumbai, India",
    time: "2 hours ago",
    current: false,
  },
  {
    id: "s3",
    device: "Windows PC — Edge",
    location: "Delhi, India",
    time: "1 day ago",
    current: false,
  },
];

const COMPANY_FIELDS: [string, string, string][] = [
  ["Company Name", "name", "company-name"],
  ["Industry", "industry", "company-industry"],
  ["Company Size", "size", "company-size"],
  ["Website", "website", "company-website"],
  ["Location", "location", "company-location"],
];

function TemplateModal({
  template,
  onSave,
  onClose,
}: {
  template?: Template;
  onSave: (t: Omit<Template, "id"> & { id?: string }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Template, "id">>(
    template ?? { title: "", category: "", description: "", fields: [] },
  );
  const [fieldInput, setFieldInput] = useState("");
  const valid = form.title.trim() && form.category.trim();

  const addField = () => {
    if (!fieldInput.trim()) return;
    setForm((p) => ({ ...p, fields: [...p.fields, fieldInput.trim()] }));
    setFieldInput("");
  };

  const removeField = (idx: number) =>
    setForm((p) => ({ ...p, fields: p.fields.filter((_, i) => i !== idx) }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
        data-ocid="settings.template.modal"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">
            {template ? "Edit Template" : "New Template"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="tmpl-title"
                className="text-xs font-semibold text-gray-500 block mb-1"
              >
                Title
              </label>
              <input
                id="tmpl-title"
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
                data-ocid="settings.template.title.input"
              />
            </div>
            <div>
              <label
                htmlFor="tmpl-cat"
                className="text-xs font-semibold text-gray-500 block mb-1"
              >
                Category
              </label>
              <input
                id="tmpl-cat"
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="tmpl-desc"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Description
            </label>
            <textarea
              id="tmpl-desc"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none resize-none focus:border-indigo-300 transition"
              data-ocid="settings.template.description.textarea"
            />
          </div>
          <div>
            <label
              htmlFor="tmpl-field-input"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Fields
            </label>
            <div className="flex gap-2 mb-2">
              <input
                id="tmpl-field-input"
                type="text"
                value={fieldInput}
                onChange={(e) => setFieldInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addField()}
                placeholder="Add a section (e.g. Responsibilities)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-300 transition"
              />
              <button
                type="button"
                onClick={addField}
                className="gradient-btn px-3 py-2 rounded-xl text-sm font-semibold"
              >
                <Plus size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.fields.map((f, i) => (
                <span
                  key={f}
                  className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeField(i)}
                    className="hover:text-red-500 transition"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl"
            data-ocid="settings.template.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              if (valid) {
                onSave({
                  ...(template?.id ? { id: template.id } : {}),
                  ...form,
                });
                onClose();
              }
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl disabled:opacity-40"
            data-ocid="settings.template.save_button"
          >
            {template ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("company");
  const [companyInfo, setCompanyInfo] = useState({
    name: "TechCorp Solutions",
    industry: "Enterprise SaaS",
    size: "500–1,000",
    website: "https://techcorp.io",
    description: "Building world-class software for enterprises globally.",
    location: "Bangalore, Karnataka, India",
  });
  const [notifs, setNotifs] = useState({
    emailApplications: true,
    emailInterviews: true,
    emailOffers: false,
    inAppAll: true,
    weeklyDigest: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);
  const [templates, setTemplates] = useState<Template[]>(JOB_TEMPLATES);
  const [templateModal, setTemplateModal] = useState<{
    open: boolean;
    template?: Template;
  }>({ open: false });
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const updateCompany = (field: keyof typeof companyInfo, value: string) =>
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));

  const saveCompany = () =>
    toast.success("Company information saved successfully!");

  const saveTemplate = (t: Omit<Template, "id"> & { id?: string }) => {
    if (t.id) {
      setTemplates((prev) =>
        prev.map((tmpl) =>
          tmpl.id === t.id ? ({ ...tmpl, ...t } as Template) : tmpl,
        ),
      );
      toast.success("Template updated!");
    } else {
      setTemplates((prev) => [...prev, { ...t, id: `jt_${Date.now()}` }]);
      toast.success("Template created!");
    }
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast.success("Template deleted.");
  };

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session revoked.");
  };

  const updatePassword = () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordForm.next.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setPasswordForm({ current: "", next: "", confirm: "" });
    toast.success("Password updated successfully!");
  };

  const inputCls =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-indigo-300 transition";

  return (
    <>
      {templateModal.open && (
        <TemplateModal
          template={templateModal.template}
          onSave={saveTemplate}
          onClose={() => setTemplateModal({ open: false })}
        />
      )}

      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and configuration
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 bg-white border border-gray-200 shadow-sm p-1.5 w-fit rounded-2xl"
          data-ocid="settings.tab"
        >
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl transition ${
                activeTab === tab.id
                  ? "gradient-active text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              data-ocid={`settings.${tab.id}.tab`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Company Info */}
        {activeTab === "company" && (
          <div
            className="glass-card p-6 space-y-4"
            data-ocid="settings.company.panel"
          >
            <h3 className="font-semibold text-gray-900">Company Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {COMPANY_FIELDS.map(([labelText, field, inputId]) => (
                <div key={field}>
                  <label
                    htmlFor={inputId}
                    className="text-xs font-semibold text-gray-500 mb-1.5 block"
                  >
                    {labelText}
                  </label>
                  <input
                    id={inputId}
                    type="text"
                    value={companyInfo[field as keyof typeof companyInfo]}
                    onChange={(e) =>
                      updateCompany(
                        field as keyof typeof companyInfo,
                        e.target.value,
                      )
                    }
                    className={inputCls}
                    data-ocid={`settings.company.${field}.input`}
                  />
                </div>
              ))}
            </div>
            <div>
              <label
                htmlFor="company-description"
                className="text-xs font-semibold text-gray-500 mb-1.5 block"
              >
                Description
              </label>
              <textarea
                id="company-description"
                rows={3}
                value={companyInfo.description}
                onChange={(e) => updateCompany("description", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none resize-none focus:border-indigo-300 transition"
                data-ocid="settings.company.description.textarea"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={saveCompany}
                className="gradient-btn text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2"
                data-ocid="settings.company.save_button"
              >
                <Save size={13} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Job Templates */}
        {activeTab === "templates" && (
          <div
            className="glass-card p-6 space-y-4"
            data-ocid="settings.templates.panel"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Job Templates</h3>
              <button
                type="button"
                onClick={() => setTemplateModal({ open: true })}
                className="flex items-center gap-1.5 text-xs gradient-btn px-3 py-1.5 rounded-lg font-semibold"
                data-ocid="settings.templates.add_button"
              >
                <Plus size={12} /> Add Template
              </button>
            </div>
            <div className="space-y-3" data-ocid="settings.templates.list">
              {templates.length === 0 && (
                <p
                  className="text-sm text-gray-400 text-center py-8"
                  data-ocid="settings.templates.empty_state"
                >
                  No templates yet. Click "Add Template" to create one.
                </p>
              )}
              {templates.map((t, i) => (
                <div
                  key={t.id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  data-ocid={`settings.template.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t.category} Template
                      </p>
                      {t.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {t.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {t.fields.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <button
                        type="button"
                        onClick={() =>
                          setTemplateModal({ open: true, template: t })
                        }
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
                        data-ocid={`settings.template.edit_button.${i + 1}`}
                      >
                        <Edit2 size={11} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTemplate(t.id)}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                        data-ocid={`settings.template.delete_button.${i + 1}`}
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div
            className="glass-card p-6 space-y-5"
            data-ocid="settings.notifications.panel"
          >
            <h3 className="font-semibold text-gray-900">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email Notifications
              </p>
              {(
                [
                  ["New Applications", "emailApplications"],
                  ["Interview Reminders", "emailInterviews"],
                  ["Offer Acceptances", "emailOffers"],
                ] as [string, keyof typeof notifs][]
              ).map(([label, key]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400">
                      Receive an email when this event occurs
                    </p>
                  </div>
                  <Switch
                    checked={notifs[key]}
                    onCheckedChange={(v) => {
                      setNotifs((prev) => ({ ...prev, [key]: v }));
                      toast.success(
                        `${label} notifications ${v ? "enabled" : "disabled"}`,
                      );
                    }}
                    data-ocid={`settings.${key}.switch`}
                  />
                </div>
              ))}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
                In-App & Digest
              </p>
              {(
                [
                  ["All In-App Notifications", "inAppAll"],
                  ["Weekly Digest", "weeklyDigest"],
                ] as [string, keyof typeof notifs][]
              ).map(([label, key]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400">
                      Shown in the notifications panel
                    </p>
                  </div>
                  <Switch
                    checked={notifs[key]}
                    onCheckedChange={(v) => {
                      setNotifs((prev) => ({ ...prev, [key]: v }));
                      toast.success(`${label} ${v ? "enabled" : "disabled"}`);
                    }}
                    data-ocid={`settings.${key}.switch`}
                  />
                </div>
              ))}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
                Appearance
              </p>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Moon size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Dark Mode
                    </p>
                    <p className="text-xs text-gray-400">
                      Toggle dark/light interface theme
                    </p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={(v) => {
                    setDarkMode(v);
                    toast.success(`Dark mode ${v ? "enabled" : "disabled"}`);
                  }}
                  data-ocid="settings.darkMode.switch"
                />
              </div>
            </div>
          </div>
        )}

        {/* Billing */}
        {activeTab === "billing" && (
          <div className="space-y-4" data-ocid="settings.billing.panel">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Current Plan</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    You are on the Pro plan — renews Apr 1, 2025
                  </p>
                </div>
                <span className="gradient-active text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  PRO
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  "Unlimited Job Postings",
                  "Priority Candidate Matching",
                  "Advanced Analytics",
                  "Dedicated Support",
                  "Team Collaboration",
                  "API Access",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    toast.success(
                      "Upgrade to Enterprise: Our sales team will contact you within 24 hours!",
                    )
                  }
                  className="text-xs font-semibold px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition"
                  data-ocid="settings.upgrade.button"
                >
                  Upgrade to Enterprise
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.error(
                      "To cancel your subscription, please contact support@careerups.io",
                    )
                  }
                  className="text-xs text-red-500 hover:text-red-600 transition"
                  data-ocid="settings.cancel.button"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Billing History
              </h3>
              <table
                className="w-full text-sm"
                data-ocid="settings.billing.table"
              >
                <thead>
                  <tr className="border-b border-gray-200">
                    {["Date", "Description", "Amount", "Status", ""].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {BILLING_HISTORY.map((b, i) => (
                    <tr
                      key={b.id}
                      className="border-b border-gray-100"
                      data-ocid={`settings.billing.row.${i + 1}`}
                    >
                      <td className="py-3 pr-4 text-xs text-gray-400">
                        {b.date}
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-700">
                        {b.description}
                      </td>
                      <td className="py-3 pr-4 text-xs font-semibold text-gray-900">
                        {b.amount}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() =>
                            toast.success(`Invoice for ${b.date} downloaded!`)
                          }
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="space-y-4" data-ocid="settings.security.panel">
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <div className="space-y-3">
                {(["current", "next", "confirm"] as const).map((k) => {
                  const labels = {
                    current: "Current Password",
                    next: "New Password",
                    confirm: "Confirm New Password",
                  };
                  return (
                    <div key={k}>
                      <label
                        htmlFor={`pwd-${k}`}
                        className="text-xs font-semibold text-gray-500 mb-1.5 block"
                      >
                        {labels[k]}
                      </label>
                      <div className="relative">
                        <input
                          id={`pwd-${k}`}
                          type={showPassword ? "text" : "password"}
                          value={passwordForm[k]}
                          onChange={(e) =>
                            setPasswordForm((p) => ({
                              ...p,
                              [k]: e.target.value,
                            }))
                          }
                          placeholder={labels[k]}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none pr-10 focus:border-indigo-300 transition"
                          data-ocid={`settings.${k}_password.input`}
                        />
                        {k === "confirm" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                          >
                            {showPassword ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={updatePassword}
                className="gradient-btn text-xs font-semibold px-5 py-2.5 rounded-xl"
                data-ocid="settings.password.save_button"
              >
                Update Password
              </button>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Add an extra layer of security using your authenticator app.
                  </p>
                </div>
                <Switch
                  checked={twoFA}
                  onCheckedChange={(v) => {
                    setTwoFA(v);
                    toast.success(`2FA ${v ? "enabled" : "disabled"}`);
                  }}
                  data-ocid="settings.2fa.switch"
                />
              </div>
              {twoFA && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-xs text-green-700 font-medium">
                    2FA is active. Your account is protected.
                  </p>
                </div>
              )}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                {sessions.map((session, i) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
                    data-ocid={`settings.session.item.${i + 1}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {session.device}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {session.location} — {session.time}
                      </p>
                    </div>
                    {session.current ? (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                        Current
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => revokeSession(session.id)}
                        className="text-xs text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg transition"
                        data-ocid={`settings.session.revoke_button.${i + 1}`}
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No active sessions.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
