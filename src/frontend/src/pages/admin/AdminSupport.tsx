import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";

type TicketStatus = "Open" | "In Progress" | "Resolved";

const TICKETS: {
  id: string;
  subject: string;
  from: string;
  type: "recruiter" | "candidate";
  category: string;
  priority: "High" | "Medium" | "Low";
  created: string;
  updated: string;
  status: TicketStatus;
  messages: { sender: string; text: string; time: string }[];
}[] = [
  {
    id: "TKT-001",
    subject: "Cannot access billing portal",
    from: "Sarah Chen (TechCorp)",
    type: "recruiter",
    category: "Billing",
    priority: "High",
    created: "Today, 9:00 AM",
    updated: "Today, 9:00 AM",
    status: "Open",
    messages: [
      {
        sender: "Sarah Chen",
        text: "Hi, I'm unable to access the billing portal. It keeps showing an error.",
        time: "9:00 AM",
      },
      {
        sender: "Admin",
        text: "Hi Sarah, we're looking into this. Can you share the error message?",
        time: "9:05 AM",
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "Job posting not appearing in search",
    from: "Rajesh Kumar (Infosys)",
    type: "recruiter",
    category: "Technical",
    priority: "Medium",
    created: "Today, 10:30 AM",
    updated: "Today, 10:30 AM",
    status: "Open",
    messages: [
      {
        sender: "Rajesh Kumar",
        text: "My job posting for Senior Dev was approved but it doesn't show in candidate search.",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "Account locked after password change",
    from: "Priya Sharma",
    type: "candidate",
    category: "Account Access",
    priority: "High",
    created: "Today, 11:00 AM",
    updated: "Today, 11:15 AM",
    status: "In Progress",
    messages: [
      {
        sender: "Priya Sharma",
        text: "After changing my password, I can no longer log in.",
        time: "11:00 AM",
      },
      {
        sender: "Admin",
        text: "We have escalated this to our technical team. You should receive a reset link shortly.",
        time: "11:15 AM",
      },
    ],
  },
  {
    id: "TKT-004",
    subject: "Subscription upgrade not reflecting",
    from: "Divya Nair (Freshworks)",
    type: "recruiter",
    category: "Billing",
    priority: "Medium",
    created: "Yesterday",
    updated: "Yesterday",
    status: "Open",
    messages: [
      {
        sender: "Divya Nair",
        text: "We upgraded to Pro plan but still seeing Free plan limits.",
        time: "Yesterday, 3:00 PM",
      },
    ],
  },
  {
    id: "TKT-005",
    subject: "Inappropriate job description reported",
    from: "Aarav Patel",
    type: "candidate",
    category: "Moderation",
    priority: "High",
    created: "Yesterday",
    updated: "Yesterday",
    status: "Open",
    messages: [
      {
        sender: "Aarav Patel",
        text: "This job posting has offensive language in the description.",
        time: "Yesterday, 4:00 PM",
      },
    ],
  },
  {
    id: "TKT-006",
    subject: "How to export candidate data?",
    from: "Amit Sharma (HCL)",
    type: "recruiter",
    category: "How-to",
    priority: "Low",
    created: "2 days ago",
    updated: "2 days ago",
    status: "In Progress",
    messages: [
      {
        sender: "Amit Sharma",
        text: "Is there a way to export all candidate applications to CSV?",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "TKT-007",
    subject: "App crashes on iOS 17",
    from: "Rohan Mehta",
    type: "candidate",
    category: "Technical",
    priority: "Medium",
    created: "3 days ago",
    updated: "3 days ago",
    status: "In Progress",
    messages: [
      {
        sender: "Rohan Mehta",
        text: "The app crashes every time I try to swipe on job cards on iOS 17.",
        time: "3 days ago",
      },
    ],
  },
  {
    id: "TKT-008",
    subject: "Refund request for duplicate charge",
    from: "Kunal Shah (CRED)",
    type: "recruiter",
    category: "Billing",
    priority: "High",
    created: "4 days ago",
    updated: "2 days ago",
    status: "Resolved",
    messages: [
      {
        sender: "Kunal Shah",
        text: "We were charged twice for our monthly subscription.",
        time: "4 days ago",
      },
      {
        sender: "Admin",
        text: "Refund has been processed. It will reflect in 5-7 business days.",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "TKT-009",
    subject: "2FA not sending OTP",
    from: "Ananya Singh",
    type: "candidate",
    category: "Account Access",
    priority: "Medium",
    created: "5 days ago",
    updated: "5 days ago",
    status: "Resolved",
    messages: [
      {
        sender: "Ananya Singh",
        text: "I'm not receiving the 2FA OTP on my registered phone.",
        time: "5 days ago",
      },
      {
        sender: "Admin",
        text: "This was a carrier issue. It has been resolved.",
        time: "5 days ago",
      },
    ],
  },
];

const priorityStyle: Record<string, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState(TICKETS);
  const [tab, setTab] = useState<TicketStatus | "All">("Open");
  const [selected, setSelected] = useState<(typeof TICKETS)[0] | null>(null);
  const [reply, setReply] = useState("");
  const [newStatus, setNewStatus] = useState<TicketStatus>("Open");

  const filtered = tickets.filter((t) => tab === "All" || t.status === tab);
  const count = (s: string) => tickets.filter((t) => t.status === s).length;

  const sendReply = () => {
    if (!selected || !reply.trim()) return;
    const msg = { sender: "Admin", text: reply, time: "Just now" };
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? { ...t, status: newStatus, messages: [...t.messages, msg] }
          : t,
      ),
    );
    setSelected((prev) =>
      prev
        ? { ...prev, status: newStatus, messages: [...prev.messages, msg] }
        : null,
    );
    setReply("");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {count("Open")} open, {count("In Progress")} in progress,{" "}
            {count("Resolved")} resolved
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-200">
        {(["Open", "In Progress", "Resolved"] as TicketStatus[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${tab === t ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t}{" "}
            <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
              {count(t)}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => {
              setSelected(t);
              setNewStatus(t.status);
            }}
            className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition text-left w-full"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">
                    {t.id}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityStyle[t.priority]}`}
                  >
                    {t.priority}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    {t.category}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {t.type === "recruiter" ? "Recruiter" : "Candidate"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {t.subject}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">From: {t.from}</p>
              </div>
              <div className="text-right ml-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} />
                  {t.updated}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MessageSquare size={11} />
                  {t.messages.length} messages
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{selected?.id}</span>
              <span className="text-sm font-normal text-gray-500">
                — {selected?.subject}
              </span>
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityStyle[selected.priority]}`}
                >
                  {selected.priority} Priority
                </span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  {selected.category}
                </span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  From: {selected.from}
                </span>
              </div>

              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto bg-gray-50 rounded-xl p-3">
                {selected.messages.map((m) => (
                  <div
                    key={m.sender + m.time + m.text.slice(0, 10)}
                    className={`flex flex-col ${m.sender === "Admin" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-xl text-sm ${m.sender === "Admin" ? "bg-[#2563EB] text-white" : "bg-white border border-gray-200 text-gray-700"}`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5">
                      {m.sender} · {m.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none h-20 outline-none focus:border-blue-300"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(e.target.value as TicketStatus)
                    }
                    className="h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none flex-1"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                  <button
                    type="button"
                    onClick={sendReply}
                    className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition flex items-center justify-center gap-1"
                  >
                    <AlertCircle size={13} />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
