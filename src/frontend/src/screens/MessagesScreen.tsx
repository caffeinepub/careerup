const MOCK_MESSAGES = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "Stripe",
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
    avatar: "TW",
    color: "#5c6bc0",
    message:
      "Thank you for applying. We will review and get back to you shortly.",
    time: "2d ago",
    unread: 0,
  },
];

export default function MessagesScreen() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">Recruiter conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MOCK_MESSAGES.map((msg) => (
          <button
            type="button"
            key={msg.id}
            className="flex items-center gap-4 px-5 py-4 w-full text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
          >
            <div className="relative shrink-0">
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
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p
                  className={`text-sm ${msg.unread > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}
                >
                  {msg.name}
                </p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-xs text-blue-600 font-medium mb-0.5">
                {msg.company}
              </p>
              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
