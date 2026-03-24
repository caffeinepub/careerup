import {
  BarChart2,
  Crown,
  Eye,
  Mail,
  Rocket,
  ShieldOff,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const FEATURES: { Icon: LucideIcon; text: string }[] = [
  { Icon: Zap, text: "Unlimited Super Applies" },
  { Icon: Eye, text: "See who viewed your profile" },
  { Icon: BarChart2, text: "Advanced AI market insights" },
  { Icon: Rocket, text: "Priority matching algorithm" },
  { Icon: ShieldOff, text: "Ad-free experience" },
  { Icon: Mail, text: "Direct recruiter messaging" },
];

export default function ProUpgradeSheet({ onClose }: { onClose: () => void }) {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    // Mock Stripe checkout
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    alert(
      "Stripe integration ready! Connect your Stripe key to process payments.",
    );
    onClose();
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 bg-black/60 z-50 w-full cursor-default"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl"
        style={{ maxWidth: "430px", margin: "0 auto" }}
      >
        {/* Header */}
        <div
          className="relative overflow-hidden rounded-t-3xl p-6 pb-5"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-white font-bold text-xl">CareerUp Pro</h2>
                <p className="text-white/70 text-sm">
                  Unlock your full potential
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 pt-5 pb-4">
          {FEATURES.map((f) => (
            <div key={f.text} className="flex items-center gap-3 py-2.5">
              <f.Icon className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-sm font-medium text-gray-800">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Pricing Toggle */}
        <div className="px-6 pb-2">
          <div className="flex items-center gap-3 p-1 rounded-2xl bg-gray-100">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                !annual ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              $9.99/month
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                annual ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              $79.99/year
              <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                SAVE 33%
              </span>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 pt-4">
          <button
            type="button"
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-white text-base shadow-xl active:scale-95 transition-all disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            {loading ? "Processing..." : "Start 7-Day Free Trial"}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Cancel anytime. No credit card required for trial.
          </p>
        </div>
      </div>
    </>
  );
}
