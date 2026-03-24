import { Video } from "lucide-react";
import { useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "recruiter" | "user";
  time: string;
}

interface ChatScreenProps {
  name: string;
  company: string;
  role: string;
  avatarText: string;
  avatarColor: string;
  onBack: () => void;
}

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scrollToBottom(ref: React.RefObject<HTMLDivElement | null>) {
  setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 50);
}

export default function ChatScreen({
  name,
  company,
  role,
  avatarText,
  avatarColor,
  onBack,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I came across your profile and I'd love to discuss the ${role} opening at ${company}. Are you open to new opportunities?`,
      sender: "recruiter",
      time: "10:02 AM",
    },
    {
      id: 2,
      text: `Hi! Yes, I'm definitely interested. I've been following ${company}'s work and I think it would be a great fit.`,
      sender: "user",
      time: "10:05 AM",
    },
    {
      id: 3,
      text: "That's great to hear! Could you tell me a bit about your experience and what you're looking for in your next role?",
      sender: "recruiter",
      time: "10:07 AM",
    },
    {
      id: 4,
      text: "I have 5+ years in design and engineering with a focus on user-centric products. I'm looking for a fast-paced team where I can make a big impact.",
      sender: "user",
      time: "10:10 AM",
    },
    {
      id: 5,
      text: "That sounds perfect! Our team is growing quickly and we need someone who can hit the ground running. Would you be available for a call this week?",
      sender: "recruiter",
      time: "10:12 AM",
    },
    {
      id: 6,
      text: "Absolutely! Thursday afternoon works great for me.",
      sender: "user",
      time: "10:13 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isVideoCall, setIsVideoCall] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user", time: nowTime() },
    ]);
    setInput("");
    scrollToBottom(bottomRef);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for reaching out! I'll get back to you shortly.",
          sender: "recruiter",
          time: nowTime(),
        },
      ]);
      scrollToBottom(bottomRef);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-14 pb-4 bg-white border-b border-gray-100"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <button
          type="button"
          data-ocid="chat.close_button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:scale-90 transition-transform text-gray-700 text-xl"
        >
          ‹
        </button>

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: avatarColor }}
        >
          {avatarText}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">
            {name}
          </p>
          <p className="text-xs text-blue-600 truncate">{company}</p>
        </div>

        <button
          type="button"
          data-ocid="chat.video_button"
          onClick={() => setIsVideoCall(true)}
          aria-label="Start video call"
          className="w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Video className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === "user"
                  ? "rounded-br-sm text-white"
                  : "rounded-bl-sm bg-white text-gray-800 shadow-sm"
              }`}
              style={
                msg.sender === "user"
                  ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)" }
                  : undefined
              }
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.sender === "user" ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.05)" }}
      >
        <input
          data-ocid="chat.input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="button"
          data-ocid="chat.submit_button"
          onClick={sendMessage}
          disabled={!input.trim()}
          aria-label="Send message"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 disabled:opacity-40 active:scale-90 transition-all"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Video call overlay */}
      {isVideoCall && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl">
            <div className="flex justify-center mb-3">
              <Video className="w-12 h-12 text-blue-500 animate-pulse" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">
              Video Call Starting...
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Connecting to {name} at {company}
            </p>
            <button
              type="button"
              data-ocid="chat.cancel_button"
              onClick={() => setIsVideoCall(false)}
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
