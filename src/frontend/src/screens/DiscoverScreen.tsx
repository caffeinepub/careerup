import {
  Bell,
  Bookmark,
  Check,
  DollarSign,
  MapPin,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import JobDetailsSheet from "../components/JobDetailsSheet";
import { MOCK_JOBS, type MockJob } from "../data/mockJobs";

type SwipeAction = "apply" | "save" | "super" | null;

function formatSalary(min: number, max: number) {
  return `$${Math.round(min / 1000)}K\u2013$${Math.round(max / 1000)}K`;
}

function CompanyLogoImg({
  logo,
  color,
  initial,
  size = 48,
}: { logo: string; color: string; initial: string; size?: number }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className="rounded-xl flex items-center justify-center text-white font-bold shadow-md border-2 border-white"
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

function MatchBadge({ score }: { score: number }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-white text-xs font-bold shadow"
      style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
    >
      {score}% Match
    </div>
  );
}

const SKILL_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    text: "New match: Staff Engineer at Linear \u2014 88% match",
    time: "2 min ago",
  },
  {
    id: 2,
    text: "Your application to Stripe was viewed by a recruiter",
    time: "1 hr ago",
  },
  {
    id: 3,
    text: "You have a new message from Airbnb HR",
    time: "3 hrs ago",
  },
  {
    id: 4,
    text: "Interview reminder: Notion UX Lead \u2014 Tomorrow 2PM",
    time: "Yesterday",
  },
  {
    id: 5,
    text: "3 new jobs match your profile today",
    time: "Yesterday",
  },
];

function JobCard({
  job,
  isTop,
  offset,
  dragX,
  dragY,
  swipeAction,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTap,
  flying,
}: {
  job: MockJob;
  isTop: boolean;
  offset: number;
  dragX: number;
  dragY: number;
  swipeAction: SwipeAction;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTap: () => void;
  flying: string | null;
}) {
  const scale = isTop ? 1 : 0.95 - offset * 0.03;
  const translateY = isTop ? dragY * 0.3 : offset * 12;
  const rotate = isTop ? dragX * 0.06 : 0;

  let flyTransform = "";
  if (flying === "right") flyTransform = "translateX(120vw) rotate(30deg)";
  if (flying === "left") flyTransform = "translateX(-120vw) rotate(-30deg)";
  if (flying === "up") flyTransform = "translateY(-120vh)";

  const transform = flying
    ? flyTransform
    : isTop
      ? `translateX(${dragX}px) translateY(${translateY}px) rotate(${rotate}deg)`
      : `translateY(${translateY}px) scale(${scale})`;

  return (
    <div
      className="absolute inset-x-4 rounded-3xl bg-white overflow-hidden"
      role={isTop ? "button" : undefined}
      tabIndex={isTop ? 0 : undefined}
      style={{
        top: 0,
        bottom: 0,
        transform,
        transition:
          flying || !isTop
            ? "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
            : "none",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        zIndex: 10 - offset,
        userSelect: "none",
        touchAction: "none",
      }}
      onTouchStart={isTop ? onTouchStart : undefined}
      onTouchMove={isTop ? onTouchMove : undefined}
      onTouchEnd={isTop ? onTouchEnd : undefined}
      onClick={isTop ? onTap : undefined}
      onKeyDown={isTop ? (e) => e.key === "Enter" && onTap() : undefined}
    >
      {/* Swipe Labels */}
      {isTop && swipeAction === "apply" && (
        <div className="absolute top-8 left-6 z-20 px-4 py-2 rounded-xl border-2 border-green-500 rotate-[-12deg]">
          <span className="text-green-500 font-black text-xl flex items-center gap-1">
            APPLY <Check size={16} className="inline" />
          </span>
        </div>
      )}
      {isTop && swipeAction === "save" && (
        <div className="absolute top-8 right-6 z-20 px-4 py-2 rounded-xl border-2 border-yellow-500 rotate-[12deg]">
          <span className="text-yellow-500 font-black text-xl flex items-center gap-1">
            SAVE <Bookmark size={16} className="inline" />
          </span>
        </div>
      )}
      {isTop && swipeAction === "super" && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl border-2 border-blue-500">
          <span className="text-blue-500 font-black text-xl flex items-center gap-1">
            SUPER <Zap size={18} className="inline" />
          </span>
        </div>
      )}

      {/* Company Banner */}
      <div className="relative w-full" style={{ height: 160 }}>
        <img
          src={job.companyBanner}
          alt={`${job.company} office`}
          className="w-full h-full object-cover"
          style={{ borderRadius: "24px 24px 0 0" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)",
            borderRadius: "24px 24px 0 0",
          }}
        />
        <div className="absolute top-3 right-3 z-10">
          <MatchBadge score={job.matchScore} />
        </div>
        <div className="absolute -bottom-6 left-5 z-10">
          <CompanyLogoImg
            logo={job.companyLogo}
            color={job.companyColor}
            initial={job.companyInitial}
            size={48}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col px-5 pt-9 pb-4">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-0.5">
            {job.title}
          </h2>
          <p className="text-gray-600 font-medium text-sm">{job.company}</p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-gray-400 text-xs flex items-center gap-0.5">
              <MapPin size={12} className="inline mr-0.5" />
              {job.location}
            </span>
            <span className="text-gray-400 text-xs flex items-center gap-0.5">
              <DollarSign size={12} className="inline mr-0.5" />
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
              {job.employmentType}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.skills.map((s, i) => (
            <span
              key={s}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
            >
              {s}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-2 p-3 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)" }}
        >
          <Sparkles size={14} className="text-purple-400 shrink-0" />
          <p className="text-xs text-gray-600 italic">{job.aiReason}</p>
        </div>

        <div className="mt-2 text-right">
          <span className="text-xs text-gray-400">Tap for details \u2192</span>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverScreen() {
  const [jobs, setJobs] = useState([...MOCK_JOBS]);
  const [flying, setFlying] = useState<string | null>(null);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [swipeAction, setSwipeAction] = useState<SwipeAction>(null);
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
  }

  function handleTouchMove(e: React.TouchEvent) {
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    setDragX(dx);
    setDragY(dy);
    if (Math.abs(dy) > 60 && dy < 0) setSwipeAction("super");
    else if (dx > 60) setSwipeAction("apply");
    else if (dx < -60) setSwipeAction("save");
    else setSwipeAction(null);
  }

  function handleTouchEnd() {
    const elapsed = Date.now() - startTime.current;
    const totalMove = Math.abs(dragX) + Math.abs(dragY);

    if (totalMove < 15 && elapsed < 300) {
      setDragX(0);
      setDragY(0);
      setSwipeAction(null);
      setSelectedJob(jobs[0]);
      return;
    }

    if (dragX > 80) {
      triggerSwipe("right", "apply");
    } else if (dragX < -80) {
      triggerSwipe("left", "save");
    } else if (dragY < -80) {
      triggerSwipe("up", "super");
    } else {
      setDragX(0);
      setDragY(0);
      setSwipeAction(null);
    }
  }

  function triggerSwipe(dir: string, _action: SwipeAction) {
    setFlying(dir);
    setTimeout(() => {
      setJobs((prev) => prev.slice(1));
      setFlying(null);
      setDragX(0);
      setDragY(0);
      setSwipeAction(null);
    }, 400);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-lg">CareerUp</span>
        </div>
        <button
          type="button"
          data-ocid="discover.notification.button"
          onClick={() => setShowNotifications(true)}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center relative"
        >
          <Bell size={18} />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              fontSize: "9px",
              fontWeight: 700,
            }}
          >
            5
          </span>
        </button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 relative mx-0 my-2">
        {jobs.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <Target size={56} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You&#39;re all caught up!
            </h3>
            <p className="text-gray-500 text-center text-sm mb-6">
              No more matches for today. Check back tomorrow or update your
              preferences.
            </p>
            <button
              type="button"
              onClick={() => setJobs([...MOCK_JOBS])}
              className="px-6 py-3 rounded-2xl text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              Refresh Matches
            </button>
          </div>
        ) : (
          jobs
            .slice(0, 3)
            .map((job, i) => (
              <JobCard
                key={job.id.toString()}
                job={job}
                isTop={i === 0}
                offset={i}
                dragX={i === 0 ? dragX : 0}
                dragY={i === 0 ? dragY : 0}
                swipeAction={i === 0 ? swipeAction : null}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTap={() => setSelectedJob(job)}
                flying={i === 0 ? flying : null}
              />
            ))
        )}
      </div>

      {/* Action Buttons */}
      {jobs.length > 0 && (
        <div className="flex items-center justify-center gap-5 pb-4 pt-2">
          <button
            type="button"
            data-ocid="discover.save.button"
            onClick={() => triggerSwipe("left", "save")}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 active:scale-90 transition-transform"
          >
            <Bookmark size={22} className="text-yellow-500" />
          </button>
          <button
            type="button"
            data-ocid="discover.super_apply.button"
            onClick={() => triggerSwipe("up", "super")}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Zap size={26} className="text-white" />
          </button>
          <button
            type="button"
            data-ocid="discover.apply.button"
            onClick={() => triggerSwipe("right", "apply")}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 active:scale-90 transition-transform"
          >
            <Check size={22} className="text-green-500" />
          </button>
        </div>
      )}

      {/* Job Details Sheet */}
      {selectedJob && (
        <JobDetailsSheet
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* Notifications Overlay */}
      {showNotifications && (
        <div
          className="absolute inset-0 z-50"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close notifications"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setShowNotifications(false)}
          />
          {/* Panel */}
          <div
            role="presentation"
            className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-14 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <button
                type="button"
                data-ocid="notifications.close.button"
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm"
              >
                \u2715
              </button>
            </div>
            <div className="px-5 py-2 pb-8">
              {MOCK_NOTIFICATIONS.map((n, i) => (
                <div
                  key={n.id}
                  className={`py-3.5 ${
                    i < MOCK_NOTIFICATIONS.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  <p className="text-sm text-gray-800 leading-snug">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
