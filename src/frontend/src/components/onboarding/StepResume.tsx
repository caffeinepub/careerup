import { FileText, Upload } from "lucide-react";
import { useState } from "react";

export default function StepResume({
  onNext,
}: { onNext: (data: Record<string, unknown>) => void }) {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  }

  return (
    <div className="flex flex-col h-full px-6 pb-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Upload Your Resume
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Our AI will extract your skills and experience
      </p>

      <label className="block mb-6 cursor-pointer">
        <div
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 transition-colors ${
            fileName
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
            {fileName ? (
              <FileText className="w-7 h-7 text-blue-500" />
            ) : (
              <Upload className="w-7 h-7 text-gray-400" />
            )}
          </div>
          {fileName ? (
            <>
              <p className="font-semibold text-blue-600 text-sm">{fileName}</p>
              <p className="text-xs text-gray-400">Tap to change</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-700">Upload Resume</p>
              <p className="text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFile}
        />
      </label>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-3">
        Paste Your Experience
      </p>
      <textarea
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-blue-400 resize-none mb-8"
        rows={5}
        placeholder="Describe your work experience, skills, and achievements..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => onNext({ fileName, resumeText })}
          disabled={!fileName && !resumeText}
          className="w-full py-4 rounded-2xl font-semibold text-white text-base shadow-lg active:scale-95 transition-transform disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          Analyze with AI
        </button>
      </div>
    </div>
  );
}
