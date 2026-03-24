import { Frown, Search, SearchX, X } from "lucide-react";
import { useState } from "react";
import JobDetailsSheet from "../components/JobDetailsSheet";
import { MOCK_JOBS, type MockJob } from "../data/mockJobs";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);

  const filtered = MOCK_JOBS.filter((job) => {
    const q = query.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="pt-14 px-5 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Search Jobs</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            data-ocid="search.search_input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, company, or skill..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {query.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-3">
              <SearchX className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">
              Search for your dream job
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try &quot;Designer&quot;, &quot;React&quot;, or &quot;Remote&quot;
            </p>
          </div>
        )}

        {query.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="search.empty_state">
            <div className="flex justify-center mb-3">
              <Frown className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-600 font-semibold">No results found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different keyword
            </p>
          </div>
        )}

        {filtered.map((job, idx) => (
          <button
            type="button"
            key={job.id.toString()}
            data-ocid={`search.item.${idx + 1}`}
            onClick={() => setSelectedJob(job)}
            className="w-full text-left bg-white rounded-2xl p-4 mb-3 flex items-center gap-3 shadow-sm active:scale-98 transition-transform"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ background: job.companyColor }}
            >
              {job.companyInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
              <p className="text-xs text-gray-500">
                {job.company} · {job.location}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                ${(job.salaryMin / 1000).toFixed(0)}k – $
                {(job.salaryMax / 1000).toFixed(0)}k
              </p>
            </div>
            <div
              className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              {job.matchScore}%
            </div>
          </button>
        ))}
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
