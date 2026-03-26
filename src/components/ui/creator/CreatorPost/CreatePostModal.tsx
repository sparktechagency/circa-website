"use client";

import { useState, useRef, useCallback } from "react";
import { X, Image as ImageIcon, Globe, Star, Crown, Upload } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (post: PostFormData) => void;
}

export interface PostFormData {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageFile: File | null;
  visibility: "everyone" | "subscribers" | "gold";
  onlyMe: boolean;
  hideLikes: boolean;
  hideComments: boolean;
  nsfw: boolean;
  createdAt: string;
  scheduled?: string;
}

const visibilityOptions = [
  {
    value: "everyone",
    label: "Everyone",
    sub: "All fans",
    icon: <Globe size={16} className="text-blue-400" />,
    bg: "bg-blue-500/20",
  },
  {
    value: "subscribers",
    label: "Subscribers Only",
    sub: "All fans",
    icon: <Star size={16} className="text-yellow-400" />,
    bg: "bg-yellow-500/20",
  },
  {
    value: "gold",
    label: "Gold Tires",
    sub: "All fans",
    icon: <Crown size={16} className="text-orange-400" />,
    bg: "bg-orange-500/20",
  },
] as const;

export default function CreatePostModal({ isOpen, onClose, onPublish }: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<"everyone" | "subscribers" | "gold">("everyone");
  const [onlyMe, setOnlyMe] = useState(true);
  const [hideLikes, setHideLikes] = useState(false);
  const [hideComments, setHideComments] = useState(false);
  const [nsfw, setNsfw] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handlePublish = (scheduled?: string) => {
    const post: PostFormData = {
      id: Date.now().toString(),
      title,
      description,
      image,
      imageFile,
      visibility,
      onlyMe,
      hideLikes,
      hideComments,
      nsfw,
      createdAt: new Date().toISOString(),
      scheduled,
    };
    onPublish(post);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setImageFile(null);
    setVisibility("everyone");
    setOnlyMe(true);
    setHideLikes(false);
    setHideComments(false);
    setNsfw(true);
    setShowSchedule(false);
    setScheduleDate("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#12131a] border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#12131a] border-b border-white/10">
          <h2 className="text-white font-semibold text-lg tracking-tight">Create Post</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full bg-[#1c1d27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              rows={5}
              className="w-full bg-[#1c1d27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
            />
          </div>

          {/* Upload Picture */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Upload Picture</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden
                ${dragOver ? "border-indigo-500 bg-indigo-500/10" : "border-white/20 hover:border-white/40 bg-[#1c1d27]"}`}
            >
              {image ? (
                <div className="relative">
                  <img src={image} alt="Preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Click to change</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImage(null); setImageFile(null); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <ImageIcon size={20} className="text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">Upload digital file</p>
                    <p className="text-gray-500 text-xs mt-0.5">Support Image, video</p>
                    <p className="text-gray-500 text-xs">(Max 500 mb)</p>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* Who can see this */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Who can see this?</label>
            <div className="space-y-2">
              {visibilityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setVisibility(opt.value as typeof visibility)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                    ${visibility === opt.value
                      ? "border-indigo-500/50 bg-indigo-500/10"
                      : "border-white/8 bg-[#1c1d27] hover:border-white/20"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${opt.bg}`}>
                      {opt.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{opt.label}</p>
                      <p className="text-gray-500 text-xs">{opt.sub}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${visibility === opt.value ? "border-indigo-500 bg-indigo-500" : "border-gray-600"}`}>
                    {visibility === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Post Engagement Visibility */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-medium">Post Engagement Visibility</label>
            <div className="space-y-2">
              {[
                { label: "Only me", value: onlyMe, setter: setOnlyMe },
                { label: "Hide likes from Fans", value: hideLikes, setter: setHideLikes },
                { label: "Hide comment from Fans", value: hideComments, setter: setHideComments },
              ].map(({ label, value, setter }) => (
                <button
                  key={label}
                  onClick={() => setter(!value)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1c1d27] border border-white/8 hover:border-white/20 transition-all"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0
                    ${value ? "bg-indigo-500 border-indigo-500" : "border-gray-600 bg-transparent"}`}>
                    {value && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm">{label}</span>
                </button>
              ))}

              {/* NSFW */}
              <button
                onClick={() => setNsfw(!nsfw)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1c1d27] border border-white/8 hover:border-white/20 transition-all"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0
                  ${nsfw ? "bg-indigo-500 border-indigo-500" : "border-gray-600 bg-transparent"}`}>
                  {nsfw && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-white text-sm">18+ NSFW Content</span>
                <span className="ml-auto text-xs text-red-400 font-semibold bg-red-400/10 px-2 py-0.5 rounded-full">18+</span>
              </button>
            </div>
          </div>

          {/* Schedule (optional expand) */}
          {showSchedule && (
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-medium">Schedule Date & Time</label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full bg-[#1c1d27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-all [color-scheme:dark]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-1 pb-2">
            <button
              onClick={() => {
                if (showSchedule && scheduleDate) {
                  handlePublish(scheduleDate);
                } else {
                  setShowSchedule(true);
                }
              }}
              className="w-full py-3.5 rounded-xl border border-indigo-500/50 text-indigo-300 font-semibold text-sm hover:bg-indigo-500/10 transition-all tracking-wide"
            >
              {showSchedule ? (scheduleDate ? "Confirm Schedule" : "Pick a date above") : "Schedule Post"}
            </button>
            <button
              onClick={() => handlePublish()}
              disabled={!title.trim()}
              className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all tracking-wide shadow-lg shadow-indigo-500/25"
            >
              Published
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}