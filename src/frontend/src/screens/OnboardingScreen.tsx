import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StepAIAnalysis from "../components/onboarding/StepAIAnalysis";
import StepConfirmProfile from "../components/onboarding/StepConfirmProfile";
import StepPreferences from "../components/onboarding/StepPreferences";
import StepResume from "../components/onboarding/StepResume";

function VideoIntroStep({ onNext }: { onNext: () => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onNext();
    }, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onNext]);

  function handleSkip() {
    if (timerRef.current) clearTimeout(timerRef.current);
    onNext();
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-business-team-meeting-in-office-2-21739-large.mp4"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* Skip button */}
      <div className="relative z-10 flex justify-end pt-14 px-6">
        <button
          type="button"
          onClick={handleSkip}
          className="text-white/70 text-sm font-medium px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm"
        >
          Skip
        </button>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-white mb-3 leading-tight">
          CareerUp
        </h1>
        <p className="text-2xl font-bold text-white/90 mb-3">
          Your Dream Career Awaits
        </p>
        <p className="text-base text-white/60 leading-relaxed max-w-xs">
          AI-powered matching for the modern professional
        </p>
      </div>

      {/* Get Started button */}
      <div className="relative z-10 px-6 pb-16">
        <button
          type="button"
          onClick={handleSkip}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-2xl active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default function OnboardingScreen({
  onComplete,
}: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, unknown>>({});

  const totalSteps = 5;
  // step 0 = video intro, steps 1–4 = onboarding
  const progressStep = step - 1; // -1 means no progress bar

  const steps = [
    <VideoIntroStep key="video" onNext={() => setStep(1)} />,
    <StepPreferences
      key="prefs"
      onNext={(d) => {
        setData((prev) => ({ ...prev, ...d }));
        setStep(2);
      }}
    />,
    <StepResume
      key="resume"
      onNext={(d) => {
        setData((prev) => ({ ...prev, ...d }));
        setStep(3);
      }}
    />,
    <StepAIAnalysis key="ai" onDone={() => setStep(4)} />,
    <StepConfirmProfile key="profile" data={data} onComplete={onComplete} />,
  ];

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Progress Bar -- only for steps 1–3 */}
      {step >= 1 && step <= 3 && (
        <div className="px-6 pt-14 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 font-medium">
              Step {progressStep + 1} of {totalSteps - 1}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((progressStep + 1) / (totalSteps - 1)) * 100}%`,
                background: "linear-gradient(90deg, #2563EB, #7C3AED)",
              }}
            />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-hidden">{steps[step]}</div>
    </div>
  );
}
