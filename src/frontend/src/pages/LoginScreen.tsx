import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Eye, EyeOff, Lock, Mail, Users, Zap } from "lucide-react";
import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
  onSwitchToAdmin: () => void;
}

export default function LoginScreen({
  onLogin,
  onSwitchToAdmin,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
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
      icon: <Users size={18} />,
      title: "Smart Candidate Matching",
      desc: "AI-powered matching to surface the best candidates for your roles instantly.",
    },
    {
      icon: <Briefcase size={18} />,
      title: "Streamlined Hiring Pipeline",
      desc: "Move candidates from Applied to Offer with a clean, visual Kanban board.",
    },
    {
      icon: <Zap size={18} />,
      title: "Interview Scheduling",
      desc: "Schedule and manage interviews directly from your dashboard, hassle-free.",
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between w-[60%] shrink-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)",
        }}
      >
        <div
          className="absolute top-[-10%] left-[-8%] w-[480px] h-[480px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-12%] right-[-6%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-3 px-10 py-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
          >
            <span className="text-white font-bold text-base">C</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            CareerUp
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-10 px-12 pb-4">
          <div>
            <p className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-4">
              Recruiter Dashboard
            </p>
            <h1 className="text-white font-bold text-5xl leading-[1.1] tracking-tight mb-5">
              Welcome to
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #a5b4fc, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CareerUp.
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              The modern hiring platform built for teams who move fast. Find,
              evaluate, and hire top talent — all in one place.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.2)" }}
                >
                  <span className="text-indigo-300">{f.icon}</span>
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
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} CareerUp. All rights reserved.
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
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              }}
            >
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-gray-900 font-bold text-lg">CareerUp</span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">
            Recruiter Access
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to your company recruiter account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Work Email
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-11"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
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
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              className="w-full h-11 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-70 mt-1"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Don't have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Create one
            </span>
          </p>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={onSwitchToAdmin}
              data-ocid="login.admin_panel.link"
              className="text-xs text-gray-400 hover:text-indigo-500 transition"
            >
              Admin Panel →
            </button>
          </div>
        </div>

        <p className="absolute bottom-6 text-xs text-gray-400">
          © {new Date().getFullYear()} CareerUp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
