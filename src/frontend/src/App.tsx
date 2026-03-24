import { useEffect, useState } from "react";
import Dashboard from "./screens/Dashboard";
import OnboardingScreen from "./screens/OnboardingScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export type Screen = "splash" | "welcome" | "onboarding" | "dashboard";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");

  return (
    <div
      className="max-w-[430px] mx-auto min-h-screen bg-gray-50 relative overflow-hidden"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {screen === "splash" && (
        <SplashScreen onDone={() => setScreen("welcome")} />
      )}
      {screen === "welcome" && (
        <WelcomeScreen
          onCreateAccount={() => setScreen("onboarding")}
          onLogin={() => setScreen("onboarding")}
        />
      )}
      {screen === "onboarding" && (
        <OnboardingScreen onComplete={() => setScreen("dashboard")} />
      )}
      {screen === "dashboard" && <Dashboard />}
    </div>
  );
}
