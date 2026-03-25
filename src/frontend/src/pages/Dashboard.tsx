import {
  BarChart3,
  Briefcase,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Eye,
  FileCheck,
  Phone,
  Plus,
  RefreshCw,
  Square,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Page } from "../App";
import { CANDIDATES, KPI_DATA } from "../data/mockData";

// ── KPI pill definitions ─────────────────────────────────────────────────────
const KPI_PILLS = [
  {
    id: "postings",
    label: "Active Postings",
    value: KPI_DATA.activePostings.value,
    icon: Briefcase,
    color: "text-indigo-600",
    trendSummary: "\u2191 3 new this week",
    chartData: [
      { week: "W1", value: 8 },
      { week: "W2", value: 10 },
      { week: "W3", value: 9 },
      { week: "W4", value: 12 },
      { week: "W5", value: KPI_DATA.activePostings.value },
    ],
    chartType: "area" as const,
    description: "Open job postings over the last 5 weeks",
  },
  {
    id: "applicants",
    label: "Total Applicants",
    value: KPI_DATA.totalApplicants.value,
    icon: Users,
    color: "text-violet-600",
    trendSummary: "\u2191 18% vs last month",
    chartData: [
      { week: "W1", value: 85 },
      { week: "W2", value: 112 },
      { week: "W3", value: 98 },
      { week: "W4", value: 134 },
      { week: "W5", value: KPI_DATA.totalApplicants.value },
    ],
    chartType: "area" as const,
    description: "Applicants received over the last 5 weeks",
  },
  {
    id: "interviews",
    label: "Interviews Scheduled",
    value: KPI_DATA.interviewsScheduled.value,
    icon: Calendar,
    color: "text-purple-600",
    trendSummary: "7 scheduled today",
    chartData: [
      { week: "Mon", value: 3 },
      { week: "Tue", value: 5 },
      { week: "Wed", value: 4 },
      { week: "Thu", value: 7 },
      { week: "Fri", value: 2 },
    ],
    chartType: "bar" as const,
    description: "Interviews scheduled per day this week",
  },
  {
    id: "offers",
    label: "Offers Extended",
    value: KPI_DATA.offersExtended.value,
    icon: FileCheck,
    color: "text-emerald-600",
    trendSummary: "\u2191 2 more than last week",
    chartData: [
      { week: "W1", value: 2 },
      { week: "W2", value: 3 },
      { week: "W3", value: 5 },
      { week: "W4", value: 4 },
      { week: "W5", value: KPI_DATA.offersExtended.value },
    ],
    chartType: "area" as const,
    description: "Offers extended over the last 5 weeks",
  },
  {
    id: "timetohire",
    label: "Avg Time-to-Hire",
    value: KPI_DATA.avgTimeToHire.value,
    icon: Clock,
    color: "text-amber-600",
    trendSummary: "\u2193 8 days faster than Jan",
    chartData: [
      { week: "Jan", value: 22 },
      { week: "Feb", value: 20 },
      { week: "Mar", value: 18 },
      { week: "Apr", value: 16 },
      { week: "May", value: 14 },
    ],
    chartType: "area" as const,
    description: "Average days to hire trend (improving)",
  },
  {
    id: "acceptance",
    label: "Acceptance Rate",
    value: KPI_DATA.acceptanceRate.value,
    icon: BarChart3,
    color: "text-rose-600",
    trendSummary: "\u2191 6% vs last quarter",
    chartData: [
      { week: "W1", value: 60 },
      { week: "W2", value: 65 },
      { week: "W3", value: 70 },
      { week: "W4", value: 68 },
      { week: "W5", value: 74 },
    ],
    chartType: "bar" as const,
    description: "Offer acceptance rate (%) over last 5 weeks",
  },
];

// ── Interview data ────────────────────────────────────────────────────────────
interface Interview {
  id: number;
  time: string;
  name: string;
  role: string;
  type: string;
  photo?: string;
  done: boolean;
}

const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 1,
    time: "09:00 AM",
    name: "Priya Sharma",
    role: "Product Designer",
    type: "Video Call",
    photo: "/assets/generated/candidate-2.dim_200x200.jpg",
    done: false,
  },
  {
    id: 2,
    time: "10:30 AM",
    name: "Arjun Mehta",
    role: "Senior Engineer",
    type: "Phone Screen",
    photo: "/assets/generated/candidate-1.dim_200x200.jpg",
    done: false,
  },
  {
    id: 3,
    time: "01:00 PM",
    name: "Nisha Reddy",
    role: "Data Analyst",
    type: "On-site",
    photo: "/assets/generated/candidate-6.dim_200x200.jpg",
    done: false,
  },
  {
    id: 4,
    time: "03:30 PM",
    name: "Rahul Gupta",
    role: "Backend Engineer",
    type: "Video Call",
    photo: "/assets/generated/candidate-3.dim_200x200.jpg",
    done: false,
  },
];

const INTERVIEW_TYPE_COLORS: Record<string, string> = {
  "Video Call": "bg-indigo-100 text-indigo-700",
  "Phone Screen": "bg-amber-100 text-amber-700",
  "On-site": "bg-emerald-100 text-emerald-700",
};

const INTERVIEW_TYPES = ["Video Call", "Phone Screen", "On-site", "Panel"];

// ── Tasks ─────────────────────────────────────────────────────────────────────
const INITIAL_TASKS = [
  {
    id: 1,
    text: "Review shortlisted candidates for Product Designer role",
    done: false,
  },
  { id: 2, text: "Send offer letter to Nisha Reddy", done: true },
  { id: 3, text: "Schedule final round for Senior Engineer", done: false },
  { id: 4, text: "Post new opening: DevOps Engineer", done: false },
  { id: 5, text: "Follow up with Priya Sharma post-interview", done: false },
];

// ── KPI Sparkline Tooltip ─────────────────────────────────────────────────────
function KpiTooltip({
  pill,
  position,
}: {
  pill: (typeof KPI_PILLS)[number];
  position: "left" | "center" | "right";
}) {
  const positionStyle: React.CSSProperties =
    position === "left"
      ? { bottom: "calc(100% + 10px)", left: 0, transform: "none" }
      : position === "right"
        ? {
            bottom: "calc(100% + 10px)",
            right: 0,
            left: "auto",
            transform: "none",
          }
        : {
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
          };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: "12px 14px",
        minWidth: 190,
        zIndex: 100,
        pointerEvents: "none",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#6d28d9",
          marginBottom: 8,
        }}
      >
        {pill.trendSummary}
      </p>
      <div style={{ height: 40, marginBottom: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          {pill.chartType === "bar" ? (
            <BarChart
              data={pill.chartData}
              margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
            >
              <Bar
                dataKey="value"
                fill="#7C3AED"
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          ) : (
            <LineChart
              data={pill.chartData}
              margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7C3AED"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center" }}>
        Click to view full trend
      </p>
    </div>
  );
}

// ── KPI Modal ─────────────────────────────────────────────────────────────────
function KpiModal({
  pill,
  onClose,
}: {
  pill: (typeof KPI_PILLS)[number];
  onClose: () => void;
}) {
  const Icon = pill.icon;
  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full cursor-default"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-label="Close modal"
    >
      <dialog
        open
        aria-modal="true"
        style={{
          background: "white",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          padding: "24px",
          maxWidth: 420,
          width: "100%",
          position: "relative",
          margin: 0,
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-1">
          <Icon size={20} className={pill.color} />
          <h3 className="font-semibold text-gray-900">{pill.label}</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{pill.value}</p>
        <p className="text-xs text-gray-500 mb-6">{pill.description}</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {pill.chartType === "area" ? (
              <AreaChart
                data={pill.chartData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`grad-${pill.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  fill={`url(#grad-${pill.id})`}
                />
              </AreaChart>
            ) : (
              <BarChart
                data={pill.chartData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </dialog>
    </button>
  );
}

// ── Video Call Modal ──────────────────────────────────────────────────────────
function VideoCallModal({
  name,
  onClose,
}: { name: string; onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      <div
        className="bg-gray-900 rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl"
        data-ocid="dashboard.video_call.modal"
      >
        {/* Video area */}
        <div className="relative bg-gray-800 h-72 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-gray-400 text-sm animate-pulse">Connecting...</p>
          </div>
          {/* Self preview */}
          <div className="absolute bottom-4 right-4 w-24 h-16 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
            <span className="text-xs text-gray-400">You</span>
          </div>
          {/* Timer */}
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            00:00
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-center gap-4 py-5 bg-gray-900">
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${muted ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            <Phone size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition"
            data-ocid="dashboard.video_call.close_button"
          >
            <Phone size={20} className="text-white rotate-[135deg]" />
          </button>
          <button
            type="button"
            onClick={() => setCamOff(!camOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${camOff ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            <Video size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({
  interview,
  onSave,
  onClose,
}: {
  interview: Interview;
  onSave: (id: number, time: string) => void;
  onClose: () => void;
}) {
  const [time, setTime] = useState(interview.time);
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "05:00 PM",
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-80"
        data-ocid="dashboard.reschedule.modal"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Reschedule Interview</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {interview.name} — {interview.role}
        </p>
        <label
          htmlFor="rs-time"
          className="text-xs font-semibold text-gray-500 block mb-1.5"
        >
          Select New Time
        </label>
        <select
          id="rs-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-indigo-300 transition mb-4"
        >
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl hover:bg-gray-50 transition"
            data-ocid="dashboard.reschedule.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(interview.id, time);
              onClose();
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl"
            data-ocid="dashboard.reschedule.confirm_button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add Interview Modal ───────────────────────────────────────────────────────
function AddInterviewModal({
  onAdd,
  onClose,
}: {
  onAdd: (interview: Omit<Interview, "id" | "done">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    time: "09:00 AM",
    type: "Video Call",
  });
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "05:00 PM",
  ];
  const valid = form.name.trim() && form.role.trim();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-96"
        data-ocid="dashboard.add_interview.modal"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Schedule Interview</h3>
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
              htmlFor="ai-name"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Candidate Name
            </label>
            <input
              id="ai-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="dashboard.add_interview.name.input"
            />
          </div>
          <div>
            <label
              htmlFor="ai-role"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Role
            </label>
            <input
              id="ai-role"
              type="text"
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              placeholder="e.g. Frontend Engineer"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="dashboard.add_interview.role.input"
            />
          </div>
          <div>
            <label
              htmlFor="ai-time"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Time
            </label>
            <select
              id="ai-time"
              value={form.time}
              onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="dashboard.add_interview.time.select"
            >
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="ai-type"
              className="text-xs font-semibold text-gray-500 block mb-1"
            >
              Interview Type
            </label>
            <select
              id="ai-type"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
              data-ocid="dashboard.add_interview.type.select"
            >
              {INTERVIEW_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl hover:bg-gray-50 transition"
            data-ocid="dashboard.add_interview.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              if (valid) {
                onAdd({
                  name: form.name.trim(),
                  role: form.role.trim(),
                  time: form.time,
                  type: form.type,
                });
                onClose();
              }
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl disabled:opacity-40"
            data-ocid="dashboard.add_interview.submit_button"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activePill, setActivePill] = useState<
    (typeof KPI_PILLS)[number] | null
  >(null);
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [interviews, setInterviews] = useState<Interview[]>(INITIAL_INTERVIEWS);
  const [videoCallFor, setVideoCallFor] = useState<string | null>(null);
  const [rescheduleFor, setRescheduleFor] = useState<Interview | null>(null);
  const [showAddInterview, setShowAddInterview] = useState(false);
  const pillContainerRef = useRef<HTMLDivElement>(null);

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newTask.trim(), done: false },
    ]);
    setNewTask("");
  };

  const markInterviewDone = (id: number) =>
    setInterviews((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, done: true } : iv)),
    );

  const rescheduleInterview = (id: number, time: string) =>
    setInterviews((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, time } : iv)),
    );

  const addInterview = (data: Omit<Interview, "id" | "done">) =>
    setInterviews((prev) => [
      ...prev,
      { ...data, id: Date.now(), done: false },
    ]);

  const recentCandidates = CANDIDATES.slice(0, 6);

  return (
    <>
      <div className="space-y-6">
        {/* KPI Pills */}
        <div
          ref={pillContainerRef}
          className="flex flex-wrap gap-3"
          data-ocid="dashboard.kpis"
        >
          {KPI_PILLS.map((pill, idx) => {
            const Icon = pill.icon;
            const isHovered = hoveredPill === pill.id;
            const tooltipPosition: "left" | "center" | "right" =
              idx <= 1
                ? "left"
                : idx >= KPI_PILLS.length - 2
                  ? "right"
                  : "center";
            return (
              <div key={pill.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActivePill(pill)}
                  onMouseEnter={() => setHoveredPill(pill.id)}
                  onMouseLeave={() => setHoveredPill(null)}
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm transition-all duration-200 cursor-pointer"
                  data-ocid={`kpi.pill.${pill.id}`}
                >
                  <Icon size={14} className={`${pill.color} shrink-0`} />
                  <span className="text-xs text-gray-500 font-medium">
                    {pill.label}
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    {pill.value}
                  </span>
                  <TrendingUp
                    size={11}
                    className="text-gray-300 group-hover:text-gray-500 transition ml-0.5"
                  />
                </button>
                {isHovered && (
                  <KpiTooltip pill={pill} position={tooltipPosition} />
                )}
              </div>
            );
          })}
        </div>

        {/* KPI Modal */}
        {activePill && (
          <KpiModal pill={activePill} onClose={() => setActivePill(null)} />
        )}

        {/* Video Call Modal */}
        {videoCallFor && (
          <VideoCallModal
            name={videoCallFor}
            onClose={() => setVideoCallFor(null)}
          />
        )}

        {/* Reschedule Modal */}
        {rescheduleFor && (
          <RescheduleModal
            interview={rescheduleFor}
            onSave={rescheduleInterview}
            onClose={() => setRescheduleFor(null)}
          />
        )}

        {/* Add Interview Modal */}
        {showAddInterview && (
          <AddInterviewModal
            onAdd={addInterview}
            onClose={() => setShowAddInterview(false)}
          />
        )}

        {/* Center Stage: 3 columns */}
        <div className="grid grid-cols-3 gap-5">
          {/* Recent Applicants */}
          <div
            className="glass-card p-5 flex flex-col"
            data-ocid="dashboard.recent.applicants"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm">
                Recent Applicants
              </h2>
              <button
                type="button"
                onClick={() => onNavigate("applications")}
                className="text-xs text-indigo-600 hover:text-indigo-700 transition"
                data-ocid="dashboard.view_all.link"
              >
                View All
              </button>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {recentCandidates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-100 shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {c.role}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      c.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : c.status === "Screening"
                          ? "bg-amber-100 text-amber-700"
                          : c.status === "Interviewing"
                            ? "bg-purple-100 text-purple-700"
                            : c.status === "Offer"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Schedule */}
          <div
            className="glass-card p-5 flex flex-col"
            data-ocid="dashboard.interviews"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm">
                Today's Interviews
              </h2>
              <span className="text-[11px] text-gray-400">
                {interviews.filter((i) => !i.done).length} active
              </span>
            </div>
            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className={`rounded-xl border p-3 transition-all ${
                    interview.done
                      ? "bg-gray-50 border-gray-100 opacity-50"
                      : "bg-white border-gray-200 hover:border-indigo-200"
                  }`}
                  data-ocid={`dashboard.interview.item.${interview.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Photo */}
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 shrink-0">
                      {interview.photo ? (
                        <img
                          src={interview.photo}
                          alt={interview.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full gradient-active flex items-center justify-center">
                          <span className="text-[9px] font-bold text-white">
                            {interview.name.slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {interview.name}
                        </p>
                        <span className="text-[10px] font-semibold text-indigo-600 shrink-0 ml-1">
                          {interview.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-gray-400 truncate">
                          {interview.role}
                        </p>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${INTERVIEW_TYPE_COLORS[interview.type] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {interview.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!interview.done && (
                    <div className="flex gap-1.5 mt-2.5">
                      {interview.type === "Video Call" && (
                        <button
                          type="button"
                          onClick={() => setVideoCallFor(interview.name)}
                          className="flex items-center gap-1 text-[10px] font-semibold bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition"
                          data-ocid={`dashboard.interview.join_call.button.${interview.id}`}
                        >
                          <Video size={10} /> Join
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => markInterviewDone(interview.id)}
                        className="flex items-center gap-1 text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition"
                        data-ocid={`dashboard.interview.mark_done.button.${interview.id}`}
                      >
                        <Check size={10} /> Done
                      </button>
                      <button
                        type="button"
                        onClick={() => setRescheduleFor(interview)}
                        className="flex items-center gap-1 text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg hover:bg-amber-200 transition"
                        data-ocid={`dashboard.interview.reschedule.button.${interview.id}`}
                      >
                        <RefreshCw size={10} /> Reschedule
                      </button>
                    </div>
                  )}
                  {interview.done && (
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-green-600 font-medium">
                      <Check size={10} /> Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAddInterview(true)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl py-2 transition"
              data-ocid="dashboard.add_interview.open_modal_button"
            >
              <Plus size={12} /> Add Interview
            </button>
          </div>

          {/* Task List */}
          <div
            className="glass-card p-5 flex flex-col"
            data-ocid="dashboard.tasks"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm">Tasks</h2>
              <span className="text-[11px] text-gray-400">
                {tasks.filter((t) => t.done).length}/{tasks.length} done
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${tasks.length ? (tasks.filter((t) => t.done).length / tasks.length) * 100 : 0}%`,
                  background: "linear-gradient(90deg, #6d28d9, #8b5cf6)",
                }}
              />
            </div>
            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-start gap-2.5 text-left group"
                  data-ocid={`dashboard.task.item.${task.id}`}
                >
                  {task.done ? (
                    <CheckSquare
                      size={15}
                      className="text-indigo-600 shrink-0 mt-0.5"
                    />
                  ) : (
                    <Square
                      size={15}
                      className="text-gray-400 shrink-0 mt-0.5 group-hover:text-gray-600 transition"
                    />
                  )}
                  <span
                    className={`text-xs leading-snug ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}
                  >
                    {task.text}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a task..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg text-xs px-3 py-2 text-gray-800 placeholder:text-gray-400 outline-none focus:border-indigo-400 transition"
                data-ocid="dashboard.tasks.input"
              />
              <button
                type="button"
                onClick={addTask}
                className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center shrink-0"
                data-ocid="dashboard.tasks.button"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400 pb-4">
          &copy; {new Date().getFullYear()} CareerUp Inc. &mdash; Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </>
  );
}

// Unused import cleanup
void Eye;
