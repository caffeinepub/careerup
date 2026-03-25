import {
  BarChart2,
  Bell,
  Building2,
  Camera,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  Crown,
  Eye,
  FileText,
  HelpCircle,
  LogOut,
  MapPin,
  MessageCircle,
  Moon,
  Pencil,
  Send,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import ProUpgradeSheet from "../components/ProUpgradeSheet";
import MarketInsightsScreen from "./MarketInsightsScreen";

const PROFILE_PHOTO = "/assets/generated/profile-avatar.dim_200x200.jpg";

type SubScreen =
  | null
  | "documents"
  | "market-insights"
  | "notifications"
  | "settings";

type SettingsSection =
  | null
  | "personal-information"
  | "login-security"
  | "subscription"
  | "notification"
  | "dark-mode"
  | "help-center";

const STATS: { label: string; value: string; Icon: LucideIcon }[] = [
  { label: "Profile Views", value: "234", Icon: Eye },
  { label: "Recruiter Actions", value: "18", Icon: Send },
  { label: "Matches", value: "47", Icon: Sparkles },
];

const MENU_ITEMS: {
  Icon: LucideIcon;
  label: string;
  sub: string;
  screen: SubScreen;
}[] = [
  {
    Icon: FileText,
    label: "Documents",
    sub: "2 files uploaded",
    screen: "documents",
  },
  {
    Icon: BarChart2,
    label: "Market Insights",
    sub: "Your market value",
    screen: "market-insights",
  },
  {
    Icon: Bell,
    label: "Notifications",
    sub: "Manage alerts",
    screen: "notifications",
  },
  {
    Icon: Settings,
    label: "Settings",
    sub: "Account & privacy",
    screen: "settings",
  },
];

const SETTINGS_MENU: {
  Icon: LucideIcon;
  label: string;
  sub: string;
  key: SettingsSection;
}[] = [
  {
    Icon: User,
    label: "Personal Information",
    sub: "Edit your profile details",
    key: "personal-information",
  },
  {
    Icon: Shield,
    label: "Login Security",
    sub: "Password & authentication",
    key: "login-security",
  },
  {
    Icon: Crown,
    label: "Subscription",
    sub: "Manage your plan",
    key: "subscription",
  },
  {
    Icon: Bell,
    label: "Notification",
    sub: "Manage alerts",
    key: "notification",
  },
  {
    Icon: Moon,
    label: "Dark Mode",
    sub: "Appearance",
    key: "dark-mode",
  },
  {
    Icon: HelpCircle,
    label: "Help Center",
    sub: "FAQ & support",
    key: "help-center",
  },
];

function SubScreenHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white border-b border-gray-100">
      <button
        type="button"
        data-ocid="profile.subscreen.close_button"
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold"
      >
        ←
      </button>
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}

function ToggleSwitch({
  on,
  onToggle,
  large,
}: {
  on: boolean;
  onToggle: () => void;
  large?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative rounded-full transition-all flex-shrink-0 ${
        large ? "w-16 h-8" : "w-12 h-6"
      }`}
      style={{
        background: on
          ? "linear-gradient(135deg, #2563EB, #7C3AED)"
          : "#e5e7eb",
      }}
    >
      <span
        className={`absolute top-0.5 rounded-full bg-white shadow transition-all ${
          large ? "w-7 h-7" : "w-5 h-5"
        }`}
        style={{
          left: on
            ? large
              ? "calc(100% - 30px)"
              : "calc(100% - 22px)"
            : "2px",
        }}
      />
    </button>
  );
}

// ─── Documents ─────────────────────────────────────────────────────────────
function DocumentsSubScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Documents" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
          <div className="flex items-center gap-4 p-4 border-b border-gray-50">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
              }}
            >
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">
                Alex_Johnson_Resume.pdf
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Updated 3 days ago</p>
            </div>
            <button
              type="button"
              data-ocid="documents.view.button"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              View
            </button>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
              }}
            >
              <ClipboardList className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">
                Cover_Letter_Template.docx
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Updated 1 week ago</p>
            </div>
            <button
              type="button"
              data-ocid="documents.view.button"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 pb-8">
        <button
          type="button"
          data-ocid="documents.upload_button"
          className="w-full py-4 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          <span>+</span> Upload Document
        </button>
      </div>
    </div>
  );
}

// ─── Market Insights ────────────────────────────────────────────────────────
function MarketInsightsSubScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full relative">
      <button
        type="button"
        data-ocid="profile.subscreen.close_button"
        onClick={onBack}
        className="absolute top-14 left-5 z-20 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        ←
      </button>
      <div className="flex-1 overflow-hidden">
        <MarketInsightsScreen />
      </div>
    </div>
  );
}

// ─── Notifications ──────────────────────────────────────────────────────────
function NotificationsSubScreen({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState({
    matches: true,
    messages: true,
    applications: true,
    interviews: true,
    insights: false,
  });

  const NOTIF_ITEMS: {
    key: keyof typeof toggles;
    Icon: LucideIcon;
    label: string;
    sub: string;
  }[] = [
    {
      key: "matches",
      Icon: Target,
      label: "New Job Matches",
      sub: "Get notified for new 85%+ matches",
    },
    {
      key: "messages",
      Icon: MessageCircle,
      label: "Messages",
      sub: "New recruiter messages",
    },
    {
      key: "applications",
      Icon: Send,
      label: "Application Updates",
      sub: "Status changes on applications",
    },
    {
      key: "interviews",
      Icon: Bell,
      label: "Interview Reminders",
      sub: "24hr before interviews",
    },
    {
      key: "insights",
      Icon: BarChart2,
      label: "Market Insights",
      sub: "Weekly market reports",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {NOTIF_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={`flex items-center gap-4 px-4 py-4 ${
                i < NOTIF_ITEMS.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <item.Icon className="w-5 h-5 text-gray-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
              <ToggleSwitch
                on={toggles[item.key]}
                onToggle={() =>
                  setToggles((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings: Personal Information ─────────────────────────────────────────
function PersonalInformationScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("San Francisco, CA");
  const [bio, setBio] = useState(
    "Senior Product Designer with 6+ years experience in mobile & web.",
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white";
  const labelClass = "text-xs font-semibold text-gray-500 mb-1.5 block";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Personal Information" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-20 h-20">
            <img
              src={PROFILE_PHOTO}
              alt="Profile"
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <button
              type="button"
              data-ocid="personal_info.upload_button"
              className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <p className="text-xs text-blue-600 font-semibold mt-3">
            Change Photo
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className={labelClass}>Full Name</p>
            <input
              data-ocid="personal_info.input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your full name"
            />
          </div>
          <div>
            <p className={labelClass}>Email</p>
            <input
              data-ocid="personal_info.input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="Email address"
            />
          </div>
          <div>
            <p className={labelClass}>Phone</p>
            <input
              data-ocid="personal_info.input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="Phone number"
            />
          </div>
          <div>
            <p className={labelClass}>Location</p>
            <input
              data-ocid="personal_info.input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
              placeholder="City, Country"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <p className={labelClass.replace(" mb-1.5", "")}>Bio</p>
              <span className="text-xs text-gray-400">{bio.length}/200</span>
            </div>
            <textarea
              data-ocid="personal_info.textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 200))}
              className={`${inputClass} resize-none h-24`}
              placeholder="Tell recruiters about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white border-t border-gray-100">
        <button
          type="button"
          data-ocid="personal_info.save_button"
          onClick={handleSave}
          className="w-full py-4 rounded-2xl text-white font-semibold text-sm transition-all"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Settings: Login Security ────────────────────────────────────────────────
function LoginSecurityScreen({ onBack }: { onBack: () => void }) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const sessions = [
    {
      device: "iPhone 15 Pro",
      location: "Mumbai, India",
      lastActive: "Active now",
    },
    {
      device: "MacBook Pro",
      location: "Bengaluru, India",
      lastActive: "2 hours ago",
    },
    { device: "iPad Air", location: "Delhi, India", lastActive: "Yesterday" },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white";
  const labelClass = "text-xs font-semibold text-gray-500 mb-1.5 block";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Login Security" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Change Password */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Change Password
          </p>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <div>
              <p className={labelClass}>Current Password</p>
              <input
                data-ocid="security.input"
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                className={inputClass}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <p className={labelClass}>New Password</p>
              <input
                data-ocid="security.input"
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className={inputClass}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <p className={labelClass}>Confirm New Password</p>
              <input
                data-ocid="security.input"
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className={inputClass}
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="button"
              data-ocid="security.save_button"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Biometric & 2FA */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Authentication
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-50">
              <Smartphone className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Biometric Login
                </p>
                <p className="text-xs text-gray-400">Face ID / Fingerprint</p>
              </div>
              <ToggleSwitch
                on={biometric}
                onToggle={() => setBiometric((v) => !v)}
              />
            </div>
            <div className="flex items-center gap-4 px-4 py-4">
              <Shield className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-400">
                  Extra security for your account
                </p>
              </div>
              <ToggleSwitch
                on={twoFactor}
                onToggle={() => setTwoFactor((v) => !v)}
              />
            </div>
          </div>
          {twoFactor && (
            <div
              className="mt-3 p-3 rounded-xl flex items-start gap-2"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
              }}
            >
              <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                2FA is now enabled. Use your authenticator app to generate codes
                when signing in.
              </p>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Active Sessions
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {sessions.map((s, i) => (
              <div
                key={s.device}
                className={`flex items-center gap-3 px-4 py-4 ${
                  i < sessions.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <Smartphone className="w-5 h-5 text-gray-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {s.device}
                  </p>
                  <p className="text-xs text-gray-400">
                    {s.location} · {s.lastActive}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="security.delete_button"
                  className="text-xs font-semibold text-red-500"
                >
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings: Subscription ──────────────────────────────────────────────────
function SubscriptionScreen({ onBack }: { onBack: () => void }) {
  const freeFeatures = [
    "5 swipes per day",
    "Basic job matching",
    "Standard support",
    "View job listings",
  ];
  const proFeatures = [
    "Unlimited swipes",
    "Super Apply feature",
    "See who viewed your profile",
    "Priority matching algorithm",
    "Advanced market insights",
    "Dedicated support",
  ];
  const billing = [
    {
      date: "Jan 1, 2025",
      description: "CareerUp Pro — Monthly",
      amount: "₹999",
      status: "Paid",
    },
    {
      date: "Dec 1, 2024",
      description: "CareerUp Pro — Monthly",
      amount: "₹999",
      status: "Paid",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Subscription" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Free Plan */}
        <div className="mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-bold text-gray-900">Free Plan</p>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                Current Plan
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Free forever</p>
            <div className="space-y-2">
              {freeFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="mb-4">
          <div
            className="rounded-2xl p-4 shadow-sm"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                <p className="text-base font-bold text-white">Pro Plan</p>
              </div>
              <p className="text-white font-bold">
                ₹999
                <span className="text-white/70 text-xs font-normal">/mo</span>
              </p>
            </div>
            <p className="text-white/70 text-xs mb-3">
              Everything in Free, plus:
            </p>
            <div className="space-y-2 mb-4">
              {proFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p className="text-sm text-white/90">{f}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-ocid="subscription.primary_button"
              className="w-full py-3 rounded-xl font-semibold text-sm bg-white"
              style={{ color: "#2563EB" }}
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Billing History */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Billing History
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {billing.map((b, i) => (
              <div
                key={b.date}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  i < billing.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {b.description}
                  </p>
                  <p className="text-xs text-gray-400">{b.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{b.amount}</p>
                  <span className="text-xs font-semibold text-green-600">
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <div className="mb-8">
          <button
            type="button"
            data-ocid="subscription.delete_button"
            disabled
            className="w-full py-3 text-center text-sm font-semibold text-gray-300"
          >
            Cancel Subscription
          </button>
          <p className="text-center text-xs text-gray-400 mt-1">
            Not available on Free plan
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Settings: Notification ──────────────────────────────────────────────────
function NotificationSettingsScreen({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState({
    matches: true,
    messages: true,
    applications: true,
    interviews: true,
    insights: false,
  });

  const NOTIF_ITEMS: {
    key: keyof typeof toggles;
    Icon: LucideIcon;
    label: string;
    sub: string;
  }[] = [
    {
      key: "matches",
      Icon: Target,
      label: "New Job Matches",
      sub: "Get notified for new 85%+ matches",
    },
    {
      key: "messages",
      Icon: MessageCircle,
      label: "Messages",
      sub: "New recruiter messages",
    },
    {
      key: "applications",
      Icon: Send,
      label: "Application Updates",
      sub: "Status changes on applications",
    },
    {
      key: "interviews",
      Icon: Bell,
      label: "Interview Reminders",
      sub: "24hr before interviews",
    },
    {
      key: "insights",
      Icon: BarChart2,
      label: "Market Insights",
      sub: "Weekly market reports",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Notification" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {NOTIF_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={`flex items-center gap-4 px-4 py-4 ${
                i < NOTIF_ITEMS.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <item.Icon className="w-5 h-5 text-gray-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
              <ToggleSwitch
                on={toggles[item.key]}
                onToggle={() =>
                  setToggles((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings: Dark Mode ─────────────────────────────────────────────────────
function DarkModeScreen({ onBack }: { onBack: () => void }) {
  const isDark = false;
  const toggle = () => {};

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Dark Mode" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Toggle Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1e293b, #334155)",
              }}
            >
              <Moon className="w-6 h-6 text-blue-300" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">Dark Mode</p>
              <p className="text-xs text-gray-400">
                {isDark ? "Enabled" : "Disabled"}
              </p>
            </div>
            <ToggleSwitch on={isDark} onToggle={toggle} large />
          </div>
        </div>

        {/* Preview */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-1">
          Preview
        </p>
        <div className="flex gap-3">
          {/* Light preview */}
          <div className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-100 bg-white shadow-sm">
            <div
              className="h-8 flex items-center px-3"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white/60 mr-1.5" />
              <div className="w-8 h-1.5 rounded-full bg-white/60" />
            </div>
            <div className="p-3">
              <div className="w-full h-2 rounded bg-gray-200 mb-2" />
              <div className="w-3/4 h-2 rounded bg-gray-100 mb-3" />
              <div className="flex gap-1.5">
                <div className="flex-1 h-6 rounded-lg bg-blue-100" />
                <div className="flex-1 h-6 rounded-lg bg-purple-100" />
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 pb-2 font-semibold">
              Light
            </p>
          </div>

          {/* Dark preview */}
          <div className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-700 bg-gray-900 shadow-sm">
            <div
              className="h-8 flex items-center px-3"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white/40 mr-1.5" />
              <div className="w-8 h-1.5 rounded-full bg-white/40" />
            </div>
            <div className="p-3">
              <div className="w-full h-2 rounded bg-gray-700 mb-2" />
              <div className="w-3/4 h-2 rounded bg-gray-800 mb-3" />
              <div className="flex gap-1.5">
                <div className="flex-1 h-6 rounded-lg bg-blue-900" />
                <div className="flex-1 h-6 rounded-lg bg-purple-900" />
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 pb-2 font-semibold">
              Dark
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings: Help Center ───────────────────────────────────────────────────
const FAQS: { q: string; a: string }[] = [
  {
    q: "How does CareerUp matching work?",
    a: "Our AI analyzes your skills, experience, and preferences to match you with the most relevant job openings. Matches are scored from 0–100% based on compatibility.",
  },
  {
    q: "How do I apply for a job?",
    a: "Swipe right on any job card to apply instantly, or tap a card to view details and use the Apply button. Your profile is submitted directly to the recruiter.",
  },
  {
    q: "What is Super Apply?",
    a: "Super Apply is a Pro feature that highlights your application to recruiters, placing it at the top of their inbox and signaling high intent.",
  },
  {
    q: "How do I upgrade to Pro?",
    a: "Go to Profile and tap 'Upgrade to Pro'. Pro unlocks unlimited swipes, Super Apply, who viewed your profile, and advanced market insights.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. Go to Settings > Subscription and tap 'Cancel Subscription'. Your Pro benefits continue until the end of the billing period.",
  },
  {
    q: "How do I update my resume?",
    a: "Go to Profile > Documents and upload a new version. The latest uploaded file will be used when you apply to jobs.",
  },
  {
    q: "Why am I not seeing new jobs?",
    a: "Try refreshing the job feed or updating your job preferences in your profile. On the Free plan, you may have reached your daily swipe limit.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings > Login Security and scroll to the bottom. Tap 'Delete Account' to permanently remove your data. This action cannot be undone.",
  },
  {
    q: "How do I contact support?",
    a: "Tap the 'Contact Support' button below to reach our team. We typically respond within 24 hours on business days.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted in transit and at rest. We comply with GDPR and never sell your personal data to third parties.",
  },
];

function HelpCenterScreen({ onBack }: { onBack: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Help Center" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={i < FAQS.length - 1 ? "border-b border-gray-50" : ""}
            >
              <button
                type="button"
                data-ocid={`help.item.${i + 1}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <p className="flex-1 text-sm font-semibold text-gray-800">
                  {faq.q}
                </p>
                {openIndex === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          data-ocid="help.primary_button"
          className="w-full py-4 rounded-2xl text-white font-semibold text-sm mb-8"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}

// ─── Settings Main Menu ──────────────────────────────────────────────────────
function SettingsSubScreen({ onBack }: { onBack: () => void }) {
  const [settingsSection, setSettingsSection] = useState<SettingsSection>(null);

  if (settingsSection === "personal-information") {
    return (
      <PersonalInformationScreen onBack={() => setSettingsSection(null)} />
    );
  }
  if (settingsSection === "login-security") {
    return <LoginSecurityScreen onBack={() => setSettingsSection(null)} />;
  }
  if (settingsSection === "subscription") {
    return <SubscriptionScreen onBack={() => setSettingsSection(null)} />;
  }
  if (settingsSection === "notification") {
    return (
      <NotificationSettingsScreen onBack={() => setSettingsSection(null)} />
    );
  }
  if (settingsSection === "dark-mode") {
    return <DarkModeScreen onBack={() => setSettingsSection(null)} />;
  }
  if (settingsSection === "help-center") {
    return <HelpCenterScreen onBack={() => setSettingsSection(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Settings" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
          {SETTINGS_MENU.map((item, i) => (
            <button
              type="button"
              key={item.key}
              data-ocid={`settings.${item.key}.button`}
              onClick={() => setSettingsSection(item.key)}
              className={`w-full flex items-center gap-4 px-4 py-4 text-left active:bg-gray-50 ${
                i < SETTINGS_MENU.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                }}
              >
                <item.Icon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Danger Zone
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              type="button"
              data-ocid="settings.delete_button"
              className="w-full flex items-center gap-4 px-4 py-4 text-left"
            >
              <LogOut className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm font-semibold text-red-500">
                Delete Account
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Main Screen ─────────────────────────────────────────────────────
export default function ProfileScreen(_props: { onUpgradePro: () => void }) {
  const [showPro, setShowPro] = useState(false);
  const [subScreen, setSubScreen] = useState<SubScreen>(null);
  const profileStrength = 78;

  if (subScreen === "documents") {
    return <DocumentsSubScreen onBack={() => setSubScreen(null)} />;
  }
  if (subScreen === "market-insights") {
    return <MarketInsightsSubScreen onBack={() => setSubScreen(null)} />;
  }
  if (subScreen === "notifications") {
    return <NotificationsSubScreen onBack={() => setSubScreen(null)} />;
  }
  if (subScreen === "settings") {
    return <SettingsSubScreen onBack={() => setSubScreen(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <img
              src={PROFILE_PHOTO}
              alt="Alex Johnson"
              className="w-16 h-16 rounded-2xl object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">Alex Johnson</p>
            <p className="text-gray-500 text-sm">Senior Product Designer</p>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> San Francisco, CA
            </p>
          </div>
        </div>

        {/* Profile strength */}
        <div
          className="p-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Profile Strength
            </p>
            <p className="text-sm font-bold" style={{ color: "#2563EB" }}>
              {profileStrength}% — Strong
            </p>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${profileStrength}%`,
                background: "linear-gradient(90deg, #2563EB, #7C3AED)",
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Add work experience to reach 90%
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-3 text-center shadow-sm"
            >
              <div className="flex justify-center mb-1">
                <s.Icon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Upgrade Card */}
      <div className="px-5 mb-4">
        <button
          type="button"
          onClick={() => setShowPro(true)}
          className="w-full p-5 rounded-2xl text-left relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 text-white" />
              <p className="text-white font-bold text-lg">Upgrade to Pro</p>
            </div>
            <p className="text-white/80 text-sm">
              Unlock Super Applies, profile views, and advanced insights
            </p>
            <div className="mt-3 inline-block bg-white/20 px-3 py-1.5 rounded-full">
              <p className="text-white text-xs font-semibold">
                Start Free Trial →
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -right-2 top-8 w-16 h-16 rounded-full bg-white/5" />
        </button>
      </div>

      {/* Menu */}
      <div className="px-5 pb-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {MENU_ITEMS.map((item, i) => (
            <button
              type="button"
              key={item.label}
              data-ocid={`profile.${item.screen}.button`}
              onClick={() => setSubScreen(item.screen)}
              className={`w-full flex items-center gap-4 px-4 py-4 text-left active:bg-gray-50 ${
                i < MENU_ITEMS.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <item.Icon className="w-5 h-5 text-gray-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <span className="text-gray-300">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div className="px-5 pb-8">
        <button
          type="button"
          className="w-full py-3 text-center text-sm font-semibold text-red-500"
        >
          Sign Out
        </button>
      </div>

      {showPro && <ProUpgradeSheet onClose={() => setShowPro(false)} />}
    </div>
  );
}
