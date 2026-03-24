import { Video } from "lucide-react";
import { useState } from "react";
import ChatScreen from "./ChatScreen";

const MOCK_MESSAGES = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "Stripe",
    role: "Senior Product Designer",
    avatar: "SC",
    color: "#6366f1",
    message:
      "Hi! I came across your profile and I'd love to chat about our Senior Designer role.",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    company: "Airbnb",
    role: "Frontend Engineer",
    avatar: "MJ",
    color: "#ef4444",
    message:
      "Your application looks great! Are you available for a quick call this week?",
    time: "1h ago",
    unread: 1,
  },
  {
    id: 3,
    name: "Priya Patel",
    company: "Notion",
    role: "UX Lead",
    avatar: "PP",
    color: "#1f2937",
    message:
      "Just wanted to follow up on your interview. The team loved your work!",
    time: "3h ago",
    unread: 0,
  },
  {
    id: 4,
    name: "Tom Williams",
    company: "Linear",
    role: "Staff Engineer",
    avatar: "TW",
    color: "#5c6bc0",
    message:
      "Thank you for applying. We will review and get back to you shortly.",
    time: "2d ago",
    unread: 0,
  },
];

type Conversation = (typeof MOCK_MESSAGES)[number];

export default function MessagesScreen() {
  const [openChat, setOpenChat] = useState<Conversation | null>(null);
  const [callingId, setCallingId] = useState<number | null>(null);

  if (openChat) {
    return (
      <ChatScreen
        name={openChat.name}
        company={openChat.company}
        role={openChat.role}
        avatarText={openChat.avatar}
        avatarColor={openChat.color}
        onBack={() => setOpenChat(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">Recruiter conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MOCK_MESSAGES.map((msg, idx) => (
          <div
            key={msg.id}
            className="flex items-center gap-4 px-5 py-4 w-full border-b border-gray-50 hover:bg-gray-50 transition-colors"
            data-ocid={`messages.item.${idx + 1}`}
          >
            {/* Avatar + unread */}
            <button
              type="button"
              className="relative shrink-0"
              onClick={() => setOpenChat(msg)}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: msg.color }}
              >
                {msg.avatar}
              </div>
              {msg.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">
                    {msg.unread}
                  </span>
                </div>
              )}
            </button>

            {/* Text content */}
            <button
              type="button"
              className="flex-1 min-w-0 text-left"
              onClick={() => setOpenChat(msg)}
            >
              <div className="flex items-center justify-between mb-0.5">
                <p
                  className={`text-sm ${
                    msg.unread > 0
                      ? "font-bold text-gray-900"
                      : "font-semibold text-gray-700"
                  }`}
                >
                  {msg.name}
                </p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-xs text-blue-600 font-medium mb-0.5">
                {msg.company}
              </p>
              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
            </button>

            {/* Video call button */}
            <button
              type="button"
              data-ocid={`messages.video.${idx + 1}`}
              aria-label={`Video call with ${msg.name}`}
              onClick={() => {
                setCallingId(msg.id);
                setTimeout(() => setCallingId(null), 3000);
              }}
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-50 active:scale-90 transition-transform"
            >
              <Video className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Calling overlay */}
      {callingId !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl">
            <div className="flex justify-center mb-3">
              <Video className="w-12 h-12 text-blue-500 animate-pulse" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">
              Video Call Starting...
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Connecting to{" "}
              {MOCK_MESSAGES.find((m) => m.id === callingId)?.name}
            </p>
            <button
              type="button"
              onClick={() => setCallingId(null)}
              className="px-6 py-2.5 rounded-full bg-red-500 text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
