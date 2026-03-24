import {
  BarChart2,
  Bell,
  Building2,
  ClipboardList,
  Crown,
  DollarSign,
  Eye,
  FileText,
  Globe,
  MapPin,
  MessageCircle,
  Pencil,
  Send,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import ProUpgradeSheet from "../components/ProUpgradeSheet";

type SubScreen =
  | null
  | "documents"
  | "market-insights"
  | "notifications"
  | "settings";

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

function SubScreenHeader({
  title,
  onBack,
}: { title: string; onBack: () => void }) {
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

function ToggleSwitch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
      style={{
        background: on
          ? "linear-gradient(135deg, #2563EB, #7C3AED)"
          : "#e5e7eb",
      }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
        style={{ left: on ? "calc(100% - 22px)" : "2px" }}
      />
    </button>
  );
}

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

function MarketInsightsSubScreen({ onBack }: { onBack: () => void }) {
  const stats = [
    {
      label: "Avg Salary for Your Role",
      value: "$165K/year",
      Icon: DollarSign,
      color: "text-green-500",
    },
    {
      label: "Job Market Demand",
      value: "High",
      Icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      label: "Remote Opportunities",
      value: "68%",
      Icon: Globe,
      color: "text-purple-500",
    },
    {
      label: "Top Hiring Companies",
      value: "12 active",
      Icon: Building2,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Market Insights" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <stat.Icon className={`w-6 h-6 mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Salary Range */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            Salary Range in Your Field
          </h3>
          <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="absolute inset-y-0 left-0 right-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #93c5fd 0%, #2563EB 45%, #7C3AED 100%)",
              }}
            />
            <div className="absolute inset-y-0 left-[45%] -translate-x-1/2 flex items-center">
              <div className="w-1 h-full bg-white opacity-60" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>$120K</span>
            <span className="font-bold text-blue-600">$165K</span>
            <span>$220K</span>
          </div>
        </div>

        {/* Skills in Demand */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            Skills in Demand
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Figma", color: "bg-purple-100 text-purple-700" },
              { name: "Design Systems", color: "bg-blue-100 text-blue-700" },
              { name: "User Research", color: "bg-green-100 text-green-700" },
              { name: "Prototyping", color: "bg-orange-100 text-orange-700" },
            ].map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${skill.color}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
              <item.Icon className="w-5 h-5 text-gray-500 w-8 shrink-0" />
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

function SettingsSubScreen({ onBack }: { onBack: () => void }) {
  const [profileVisible, setProfileVisible] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const sections = [
    {
      title: "Account",
      items: ["Edit Profile", "Change Password", "Linked Accounts"],
    },
    {
      title: "Preferences",
      items: ["Job Preferences", "Notification Preferences", "Language"],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SubScreenHeader title="Settings" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, i) => (
                <button
                  type="button"
                  key={item}
                  data-ocid={`settings.${item.toLowerCase().replace(/ /g, "_")}.button`}
                  className={`w-full flex items-center justify-between px-4 py-4 text-sm font-medium text-gray-800 active:bg-gray-50 ${
                    i < section.items.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  {item}
                  <span className="text-gray-300">›</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Privacy */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Privacy
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Profile Visibility
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Show your profile to recruiters
                </p>
              </div>
              <ToggleSwitch
                on={profileVisible}
                onToggle={() => setProfileVisible((v) => !v)}
              />
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Data Sharing
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Share anonymized data to improve matches
                </p>
              </div>
              <ToggleSwitch
                on={dataSharing}
                onToggle={() => setDataSharing((v) => !v)}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
            Danger Zone
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              type="button"
              data-ocid="settings.delete_account.button"
              className="w-full px-4 py-4 text-sm font-semibold text-red-500 text-left"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              AJ
            </div>
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
