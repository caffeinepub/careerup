import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
      }}
    >
      <div
        className="flex flex-col items-center gap-4 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.85)",
        }}
      >
        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            CareerUp
          </h1>
          <p className="text-white/70 text-sm mt-1 font-medium">
            AI-Powered Career Discovery
          </p>
        </div>
      </div>
    </div>
  );
}
