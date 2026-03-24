import { useEffect, useState } from "react";

const steps = [
  "Parsing resume...",
  "Extracting skills...",
  "Building your profile...",
  "Matching with opportunities...",
  "Profile complete! 🎉",
];

export default function StepAIAnalysis({ onDone }: { onDone: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s < steps.length - 1) return s + 1;
        clearInterval(interval);
        return s;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = ((currentStep + 1) / steps.length) * 100;
    setProgress(target);
    if (currentStep === steps.length - 1) {
      setTimeout(onDone, 800);
    }
  }, [currentStep, onDone]);

  return (
    <div
      className="flex flex-col h-full items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #4c1d95 100%)",
      }}
    >
      {/* Animated AI icon */}
      <div className="relative mb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <span className="text-4xl">🧠</span>
          </div>
        </div>
        {/* Orbiting dot */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-blue-300" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-2">
        AI is building your profile
      </h2>

      {/* Step messages */}
      <div className="h-12 flex items-center mb-8">
        {steps.map((s, i) => (
          <p
            key={s}
            className="absolute text-center text-white/80 text-sm font-medium transition-all duration-500"
            style={{
              opacity: i === currentStep ? 1 : 0,
              transform:
                i === currentStep ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {s}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
          }}
        />
      </div>
      <p className="text-white/50 text-xs mt-3">{Math.round(progress)}%</p>
    </div>
  );
}
