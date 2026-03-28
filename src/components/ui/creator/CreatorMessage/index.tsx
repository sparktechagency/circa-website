"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, Send, Phone, MoreVertical, X, ChevronLeft,
  Shield, Flag, CheckCircle2, ArrowLeft, Users, Check,
  AlertCircle, MessageSquare, Filter, Paperclip, Smile,
  Image as ImageIcon, CheckCheck, Circle
} from "lucide-react";
import { GiFallingStar } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Contact {
  id: string;
  name: string;
  avatar: string;
  tier?: "Beauty" | "Expired" | "Gold" | "Basic";
  tierColor?: string;
  points?: number;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  activeAgo?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  status?: "sent" | "delivered" | "read";
}

// ─── Demo Data ──────────────────────────────────────────────────────────────
const CONTACTS: Contact[] = Array.from({ length: 8 }, (_, i) => ({
  id: `${i + 1}`,
  name: "Marvin McKinney",
  avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 10}`,
  tier: i % 3 === 0 ? "Beauty" : i % 3 === 1 ? "Expired" : "Gold",
  tierColor: i % 3 === 0 ? "text-pink-400" : i % 3 === 1 ? "text-gray-400" : "text-yellow-400",
  points: i % 3 === 0 ? 3 : undefined,
  lastMessage: "Hey Bro! let's do it...",
  time: "1:30 AM",
  unread: i % 4 === 0 ? 1 : undefined,
  online: i % 2 === 0,
  activeAgo: "Active 1hr ago",
}));

const MASS_CONTACTS: Contact[] = Array.from({ length: 4 }, (_, i) => ({
  id: `m${i + 1}`,
  name: "Marvin McKinney",
  avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 20}`,
  tier: ["Beauty", "Banned", "Explicit", "Beauty"][i] as Contact["tier"],
  tierColor: ["text-pink-400", "text-red-400", "text-orange-400", "text-pink-400"][i],
  lastMessage: "",
  time: "",
  activeAgo: "Active 5hr ago",
}));

const MESSAGES: Message[] = [
  { id: "1", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "them", time: "1:00 AM", status: "read" },
  { id: "2", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "me", time: "1:08 AM", status: "read" },
  { id: "3", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "them", time: "1:09 AM" },
  { id: "4", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "me", time: "1:15 AM", status: "delivered" },
  { id: "5", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "them", time: "1:18 AM" },
  { id: "6", text: "Glad you liked it! It's called 'Midnight Pulse.' I can send you the stems if you're ready.", sender: "me", time: "1:20 AM", status: "sent" },
];

const REPORT_REASONS = [
  "Spam Or Irrelevant Content",
  "Harassment Or Bullying",
  "Offensive Or Inappropriate Content",
  "Impersonation Or Fake Account",
  "Other",
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function Avatar({ src, size = 9, online }: { src: string; size?: number; online?: boolean }) {
  const sizeClass = `w-${size} h-${size}`;
  return (
    <div className={`relative flex-shrink-0 ${sizeClass}`}>
      <img src={src} alt="" className={`${sizeClass} rounded-full object-cover bg-[#1e1f2e]`} />
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0d0e14]" />
      )}
    </div>
  );
}

function TierBadge({ tier, color, points }: { tier?: string; color?: string; points?: number }) {
  if (!tier) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${color}`}>
      ★ {tier} {points !== undefined && <span className="bg-white/10 rounded px-1">+{points}</span>}
    </span>
  );
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function ContextMenu({ x, y, onBlock, onReport, onClose }: {
  x: number; y: number; onBlock: () => void; onReport: () => void; onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 w-36 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        style={{ top: y, left: x }}
      >
        <button onClick={onBlock} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-white hover:bg-white/5 transition-colors">
          <Shield size={14} className="text-gray-400" /> Block
        </button>
        <button onClick={onReport} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-white hover:bg-white/5 transition-colors">
          <Flag size={14} className="text-gray-400" /> Report
        </button>
      </div>
    </>
  );
}

function BlockModal({ contact, onClose, onConfirm }: { contact: Contact; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#13141e] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
        <div className="flex flex-col items-center gap-4 text-center">
          <Avatar src={contact.avatar} size={16} />
          <h3 className="text-white font-semibold text-base">
            Are You Sure You Want To Block <span className="text-indigo-400">@{contact.name.replace(" ", "")}?</span>
          </h3>
          <div className="space-y-2 text-left w-full">
            {["You Won't See Their Posts, And They Won't Be Able To Interact With You.", "You Can Always Unblock Them Later In Your Settings."].map((t, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-xs leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-all"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#13141e] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
        <h3 className="text-white font-semibold text-base mb-4">Please Select The Reason For Reporting This Conversation</h3>
        <div className="space-y-2 mb-5">
          {REPORT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all
                ${selected === r ? "border-indigo-500/50 bg-indigo-500/10 text-white" : "border-white/8 bg-[#1c1d27] text-gray-300 hover:border-white/20"}`}
            >
              {r}
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all
                ${selected === r ? "border-indigo-500 bg-indigo-500" : "border-gray-600"}`}>
                {selected === r && <div className="w-full h-full rounded-full bg-white scale-50 block" />}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onSubmit}
          disabled={!selected}
          className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
        >
          Submit report
        </button>
      </div>
    </div>
  );
}

function ReportSuccessToast({ onClose }: { onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1a1b26] border border-white/10 rounded-xl px-4 py-3 shadow-2xl animate-in slide-in-from-bottom-4">
      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
        <CheckCircle2 size={16} className="text-green-400" />
      </div>
      <div>
        <p className="text-white text-xs font-semibold">Your Report Has Been</p>
        <p className="text-white text-xs font-semibold">Successfully Submitted</p>
      </div>
      <button onClick={onClose} className="ml-2 text-gray-500 hover:text-white"><X size={14} /></button>
    </div>
  );
}

function MassMessageModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [message, setMessage] = useState("Hey lovers!🌺\nJust dropped a new exclusive set.\nCheck it out...");

  const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => {
    setAllSelected(!allSelected);
    setSelected(allSelected ? [] : MASS_CONTACTS.map(c => c.id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#13141e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h3 className="text-white font-semibold text-base">{step === 1 ? "Send Mass Message" : "Mass Message"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
        </div>

        {step === 1 ? (
          <div className="p-5 space-y-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full bg-[#1c1d27] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/40"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAll}
                  className={`w-10 h-5 rounded-full transition-all relative ${allSelected ? "bg-indigo-500" : "bg-gray-700"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${allSelected ? "right-0.5" : "left-0.5"}`} />
                </button>
                <span className="text-gray-400 text-sm">All</span>
              </div>
              <button onClick={toggleAll} className="text-indigo-400 text-sm hover:text-indigo-300">Select all</button>
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {MASS_CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Avatar src={c.avatar} size={9} />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <TierBadge tier={c.tier} color={c.tierColor} />
                    <p className="text-gray-600 text-xs">{c.activeAgo}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${selected.includes(c.id) ? "border-indigo-500 bg-indigo-500" : "border-gray-600"}`}>
                    {selected.includes(c.id) && <Check size={10} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selected.length === 0}
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#1c1d27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/40 resize-none"
            />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2].map(i => (
                <div key={i} className="h-16 bg-[#1c1d27] border border-white/10 rounded-xl flex items-center justify-center text-gray-600">
                  <ImageIcon size={18} />
                </div>
              ))}
              <div className="h-16 bg-[#1c1d27] border border-dashed border-white/20 rounded-xl flex items-center justify-center text-gray-600 cursor-pointer hover:border-white/40 transition-colors">
                <span className="text-2xl text-gray-600">+</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-all">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterMenu({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("Unread");
  const options = ["Unread", "Unanswered", "Oldest", "Newest"];
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-10 z-50 w-36 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {options.map(o => (
          <button
            key={o}
            onClick={() => { setSelected(o); onClose(); }}
            className={`w-full text-left px-3 py-2 text-sm transition-colors ${selected === o ? "text-indigo-400 bg-indigo-500/10" : "text-gray-300 hover:bg-white/5"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CreatorMessage() {
  const [activeContact, setActiveContact] = useState<Contact | null>(CONTACTS[0]);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showContext, setShowContext] = useState<{ x: number; y: number } | null>(null);
  const [showBlock, setShowBlock] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [showMassMessage, setShowMassMessage] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now().toString(), text: input, sender: "me", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), status: "sent" }]);
    setInput("");
  };

  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelectContact = (c: Contact) => {
    setActiveContact(c);
    setMobileView("chat");
  };

  return (
    <div className="flex h-[90vh] font-sans overflow-hidden">
      {/* ── Contact List ─────────────────────────────────────────── */}
      <div className={`flex flex-col w-full md:w-1/3 border-r border-white/8 bg-[#0d0e14] shrink-0
        ${mobileView === "chat" ? "hidden md:flex" : "flex"}`}>
        {/* Header */}
        <div className="px-4 py-4 border-b border-white/8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">Message</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowMassMessage(true)}
                className="w-8 h-8 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 flex items-center justify-center text-indigo-400 transition-colors"
                title="Mass Message"
              >
                <Users size={15} />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#1a1b26] border border-white/8 rounded-xl pl-9 pr-10 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/40 transition-all"
            />
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                style={{ transform: "translateY(calc(-50% - 16px))" }}
              >
                <Filter size={12} />
              </button>
              {showFilter && <FilterMenu onClose={() => setShowFilter(false)} />}
            </div>
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelectContact(c)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/4
                ${activeContact?.id === c.id ? "bg-white/5" : ""}`}
            >
              <Avatar src={c.avatar} size={10} online={c.online} />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-slate-200 text-sm font-normal truncate">{c.name}</span>
                    <TierBadge tier={c.tier} color={c.tierColor} points={c.points} />

                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold `}>
                      <IoIosStar size={15} className=" text-amber-300"/> 30
                    </span>
                  </div>
                  <span className="text-gray-600 text-xs flex-shrink-0 ml-2">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <div>
                    <p className={`${c.unread ? "text-gray-500 text-bold" : "text-gray-300 text-sm"} truncate`}>{c.lastMessage}</p>
                  </div>
                  {c.unread && (
                    <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 ml-1">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat Area ─────────────────────────────────────────────── */}
      <div className={`flex-1 flex flex-col min-w-0
        ${mobileView === "list" ? "hidden md:flex" : "flex"}`}>
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-[#0d0e14]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden text-gray-400 hover:text-white mr-1"
                >
                  <ChevronLeft size={20} />
                </button>
                <Avatar src={activeContact.avatar} size={10} online={activeContact.online} />
                <div>
                  <p className="text-white text-sm font-semibold">{activeContact.name}</p>
                  <p className="text-gray-500 text-xs">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Phone size={15} />
                </button>
                <button
                  onClick={e => setShowContext({ x: e.clientX - 130, y: e.clientY + 10 })}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "them" && (
                    <Avatar src={activeContact.avatar} size={7} />
                  )}
                  <div className={`max-w-[72%] ${msg.sender === "me" ? "ml-3" : "ml-2"}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.sender === "me"
                        ? "bg-indigo-500 text-white rounded-tr-sm"
                        : "bg-[#1a1b26] text-gray-200 rounded-tl-sm border border-white/8"}`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : ""}`}>
                      <span className="text-gray-600 text-[10px]">{msg.time}</span>
                      {msg.sender === "me" && msg.status === "read" && <CheckCheck size={12} className="text-indigo-400" />}
                      {msg.sender === "me" && msg.status === "delivered" && <CheckCheck size={12} className="text-gray-500" />}
                      {msg.sender === "me" && msg.status === "sent" && <Check size={12} className="text-gray-500" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-white/8 bg-[#0d0e14]">
              <div className="flex items-center gap-3 bg-[#1a1b26] border border-white/10 rounded-2xl px-4 py-2.5">
                <button className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0">
                  <Smile size={18} />
                </button>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type a message"
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none min-w-0"
                />
                <button className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0">
                  <Paperclip size={16} />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 flex items-center justify-center text-white transition-all flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1a1b26] border border-white/8 flex items-center justify-center">
              <MessageSquare size={28} className="text-white/20" />
            </div>
            <p className="text-white font-semibold">Select a conversation</p>
            <p className="text-gray-600 text-sm">Choose from your existing contacts to start chatting.</p>
          </div>
        )}
      </div>

      {/* ── Modals & Overlays ─────────────────────────────────────── */}
      {showContext && activeContact && (
        <ContextMenu
          x={showContext.x}
          y={showContext.y}
          onBlock={() => { setShowContext(null); setShowBlock(true); }}
          onReport={() => { setShowContext(null); setShowReport(true); }}
          onClose={() => setShowContext(null)}
        />
      )}

      {showBlock && activeContact && (
        <BlockModal
          contact={activeContact}
          onClose={() => setShowBlock(false)}
          onConfirm={() => setShowBlock(false)}
        />
      )}

      {showReport && (
        <ReportModal
          onClose={() => setShowReport(false)}
          onSubmit={() => { setShowReport(false); setShowReportSuccess(true); }}
        />
      )}

      {showReportSuccess && <ReportSuccessToast onClose={() => setShowReportSuccess(false)} />}

      {showMassMessage && <MassMessageModal onClose={() => setShowMassMessage(false)} />}
    </div>
  );
}