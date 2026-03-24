import { useState } from "react";

export default function WelcomeScreen({
  onCreateAccount,
  onLogin,
}: { onCreateAccount: () => void; onLogin: () => void }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Background */}
      {!videoError ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          src="https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-modern-office-40830-large.mp4"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)",
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(15,15,40,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg">⚡</span>
          </div>
          <span className="text-white font-bold text-xl">CareerUp</span>
        </div>

        {/* Hero Text */}
        <div className="mt-auto mb-12">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-3">
            AI-Powered Matching
          </p>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Career Evolution
            <br />
            Starts Here
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Discover opportunities tailored to your skills with AI-powered job
            matching
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onCreateAccount}
            className="w-full py-4 rounded-2xl font-semibold text-white text-base shadow-xl active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="w-full py-4 rounded-2xl font-semibold text-white text-base border border-white/30 backdrop-blur-sm active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            Log In
          </button>
        </div>

        <p className="text-white/40 text-xs text-center mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
