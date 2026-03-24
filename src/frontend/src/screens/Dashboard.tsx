import { useState } from "react";
import ApplicationsScreen from "./ApplicationsScreen";
import DiscoverScreen from "./DiscoverScreen";
import MarketInsightsScreen from "./MarketInsightsScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";
import SavedScreen from "./SavedScreen";

type Tab =
  | "discover"
  | "applications"
  | "messages"
  | "insights"
  | "saved"
  | "profile";

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "discover", icon: "🔍", label: "Discover" },
  { id: "applications", icon: "📋", label: "Applied" },
  { id: "messages", icon: "💬", label: "Messages" },
  { id: "insights", icon: "📊", label: "Insights" },
  { id: "saved", icon: "🔖", label: "Saved" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("discover");

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {tab === "discover" && <DiscoverScreen />}
        {tab === "applications" && <ApplicationsScreen />}
        {tab === "messages" && <MessagesScreen />}
        {tab === "insights" && <MarketInsightsScreen />}
        {tab === "saved" && <SavedScreen />}
        {tab === "profile" && <ProfileScreen onUpgradePro={() => {}} />}
      </div>

      {/* Bottom Tab Bar */}
      <div
        className="bg-white border-t border-gray-100 pb-safe"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.05)" }}
      >
        <div className="flex">
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-3 flex flex-col items-center gap-0.5 active:scale-95 transition-transform"
            >
              <span className="text-lg">{t.icon}</span>
              <span
                className={`text-[9px] font-semibold transition-colors ${tab === t.id ? "text-blue-600" : "text-gray-400"}`}
              >
                {t.label}
              </span>
              {tab === t.id && (
                <div
                  className="absolute bottom-0 w-8 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #2563EB, #7C3AED)",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
