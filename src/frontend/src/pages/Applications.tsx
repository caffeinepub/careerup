import { ArrowRight, Calendar, MapPin, Plus, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  CANDIDATES,
  type Candidate,
  type CandidateStatus,
} from "../data/mockData";

const COLUMNS: CandidateStatus[] = [
  "Applied",
  "Screening",
  "Interviewing",
  "Offer",
  "Rejected",
];

const NEXT_STATUS: Partial<Record<CandidateStatus, CandidateStatus>> = {
  Applied: "Screening",
  Screening: "Interviewing",
  Interviewing: "Offer",
  Offer: undefined,
  Rejected: undefined,
};

const COL_STYLES: Record<
  CandidateStatus,
  { header: string; badge: string; border: string }
> = {
  Applied: {
    header: "text-blue-600",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    border: "border-blue-200",
  },
  Screening: {
    header: "text-amber-600",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    border: "border-amber-200",
  },
  Interviewing: {
    header: "text-purple-600",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    border: "border-purple-200",
  },
  Offer: {
    header: "text-green-600",
    badge: "bg-green-100 text-green-700 border-green-200",
    border: "border-green-200",
  },
  Rejected: {
    header: "text-red-500",
    badge: "bg-red-100 text-red-700 border-red-200",
    border: "border-red-200",
  },
};

// Candidate Detail Modal
function CandidateModal({
  candidate,
  onClose,
}: { candidate: Candidate; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
        data-ocid="applications.candidate.modal"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-indigo-100 shrink-0">
                {candidate.photo ? (
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full gradient-active flex items-center justify-center">
                    <span className="font-bold text-white">
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
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              data-ocid="applications.candidate.close_button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Applied For</p>
              <p className="text-sm font-semibold text-gray-900">
                {candidate.jobTitle}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Applied On</p>
              <p className="text-sm font-semibold text-gray-900">
                {candidate.appliedDate}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Match Score</p>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                <Star size={12} className="text-amber-500" />
                {candidate.matchScore}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p
                className={`text-sm font-semibold ${COL_STYLES[candidate.status].header}`}
              >
                {candidate.status}
              </p>
            </div>
          </div>
          {candidate.bio && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                About
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {candidate.bio}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <a
              href={`mailto:${candidate.email}`}
              className="flex-1 gradient-btn text-center text-sm font-semibold py-2.5 rounded-xl"
              data-ocid="applications.candidate.contact_button"
            >
              Contact Candidate
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              data-ocid="applications.candidate.cancel_button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Candidate Modal
function AddCandidateModal({
  status,
  onAdd,
  onClose,
}: {
  status: CandidateStatus;
  onAdd: (name: string, role: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const valid = name.trim() && role.trim();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-80"
        data-ocid="applications.add_candidate.modal"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Add to {status}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="ac-name"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Candidate Name
            </label>
            <input
              id="ac-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="applications.add_candidate.name.input"
            />
          </div>
          <div>
            <label
              htmlFor="ac-role"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Role Applied For
            </label>
            <input
              id="ac-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="applications.add_candidate.role.input"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl hover:bg-gray-50 transition"
            data-ocid="applications.add_candidate.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              if (valid) {
                onAdd(name.trim(), role.trim());
                onClose();
              }
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl disabled:opacity-40"
            data-ocid="applications.add_candidate.submit_button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Applications() {
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null);
  const [addToCol, setAddToCol] = useState<CandidateStatus | null>(null);
  const dragId = useRef<string | null>(null);
  const dragOverCol = useRef<CandidateStatus | null>(null);

  const moveCandidate = (id: string, currentStatus: CandidateStatus) => {
    const next = NEXT_STATUS[currentStatus];
    if (!next) return;
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: next } : c)),
    );
  };

  const handleDragStart = (id: string) => {
    dragId.current = id;
  };
  const handleDragOver = (e: React.DragEvent, col: CandidateStatus) => {
    e.preventDefault();
    dragOverCol.current = col;
  };
  const handleDrop = (col: CandidateStatus) => {
    if (!dragId.current) return;
    setCandidates((prev) =>
      prev.map((c) => (c.id === dragId.current ? { ...c, status: col } : c)),
    );
    dragId.current = null;
    dragOverCol.current = null;
  };

  const addCandidate = (
    status: CandidateStatus,
    name: string,
    role: string,
  ) => {
    const newC: Candidate = {
      id: `new_${Date.now()}`,
      name,
      role,
      location: "India",
      experience: "N/A",
      skills: [],
      matchScore: 70,
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      lastActivity: "Just now",
      avatar: name.slice(0, 2).toUpperCase(),
      email: "",
      status,
      jobTitle: role,
    };
    setCandidates((prev) => [...prev, newC]);
  };

  return (
    <div className="space-y-5">
      {viewCandidate && (
        <CandidateModal
          candidate={viewCandidate}
          onClose={() => setViewCandidate(null)}
        />
      )}
      {addToCol && (
        <AddCandidateModal
          status={addToCol}
          onAdd={(n, r) => addCandidate(addToCol, n, r)}
          onClose={() => setAddToCol(null)}
        />
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Application Pipeline
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Drag cards between columns to advance candidates
        </p>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-2"
        data-ocid="applications.table"
      >
        {COLUMNS.map((col) => {
          const colCandidates = candidates.filter((c) => c.status === col);
          const styles = COL_STYLES[col];
          return (
            <div
              key={col}
              className="glass-column p-4 min-w-[220px] flex-1 flex flex-col gap-3"
              onDragOver={(e) => handleDragOver(e, col)}
              onDrop={() => handleDrop(col)}
              data-ocid={`applications.${col.toLowerCase()}.panel`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${styles.header}`}>
                  {col}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${styles.badge}`}
                  >
                    {colCandidates.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAddToCol(col)}
                    className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    data-ocid={`applications.${col.toLowerCase()}.add_button`}
                  >
                    <Plus size={11} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 flex-1">
                {colCandidates.map((c, i) => (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => handleDragStart(c.id)}
                    className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col gap-2 hover:border-gray-300 shadow-sm transition cursor-grab active:cursor-grabbing"
                    data-ocid={`applications.${col.toLowerCase()}.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 shrink-0">
                        {c.photo ? (
                          <img
                            src={c.photo}
                            alt={c.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full gradient-active flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">
                              {c.avatar}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {c.role}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          c.matchScore >= 90
                            ? "bg-green-100 text-green-700"
                            : c.matchScore >= 80
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <MapPin size={9} />
                      <span className="truncate">{c.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <Calendar size={9} />
                      <span>{c.appliedDate}</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewCandidate(c)}
                        className="flex-1 text-[10px] font-semibold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 rounded-lg py-1.5 transition"
                        data-ocid={`applications.view.button.${i + 1}`}
                      >
                        View
                      </button>
                      {NEXT_STATUS[col] && (
                        <button
                          type="button"
                          onClick={() => moveCandidate(c.id, col)}
                          className="flex-1 flex items-center justify-center gap-0.5 text-[10px] font-semibold gradient-btn py-1.5 rounded-lg"
                          data-ocid={`applications.advance.button.${i + 1}`}
                        >
                          Next <ArrowRight size={9} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colCandidates.length === 0 && (
                  <div
                    className="text-[11px] text-gray-400 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl"
                    data-ocid={`applications.${col.toLowerCase()}.empty_state`}
                  >
                    Drop here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
