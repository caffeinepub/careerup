import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import {
  Bell,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { ApplicationsContextProvider } from "./context/ApplicationsContext";
import { CONVERSATIONS } from "./data/mockData";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import ExploreCandidates from "./pages/ExploreCandidates";
import LoginScreen from "./pages/LoginScreen";
import Messages from "./pages/Messages";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AdminApp from "./pages/admin/AdminApp";
import AdminLoginScreen from "./pages/admin/AdminLoginScreen";
import MobileDashboard from "./screens/Dashboard";
import OnboardingScreen from "./screens/OnboardingScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export type Page =
  | "dashboard"
  | "explore"
  | "applications"
  | "messages"
  | "profile"
  | "settings";

const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "explore", label: "Explore Candidates", icon: <Users size={18} /> },
  {
    id: "applications",
    label: "Applications",
    icon: <ClipboardList size={18} />,
  },
  { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

// ─── Mobile App ───────────────────────────────────────────────────────────────

type MobileStep = "splash" | "welcome" | "onboarding" | "dashboard";

function MobileApp() {
  const [step, setStep] = useState<MobileStep>("splash");

  return (
    <ApplicationsContextProvider>
      <div className="fixed inset-0" style={{ background: "#f8f9fb" }}>
        {step === "splash" && (
          <SplashScreen onDone={() => setStep("welcome")} />
        )}
        {step === "welcome" && (
          <WelcomeScreen
            onCreateAccount={() => setStep("onboarding")}
            onLogin={() => setStep("dashboard")}
          />
        )}
        {step === "onboarding" && (
          <OnboardingScreen onComplete={() => setStep("dashboard")} />
        )}
        {step === "dashboard" && <MobileDashboard />}
      </div>
      <Toaster />
    </ApplicationsContextProvider>
  );
}

// ─── Admin Entry Point ────────────────────────────────────────────────────────

function AdminEntryPoint({
  onSwitchToRecruiter,
}: { onSwitchToRecruiter: () => void }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  if (isAdminLoggedIn) {
    return (
      <>
        <AdminApp onLogout={() => setIsAdminLoggedIn(false)} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <AdminLoginScreen
        onLogin={() => setIsAdminLoggedIn(true)}
        onSwitchToRecruiter={onSwitchToRecruiter}
      />
      <Toaster />
    </>
  );
}

// ─── Recruiter Entry Point ────────────────────────────────────────────────────

function RecruiterEntryPoint({
  onSwitchToAdmin,
}: { onSwitchToAdmin: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const totalUnread = CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0);

  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen
          onLogin={() => setIsLoggedIn(true)}
          onSwitchToAdmin={onSwitchToAdmin}
        />
        <Toaster />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "explore":
        return <ExploreCandidates />;
      case "applications":
        return <Applications />;
      case "messages":
        return <Messages />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar — stays dark */}
        <aside
          className="glass-dark flex flex-col w-60 shrink-0 h-screen z-20"
          data-ocid="sidebar.panel"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-6">
            <div className="w-8 h-8 rounded-lg gradient-active flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              CareerUp
            </span>
          </div>

          {/* Nav items */}
          <nav
            className="flex flex-col gap-1 px-3 flex-1"
            data-ocid="sidebar.panel"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                data-ocid={`nav.${item.id}.link`}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  currentPage === item.id
                    ? "gradient-active text-white shadow-glow"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === "messages" && totalUnread > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalUnread}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 pb-6">
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              data-ocid="sidebar.logout.button"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-all w-full"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main area — light */}
        <div className="flex flex-col flex-1 overflow-hidden bg-[#F8F9FB] text-gray-900">
          {/* Top bar */}
          <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shrink-0">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Welcome back, Sarah!
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                TechCorp Solutions — Recruiter Dashboard
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-56"
                data-ocid="topbar.search_input"
              >
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
                />
              </div>

              {/* Bell */}
              <button
                type="button"
                className="relative p-2 rounded-xl hover:bg-gray-100 transition"
                data-ocid="topbar.notifications.button"
              >
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>

              {/* Avatar */}
              <button
                type="button"
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
                data-ocid="topbar.profile.button"
              >
                <Avatar className="w-7 h-7">
                  <AvatarImage src="/assets/generated/recruiter-avatar.dim_120x120.jpg" />
                  <AvatarFallback className="text-xs gradient-active text-white">
                    SC
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-800">
                  Sarah Chen
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
          </header>

          {/* Page content */}
          <main
            className="flex-1 overflow-y-auto px-8 py-6 bg-[#F8F9FB]"
            key={currentPage}
          >
            <div className="page-enter">{renderPage()}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}

// ─── Root Router ──────────────────────────────────────────────────────────────

type AppMode = "mobile" | "recruiter" | "admin";

function getInitialMode(): AppMode {
  const hash = window.location.hash;
  if (hash === "#admin") return "admin";
  if (hash === "#recruiter") return "recruiter";
  return "mobile";
}

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>(getInitialMode);

  const switchToAdmin = () => {
    window.location.hash = "#admin";
    setAppMode("admin");
  };

  const switchToRecruiter = () => {
    window.location.hash = "#recruiter";
    setAppMode("recruiter");
  };

  if (appMode === "admin") {
    return <AdminEntryPoint onSwitchToRecruiter={switchToRecruiter} />;
  }
  if (appMode === "recruiter") {
    return <RecruiterEntryPoint onSwitchToAdmin={switchToAdmin} />;
  }
  return <MobileApp />;
}
