import {
  Bookmark,
  Check,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { CANDIDATES, type Candidate } from "../data/mockData";

const ROLES = [
  "All Roles",
  "Frontend Engineer",
  "Product Manager",
  "UX Designer",
  "Data Scientist",
  "Backend Engineer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Mobile Developer",
  "ML Engineer",
  "Cloud Architect",
];
const EXPERIENCE_LEVELS = ["All", "0-2 yrs", "3-5 yrs", "6-9 yrs", "10+ yrs"];
const LOCATIONS = [
  "All Locations",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Noida",
];

const SKILL_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-green-100 text-green-700",
];

type CandidateAction = "approved" | "shortlisted" | "rejected";

function ProfileModal({
  candidate,
  onClose,
}: { candidate: Candidate; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto"
        data-ocid="explore.profile.modal"
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            data-ocid="explore.profile.close_button"
          >
            <X size={14} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-indigo-100 shrink-0">
              {candidate.photo ? (
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-active flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {candidate.avatar}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {candidate.name}
              </h2>
              <p className="text-sm text-gray-500">{candidate.role}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {candidate.location}
                </span>
                <span>{candidate.experience} exp</span>
              </div>
            </div>
            <div
              className={`ml-auto text-sm font-bold px-3 py-1.5 rounded-xl ${
                candidate.matchScore >= 90
                  ? "bg-green-100 text-green-700"
                  : candidate.matchScore >= 80
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              <Star size={12} className="inline mr-0.5" />
              {candidate.matchScore}%
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          {candidate.bio && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {candidate.bio}
              </p>
            </div>
          )}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, si) => (
                <span
                  key={skill}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${SKILL_COLORS[si % SKILL_COLORS.length]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {candidate.education && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Education
              </h3>
              <p className="text-sm text-gray-700">{candidate.education}</p>
            </div>
          )}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Contact
            </h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p>{candidate.email}</p>
              {candidate.phone && <p>{candidate.phone}</p>}
            </div>
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              className="flex-1 gradient-btn text-sm font-semibold py-2.5 rounded-xl"
              data-ocid="explore.profile.approve.button"
            >
              Approve Candidate
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              data-ocid="explore.profile.cancel_button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreCandidates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedExp, setSelectedExp] = useState("All");
  const [minScore, setMinScore] = useState(0);
  const [actions, setActions] = useState<
    Record<string, CandidateAction | null>
  >({});
  const [viewProfile, setViewProfile] = useState<Candidate | null>(null);

  const setAction = (id: string, action: CandidateAction) => {
    setActions((prev) => ({
      ...prev,
      [id]: prev[id] === action ? null : action,
    }));
  };

  const expMatches = (exp: string) => {
    if (selectedExp === "All") return true;
    const years = Number.parseInt(exp);
    if (selectedExp === "0-2 yrs") return years <= 2;
    if (selectedExp === "3-5 yrs") return years >= 3 && years <= 5;
    if (selectedExp === "6-9 yrs") return years >= 6 && years <= 9;
    if (selectedExp === "10+ yrs") return years >= 10;
    return true;
  };

  const filtered = CANDIDATES.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole =
      selectedRole === "All Roles" ||
      c.role.toLowerCase().includes(selectedRole.toLowerCase().split(" ")[0]);
    const matchesLoc =
      selectedLocation === "All Locations" ||
      c.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesScore = c.matchScore >= minScore;
    const matchesExp = expMatches(c.experience);
    return (
      matchesSearch && matchesRole && matchesLoc && matchesScore && matchesExp
    );
  });

  return (
    <div className="space-y-6">
      {viewProfile && (
        <ProfileModal
          candidate={viewProfile}
          onClose={() => setViewProfile(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Explore Candidates
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filtered.length} candidates match your criteria
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <SlidersHorizontal size={16} />
          <span className="text-sm">Filters</span>
        </div>
      </div>

      {/* Filter bar */}
      <div
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-wrap items-center gap-3"
        data-ocid="explore.filter.panel"
      >
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-48">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none w-full"
            data-ocid="explore.search_input"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none"
          data-ocid="explore.role.select"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none"
          data-ocid="explore.location.select"
        >
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          value={selectedExp}
          onChange={(e) => setSelectedExp(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none"
          data-ocid="explore.experience.select"
        >
          {EXPERIENCE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Min Match:</span>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-24 accent-purple-600"
            data-ocid="explore.match_score.toggle"
          />
          <span className="text-xs font-semibold text-gray-800">
            {minScore}%
          </span>
        </div>
      </div>

      {/* Candidate grid */}
      <div
        className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        data-ocid="explore.list"
      >
        {filtered.map((c, i) => {
          const currentAction = actions[c.id];
          return (
            <div
              key={c.id}
              className={`glass-card p-5 flex flex-col gap-3 transition-all ${
                currentAction === "rejected"
                  ? "opacity-50"
                  : "hover:border-indigo-300"
              }`}
              data-ocid={`explore.candidate.item.${i + 1}`}
            >
              {/* Photo + Match */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-indigo-100 shrink-0 border border-gray-200">
                    {c.photo ? (
                      <img
                        src={c.photo}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full gradient-active flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {c.avatar}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-500">{c.role}</p>
                  </div>
                </div>
                <div
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    c.matchScore >= 90
                      ? "bg-green-100 text-green-700"
                      : c.matchScore >= 80
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Star size={10} className="inline mr-0.5" />
                  {c.matchScore}%
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {c.location}
                </span>
                <span>{c.experience} exp</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SKILL_COLORS[si % SKILL_COLORS.length]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-1.5 mt-auto pt-1">
                <button
                  type="button"
                  onClick={() => setAction(c.id, "approved")}
                  className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-2 rounded-lg border transition ${
                    currentAction === "approved"
                      ? "bg-green-600 text-white border-green-600"
                      : "border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
                  }`}
                  data-ocid={`explore.approve.button.${i + 1}`}
                >
                  <Check size={11} />{" "}
                  {currentAction === "approved" ? "Approved" : "Approve"}
                </button>
                <button
                  type="button"
                  onClick={() => setAction(c.id, "shortlisted")}
                  className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg border transition ${
                    currentAction === "shortlisted"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-amber-200 text-amber-600 bg-amber-50 hover:bg-amber-100"
                  }`}
                  data-ocid={`explore.shortlist.button.${i + 1}`}
                >
                  <Bookmark
                    size={11}
                    fill={
                      currentAction === "shortlisted" ? "currentColor" : "none"
                    }
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setAction(c.id, "rejected")}
                  className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg border transition ${
                    currentAction === "rejected"
                      ? "bg-red-500 text-white border-red-500"
                      : "border-red-200 text-red-400 bg-red-50 hover:bg-red-100"
                  }`}
                  data-ocid={`explore.reject.button.${i + 1}`}
                >
                  <X size={11} />
                </button>
              </div>

              {/* View Profile */}
              <button
                type="button"
                onClick={() => setViewProfile(c)}
                className="w-full text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 rounded-lg py-1.5 transition"
                data-ocid={`explore.view_profile.button.${i + 1}`}
              >
                View Full Profile
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm"
          data-ocid="explore.empty_state"
        >
          <Users size={40} className="text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-700 font-semibold">No candidates found</h3>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
