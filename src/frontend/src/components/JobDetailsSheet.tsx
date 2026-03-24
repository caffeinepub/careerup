import {
  Bookmark,
  BookmarkCheck,
  Building2,
  Check,
  DollarSign,
  MapPin,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import type { MockJob } from "../data/mockJobs";

function formatSalary(min: number, max: number) {
  return `$${Math.round(min / 1000)}K – $${Math.round(max / 1000)}K/year`;
}

function CompanyLogoImg({
  logo,
  color,
  initial,
  size = 64,
}: { logo: string; color: string; initial: string; size?: number }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className="rounded-xl flex items-center justify-center text-white font-bold border-2 border-white shadow-md"
        style={{
          background: color,
          width: size,
          height: size,
          fontSize: size * 0.35,
        }}
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt={initial}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className="rounded-xl object-contain bg-white border-2 border-white shadow-md"
      style={{ width: size, height: size }}
    />
  );
}

export default function JobDetailsSheet({
  job,
  onClose,
}: { job: MockJob; onClose: () => void }) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const startY = useRef(0);
  const [dragY, setDragY] = useState(0);

  function handleDragStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY;
  }

  function handleDragMove(e: React.TouchEvent) {
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) setDragY(dy);
  }

  function handleDragEnd() {
    if (dragY > 80) onClose();
    else setDragY(0);
  }

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 z-30 w-full cursor-default"
        onClick={onClose}
        aria-label="Close"
      />
      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl max-h-[90vh] flex flex-col"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? "transform 0.3s" : "none",
          maxWidth: "430px",
          margin: "0 auto",
        }}
      >
        {/* Drag handle */}
        <div
          className="pt-3 pb-2 px-6 cursor-grab flex flex-col items-center"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-gray-200 mb-3" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <CompanyLogoImg
                logo={job.companyLogo}
                color={job.companyColor}
                initial={job.companyInitial}
                size={56}
              />
              <div>
                <p className="font-bold text-gray-900">{job.company}</p>
                <p className="text-xs text-gray-500">{job.employmentType}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Company Banner */}
          <div className="px-4 mb-4">
            <img
              src={job.companyBanner}
              alt={`${job.company} office`}
              className="w-full object-cover rounded-xl"
              style={{ height: 180, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            />
          </div>

          {/* Company info section */}
          <div className="px-6 mb-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gray-500" />
                {job.company}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Tech-forward company building the future
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  500–2000 employees
                </span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
                  Technology
                </span>
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                {job.title}
              </h2>
              <div
                className="px-3 py-1 rounded-full text-white text-xs font-bold shrink-0"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                }}
              >
                {job.matchScore}% Match
              </div>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {job.location}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full flex items-center gap-1">
                <DollarSign className="w-3 h-3" />{" "}
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            </div>

            {/* Why you match */}
            <div
              className="p-4 rounded-2xl mb-4"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
              }}
            >
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">
                Why You Match
              </p>
              <p className="text-sm text-gray-700">
                {job.aiReason}. Your background closely aligns with what{" "}
                {job.company} is looking for in this role.
              </p>
            </div>

            {/* About */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900 mb-2">
                About the Role
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900 mb-2">
                Responsibilities
              </p>
              {job.responsibilities.map((r) => (
                <div key={r} className="flex items-start gap-2 mb-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <p className="text-sm text-gray-600">{r}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900 mb-2">
                Perks &amp; Benefits
              </p>
              <div className="flex flex-wrap gap-2">
                {job.perks.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm border transition-all flex items-center justify-center gap-1.5 ${
              saved
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-white border-gray-200 text-gray-700"
            }`}
          >
            {saved ? (
              <>
                <BookmarkCheck className="w-4 h-4" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" /> Save Job
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setApplied(true)}
            disabled={applied}
            className="flex-[2] py-3.5 rounded-2xl font-semibold text-white text-sm shadow-lg active:scale-95 transition-all disabled:opacity-60"
            style={{
              background: applied
                ? "#10b981"
                : "linear-gradient(135deg, #2563EB, #7C3AED)",
            }}
          >
            {applied ? "Applied!" : "Apply Now"}
          </button>
        </div>
      </div>
    </>
  );
}
