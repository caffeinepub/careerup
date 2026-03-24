import { useState } from "react";
import JobDetailsSheet from "../components/JobDetailsSheet";
import { MOCK_JOBS } from "../data/mockJobs";
import type { MockJob } from "../data/mockJobs";

function formatSalary(min: number, max: number) {
  return `$${Math.round(min / 1000)}K–$${Math.round(max / 1000)}K`;
}

export default function SavedScreen() {
  const [saved] = useState(MOCK_JOBS.slice(0, 3));
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">{saved.length} jobs saved</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <span className="text-4xl mb-3">🔖</span>
            <p className="text-gray-500 text-sm">
              No saved jobs yet. Swipe left to save!
            </p>
          </div>
        ) : (
          saved.map((job) => (
            <button
              type="button"
              key={job.id.toString()}
              onClick={() => setSelectedJob(job)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 text-left active:bg-gray-50 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ background: job.companyColor }}
              >
                {job.companyInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {job.title}
                </p>
                <p className="text-gray-500 text-xs">
                  {job.company} • {job.location}
                </p>
                <p className="text-blue-600 text-xs font-medium mt-0.5">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </p>
              </div>
              <div
                className="px-2 py-1 rounded-full text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                }}
              >
                {job.matchScore}%
              </div>
            </button>
          ))
        )}
      </div>

      {selectedJob && (
        <JobDetailsSheet
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
