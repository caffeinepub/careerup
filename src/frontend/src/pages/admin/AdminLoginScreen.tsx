import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

interface AdminLoginScreenProps {
  onLogin: () => void;
  onSwitchToRecruiter: () => void;
}

export default function AdminLoginScreen({
  onLogin,
  onSwitchToRecruiter,
}: AdminLoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "admin@careerup.io" || password !== "admin123") {
      setError("Invalid credentials. Use admin@careerup.io / admin123");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  const features = [
    {
      icon: <Shield size={18} />,
      title: "Platform Oversight",
      desc: "Full visibility into all recruiters, candidates, and job postings.",
    },
    {
      icon: <Users size={18} />,
      title: "User Management",
      desc: "Ban, warn, suspend or restore any account instantly.",
    },
    {
      icon: <BarChart3 size={18} />,
      title: "Deep Analytics",
      desc: "Revenue trends, growth metrics, and platform health at a glance.",
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between w-[60%] shrink-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0B1220 0%, #0f1a2e 40%, #141C2A 100%)",
        }}
      >
        <div
          className="absolute top-[-10%] left-[-8%] w-[480px] h-[480px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-12%] right-[-6%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-3 px-10 py-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)",
            }}
          >
            <span className="text-white font-bold text-base">C</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            CareerUp
          </span>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-10 px-12 pb-4">
          <div>
            <p className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-4">
              Super Admin Panel
            </p>
            <h1 className="text-white font-bold text-5xl leading-[1.1] tracking-tight mb-5">
              Manage Your
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hiring Platform.
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Full platform control. Manage recruiters, candidates, content
              moderation, analytics, and more — all from one powerful dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(37,99,235,0.15)" }}
                >
                  <span className="text-blue-400">{f.icon}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-12 py-8">
          <Shield size={14} className="text-white/30" />
          <p className="text-white/30 text-xs">
            Restricted access — Authorized personnel only
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col flex-1 bg-[#F5F7FB] items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)",
              }}
            >
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-gray-900 font-bold text-lg">CareerUp</span>
            <span className="ml-1 text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            Super Admin Access
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Admin Sign In
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Demo: admin@careerup.io / admin123
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="admin-email"
                className="text-sm font-medium text-gray-700"
              >
                Admin Email
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@careerup.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-11"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500 -mt-1">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-70 mt-1 bg-[#2563EB] hover:bg-[#1d4ed8]"
            >
              {isLoading ? "Authenticating..." : "Sign In to Admin Panel"}
            </button>
          </form>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={onSwitchToRecruiter}
              data-ocid="admin.login.back.link"
              className="text-xs text-gray-400 hover:text-blue-500 transition"
            >
              ← Back to Recruiter Login
            </button>
          </div>
        </div>

        <p className="absolute bottom-6 text-xs text-gray-400">
          © {new Date().getFullYear()} CareerUp. Restricted Admin Access.
        </p>
      </div>
    </div>
  );
}
