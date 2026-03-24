import { useState } from "react";

type ChipProps = { label: string; selected: boolean; onToggle: () => void };
function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all active:scale-95 ${
        selected
          ? "text-white border-transparent"
          : "bg-white text-gray-600 border-gray-200"
      }`}
      style={
        selected
          ? {
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              borderColor: "transparent",
            }
          : {}
      }
    >
      {label}
    </button>
  );
}

export default function StepPreferences({
  onNext,
}: { onNext: (data: Record<string, unknown>) => void }) {
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  function toggle(arr: string[], val: string, set: (a: string[]) => void) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  return (
    <div className="flex flex-col h-full px-6 pb-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        What are you looking for?
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Help us personalize your job matches
      </p>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Job Type</p>
        <div className="flex flex-wrap gap-2">
          {["Full-time", "Part-time", "Contract", "Internship"].map((j) => (
            <Chip
              key={j}
              label={j}
              selected={jobTypes.includes(j)}
              onToggle={() => toggle(jobTypes, j, setJobTypes)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Work Style</p>
        <div className="flex flex-wrap gap-2">
          {["Remote", "Hybrid", "On-site"].map((j) => (
            <Chip
              key={j}
              label={j}
              selected={workStyle.includes(j)}
              onToggle={() => toggle(workStyle, j, setWorkStyle)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Experience Level
        </p>
        <div className="flex flex-wrap gap-2">
          {["Junior", "Mid-level", "Senior", "Lead"].map((j) => (
            <Chip
              key={j}
              label={j}
              selected={experience === j}
              onToggle={() => setExperience(experience === j ? "" : j)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-3">Location</p>
        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-blue-400"
          placeholder="e.g. San Francisco, CA or Remote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => onNext({ jobTypes, workStyle, experience, location })}
          className="w-full py-4 rounded-2xl font-semibold text-white text-base shadow-lg active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
