import { useState } from "react";
import ProUpgradeSheet from "../components/ProUpgradeSheet";

const STATS = [
  { label: "Profile Views", value: "234", icon: "👁️" },
  { label: "Recruiter Actions", value: "18", icon: "📨" },
  { label: "Matches", value: "47", icon: "✨" },
];

const MENU_ITEMS = [
  { icon: "📄", label: "Documents", sub: "2 files uploaded" },
  { icon: "📊", label: "Market Insights", sub: "Your market value" },
  { icon: "🔔", label: "Notifications", sub: "Manage alerts" },
  { icon: "⚙️", label: "Settings", sub: "Account & privacy" },
];

export default function ProfileScreen(_props: { onUpgradePro: () => void }) {
  const [showPro, setShowPro] = useState(false);
  const profileStrength = 78;

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm"
          >
            ✏️
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
            <p className="text-gray-400 text-xs mt-0.5">📍 San Francisco, CA</p>
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
              <p className="text-xl mb-1">{s.icon}</p>
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
              <span className="text-xl">👑</span>
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
          {/* Decorative circles */}
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
              className={`w-full flex items-center gap-4 px-4 py-4 text-left active:bg-gray-50 ${i < MENU_ITEMS.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <span className="text-xl w-8 text-center">{item.icon}</span>
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
