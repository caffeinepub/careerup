import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Receipt,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AdminAnalytics from "./AdminAnalytics";
import AdminCandidates from "./AdminCandidates";
import AdminJobs from "./AdminJobs";
import AdminModeration from "./AdminModeration";
import AdminOverview from "./AdminOverview";
import AdminRecruiters from "./AdminRecruiters";
import AdminSettings from "./AdminSettings";
import AdminSubscriptions from "./AdminSubscriptions";
import AdminSupport from "./AdminSupport";
import AdminTransactions from "./AdminTransactions";

export type AdminPage =
  | "overview"
  | "recruiters"
  | "candidates"
  | "jobs"
  | "subscriptions"
  | "transactions"
  | "support"
  | "moderation"
  | "analytics"
  | "settings";

const NAV_ITEMS: { id: AdminPage; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={17} /> },
  { id: "recruiters", label: "Recruiters", icon: <Building2 size={17} /> },
  { id: "candidates", label: "Candidates", icon: <Users size={17} /> },
  { id: "jobs", label: "Jobs", icon: <Briefcase size={17} /> },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: <CreditCard size={17} />,
  },
  { id: "transactions", label: "Transactions", icon: <Receipt size={17} /> },
  { id: "support", label: "Support", icon: <LifeBuoy size={17} /> },
  { id: "moderation", label: "Moderation", icon: <ShieldAlert size={17} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={17} /> },
  { id: "settings", label: "Settings", icon: <Settings size={17} /> },
];

type Notification = {
  id: number;
  text: string;
  time: string;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    text: "New flagged job posting: Senior Dev at Zepto",
    time: "2m ago",
  },
  { id: 2, text: "Support ticket opened by Freshworks Inc", time: "15m ago" },
  { id: 3, text: "New recruiter signup: UrbanLadder", time: "1h ago" },
  { id: 4, text: "Refund requested: TXN-006 Freshworks Inc", time: "3h ago" },
  {
    id: 5,
    text: "System alert: High API response time detected",
    time: "5h ago",
  },
];

export default function AdminApp({ onLogout }: { onLogout: () => void }) {
  const [currentPage, setCurrentPage] = useState<AdminPage>("overview");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showToast = (msg: string) => {
    setUserMenuOpen(false);
    setToast(msg);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <AdminOverview />;
      case "recruiters":
        return <AdminRecruiters />;
      case "candidates":
        return <AdminCandidates />;
      case "jobs":
        return <AdminJobs />;
      case "subscriptions":
        return <AdminSubscriptions />;
      case "transactions":
        return <AdminTransactions />;
      case "support":
        return <AdminSupport />;
      case "moderation":
        return <AdminModeration />;
      case "analytics":
        return <AdminAnalytics />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  const pageTitle =
    NAV_ITEMS.find((n) => n.id === currentPage)?.label ?? "Overview";

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className="flex flex-col w-60 shrink-0 h-screen z-20"
        style={{
          background: "linear-gradient(180deg, #0B1220 0%, #141C2A 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3 px-5 py-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)",
            }}
          >
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight block leading-none">
              CareerUp
            </span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">
              Super Admin
            </span>
          </div>
        </div>

        <div className="px-4 mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-2 mb-1">
            Management
          </p>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-[#1e3a5f] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-white/5 transition-all w-full"
          >
            <LogOut size={17} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden bg-[#F5F7FB] text-gray-900">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              CareerUp Platform Administration
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications bell */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen((v) => !v)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <Bell size={18} className="text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-[9px] text-white font-bold">
                      {notifications.length}
                    </span>
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">
                      Notifications
                    </span>
                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setNotifications([])}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      No new notifications
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {n.text}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => dismissNotification(n.id)}
                            className="text-gray-300 hover:text-gray-500 transition shrink-0 mt-0.5"
                          >
                            <span className="text-xs font-bold">✕</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Admin user dropdown */}
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
              >
                <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Admin User
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
                  <button
                    type="button"
                    onClick={() => showToast("Profile settings coming soon")}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <User size={14} className="text-gray-400" />
                    Admin Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Change password coming soon")}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <KeyRound size={14} className="text-gray-400" />
                    Change Password
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto px-8 py-6 bg-[#F5F7FB]"
          key={currentPage}
        >
          <div className="page-enter">{renderPage()}</div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl z-[200] pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  );
}
