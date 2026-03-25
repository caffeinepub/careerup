import { Phone, Send, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  CONVERSATIONS,
  type Conversation,
  type Message,
} from "../data/mockData";

function VideoCallModal({
  name,
  photo,
  onClose,
}: { name: string; photo?: string; onClose: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      <div
        className="bg-gray-900 rounded-2xl overflow-hidden w-full max-w-xl shadow-2xl"
        data-ocid="messages.video_call.modal"
      >
        <div className="relative bg-gray-800 h-72 flex items-center justify-center">
          {!camOff ? (
            <div className="flex flex-col items-center gap-3">
              {photo ? (
                <img
                  src={photo}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <p className="text-white font-semibold">{name}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-gray-300 text-sm">Connected</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <Video size={28} className="text-gray-500" />
              </div>
              <p className="text-gray-400 text-sm">Camera off</p>
            </div>
          )}
          {/* Self preview */}
          <div className="absolute bottom-4 right-4 w-24 h-16 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
            <span className="text-xs text-gray-400">You</span>
          </div>
          {/* Timer */}
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {fmt(elapsed)}
          </div>
        </div>
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
            data-ocid="messages.video_call.close_button"
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

export default function Messages() {
  const [conversations, setConversations] =
    useState<Conversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>(CONVERSATIONS[0].id);
  const [input, setInput] = useState("");
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active =
    conversations.find((c) => c.id === activeId) ?? conversations[0];

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m_${Date.now()}`,
      senderId: "recruiter",
      text: input.trim(),
      timestamp: "Just now",
      isRecruiter: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text,
              unread: 0,
            }
          : c,
      ),
    );
    setInput("");

    // Auto-reply
    setTimeout(() => {
      const replies = [
        "Thanks for the update! I'll keep that in mind.",
        "That sounds great, looking forward to it!",
        "I appreciate you reaching out. I'll get back to you soon.",
        "Perfect, see you then!",
        "Thank you! I'm excited about this opportunity.",
      ];
      const reply: Message = {
        id: `m_${Date.now() + 1}`,
        senderId: active.candidateId,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: "Just now",
        isRecruiter: false,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, reply] } : c,
        ),
      );
    }, 1500);
  };

  const selectConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  return (
    <>
      {videoCallOpen && (
        <VideoCallModal
          name={active.candidateName}
          photo={active.photo}
          onClose={() => setVideoCallOpen(false)}
        />
      )}
      <div className="flex gap-4" style={{ height: "calc(100vh - 120px)" }}>
        {/* Conversation list */}
        <div
          className="glass-card w-72 shrink-0 flex flex-col"
          data-ocid="messages.panel"
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Messages</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {conversations.reduce((s, c) => s + c.unread, 0)} unread
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {conversations.map((conv) => (
              <button
                type="button"
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
                  activeId === conv.id
                    ? "bg-indigo-50 border border-indigo-200"
                    : "hover:bg-gray-50"
                }`}
                data-ocid={`messages.conversation.item.${conversations.indexOf(conv) + 1}`}
              >
                <div className="relative w-10 h-10 shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100">
                    {conv.photo ? (
                      <img
                        src={conv.photo}
                        alt={conv.candidateName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full gradient-active flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">
                          {conv.avatar}
                        </span>
                      </div>
                    )}
                  </div>
                  {conv.unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900">
                      {conv.candidateName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div
          className="glass-card flex-1 flex flex-col"
          data-ocid="messages.chat.panel"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100">
                {active.photo ? (
                  <img
                    src={active.photo}
                    alt={active.candidateName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full gradient-active flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {active.avatar}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {active.candidateName}
                </p>
                <p className="text-xs text-gray-400">{active.candidateRole}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVideoCallOpen(true)}
              className="flex items-center gap-2 gradient-btn text-xs font-semibold px-3 py-2 rounded-lg"
              data-ocid="messages.video_call.button"
            >
              <Video size={14} /> Video Call
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-5 space-y-3"
            data-ocid="messages.chat.panel"
          >
            {active.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isRecruiter ? "justify-end" : "justify-start"}`}
              >
                {!msg.isRecruiter && (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-indigo-100 shrink-0 mr-2 mt-1">
                    {active.photo ? (
                      <img
                        src={active.photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full gradient-active flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">
                          {active.avatar}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                    msg.isRecruiter
                      ? "gradient-active text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${msg.isRecruiter ? "text-white/60" : "text-gray-400"}`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-5 py-4 border-t border-gray-100 flex items-center gap-3"
            data-ocid="messages.input.panel"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${active.candidateName}...`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-indigo-300 transition"
              data-ocid="messages.chat.input"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="gradient-btn w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              data-ocid="messages.send.button"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Unused import cleanup
void X;
