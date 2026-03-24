import {
  ClipboardList,
  Compass,
  MessageCircle,
  Search,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import ApplicationsScreen from "./ApplicationsScreen";
import DiscoverScreen from "./DiscoverScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";

type Tab = "discover" | "search" | "applications" | "messages" | "profile";

const TABS: { id: Tab; Icon: LucideIcon; label: string }[] = [
  { id: "discover", Icon: Compass, label: "Homescreen" },
  { id: "search", Icon: Search, label: "Search" },
  { id: "applications", Icon: ClipboardList, label: "My Apps" },
  { id: "messages", Icon: MessageCircle, label: "Messages" },
  { id: "profile", Icon: User, label: "Profile" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("discover");

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {tab === "discover" && <DiscoverScreen />}
        {tab === "search" && <SearchScreen />}
        {tab === "applications" && <ApplicationsScreen />}
        {tab === "messages" && <MessagesScreen />}
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
              data-ocid={`nav.${t.id}.tab`}
              onClick={() => setTab(t.id)}
              className="flex-1 py-3 flex flex-col items-center gap-0.5 active:scale-95 transition-transform relative"
            >
              <t.Icon
                className={`w-5 h-5 transition-colors ${
                  tab === t.id ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-[9px] font-semibold transition-colors ${
                  tab === t.id ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {t.label}
              </span>
              {tab === t.id && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
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
