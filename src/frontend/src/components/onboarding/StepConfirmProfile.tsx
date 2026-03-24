import { useState } from "react";

const EXTRACTED_SKILLS = [
  "React",
  "TypeScript",
  "Product Design",
  "Figma",
  "Node.js",
  "UX Research",
];
const SKILL_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
];

export default function StepConfirmProfile({
  data: _data,

  onComplete,
}: { data: Record<string, unknown>; onComplete: () => void }) {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full px-6 pb-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Your AI Profile</h2>
      <p className="text-gray-500 text-sm mb-6">
        Review and confirm your profile
      </p>

      {/* Profile Card */}
      <div
        className="rounded-3xl p-6 mb-6 shadow-lg"
        style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)" }}
      >
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <input
              className="w-full font-bold text-gray-900 text-lg bg-transparent border-b border-gray-200 focus:border-blue-400 outline-none pb-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full text-sm text-gray-500 bg-transparent border-b border-gray-100 focus:border-blue-400 outline-none pb-1 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Match score */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 backdrop-blur mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <span className="text-white text-sm">✨</span>
          </div>
          <div>
            <p className="font-bold text-gray-900">87% avg match rate</p>
            <p className="text-xs text-gray-500">
              Based on your skills & preferences
            </p>
          </div>
        </div>

        {/* Skills */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Extracted Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {EXTRACTED_SKILLS.map((skill, i) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={onComplete}
          className="w-full py-4 rounded-2xl font-semibold text-white text-base shadow-lg active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          Enter CareerUp ⚡
        </button>
      </div>
    </div>
  );
}
