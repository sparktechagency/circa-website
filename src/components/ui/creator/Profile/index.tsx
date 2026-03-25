"use client";

import { useState } from "react";

type Step = "landing" | "vibe" | "verify" | "submitted";

const CATEGORIES = [
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "cooking", label: "Cooking", emoji: "🍳" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "fashion", label: "Fashion", emoji: "👗" },
];

const SOCIAL_TAGS = ["Friends", "Flirty", "Passionate"];

export default function BecomeCreatorPage() {
  const [step, setStep] = useState<Step>("landing");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [friendsMode, setFriendsMode] = useState(true);
  const [selectedTag, setSelectedTag] = useState("Friends");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center font-sans px-4 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
        .fade-in { animation: fadeIn 0.45s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .cat-card { transition: all 0.2s ease; }
        .cat-card:hover { transform: translateY(-2px); }
        .cat-card.selected { background: #2a2060 !important; border-color: #7c6ef5 !important; }
        input:focus, textarea:focus { outline: none; border-color: #7c6ef5 !important; }
        .toggle-track { transition: background 0.2s; }
        .tag-pill { transition: all 0.15s ease; cursor: pointer; }
        .tag-pill.active { background: #9d86f5; color: #fff; border-color: #9d86f5; }
        .btn-primary { transition: all 0.2s ease; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="w-full max-w-sm">

        {/* ── STEP 1: Landing ── */}
        {step === "landing" && (
          <div className="fade-in flex flex-col items-center text-center gap-6 py-16">
            {/* App icon */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 22,
                background: "linear-gradient(145deg, #a89af5, #7155e8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(113,85,232,0.45)",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path
                  d="M21 8C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13"
                  stroke="#fff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path d="M34 8l-4 4 4 4" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#a89af5", marginBottom: 10 }}>
                Become a Creator
              </h1>
              <p style={{ color: "#8a8a9a", fontSize: 15, lineHeight: 1.6 }}>
                Share your content, connect with fans,<br />and earn from your creativity.
              </p>
            </div>

            <button
              className="btn-primary"
              onClick={() => setStep("vibe")}
              style={{
                width: "100%",
                padding: "17px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #9d86f5, #7155e8)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                marginTop: 32,
                boxShadow: "0 6px 24px rgba(113,85,232,0.38)",
              }}
            >
              Get Started
            </button>
          </div>
        )}

        {/* ── STEP 2: Vibe ── */}
        {step === "vibe" && (
          <div className="fade-in" style={{ color: "#fff" }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>What's Your Vibe?</h1>
            <p style={{ color: "#8a8a9a", fontSize: 14, marginBottom: 24 }}>You can select multiple categories.</p>

            {/* Category grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-card${selectedCategories.includes(cat.id) ? " selected" : ""}`}
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    background: "#18181f",
                    border: "1.5px solid #2a2a36",
                    borderRadius: 16,
                    padding: "20px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                  <span style={{ color: "#d4d4e8", fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Permission toggle */}
            <div
              style={{
                background: "#18181f",
                borderRadius: 14,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "#c8c8d8", fontSize: 14 }}>Enable Friends &amp; Flirting Mode</span>
              <button
                onClick={() => setFriendsMode((v) => !v)}
                className="toggle-track"
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 999,
                  background: friendsMode ? "#7c6ef5" : "#3a3a4a",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: friendsMode ? 25 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>

            {/* Categories label */}
            <div style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Categories</h3>
              <p style={{ color: "#8a8a9a", fontSize: 13, marginBottom: 14 }}>
                For users who want to chat, flirt, and make new connections—casual, fun, and respectful
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {SOCIAL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-pill${selectedTag === tag ? " active" : ""}`}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 999,
                      border: "1.5px solid #3a3a4a",
                      background: "transparent",
                      color: "#c8c8d8",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => setStep("verify")}
              style={{
                width: "100%",
                padding: "17px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #9d86f5, #7155e8)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                marginTop: 16,
                boxShadow: "0 6px 24px rgba(113,85,232,0.38)",
              }}
            >
              Confirm
            </button>
          </div>
        )}

        {/* ── STEP 3: Verify ── */}
        {step === "verify" && (
          <div className="fade-in" style={{ color: "#fff" }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Get Verified</h1>

            {/* Avatar upload */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
              <div style={{ position: "relative", width: 100, height: 100 }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #7c6ef5",
                    background: "#18181f",
                  }}
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
                      </svg>
                    </div>
                  )}
                </div>
                <label
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#7c6ef5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                </label>
              </div>
            </div>

            {/* Fields */}
            {[
              { label: "User Name", value: username, setter: setUsername, type: "text", placeholder: "" },
              { label: "Date of birth", value: dob, setter: setDob, type: "date", placeholder: "" },
            ].map(({ label, value, setter, type }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 14, color: "#c8c8d8", fontWeight: 500, display: "block", marginBottom: 8 }}>{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#18181f",
                    border: "1.5px solid #2a2a36",
                    color: "#fff",
                    fontSize: 14,
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 14, color: "#c8c8d8", fontWeight: 500, display: "block", marginBottom: 8 }}>Short Bio</label>
              <div style={{ position: "relative" }}>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 150))}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#18181f",
                    border: "1.5px solid #2a2a36",
                    color: "#fff",
                    fontSize: 14,
                    resize: "none",
                  }}
                />
                <span style={{ position: "absolute", bottom: 10, right: 12, color: "#666", fontSize: 12 }}>{bio.length}/150</span>
              </div>
            </div>

            {/* Upload sample content */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 14, color: "#c8c8d8", fontWeight: 500, display: "block", marginBottom: 10 }}>Upload Sample Content</label>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "28px 16px",
                  borderRadius: 12,
                  border: "2px dashed #2e2e3e",
                  background: "#12121a",
                  cursor: "pointer",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c6ef5" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="m21 15-5-5L5 21"/>
                </svg>
                <span style={{ color: "#c8c8d8", fontSize: 14 }}>Tap to browse</span>
                <span style={{ color: "#666", fontSize: 12 }}>Image, Video or Audio</span>
                <input type="file" accept="image/*,video/*,audio/*" style={{ display: "none" }} />
              </label>
            </div>

            <button
              className="btn-primary"
              onClick={() => setStep("submitted")}
              style={{
                width: "100%",
                padding: "17px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #9d86f5, #7155e8)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(113,85,232,0.38)",
              }}
            >
              Confirm
            </button>
          </div>
        )}

        {/* ── STEP 4: Submitted ── */}
        {step === "submitted" && (
          <div className="fade-in" style={{ color: "#fff", textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #a89af5, #7155e8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                boxShadow: "0 8px 36px rgba(113,85,232,0.45)",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#a89af5", marginBottom: 12 }}>Application Submitted!</h1>
            <p style={{ color: "#8a8a9a", fontSize: 15, lineHeight: 1.7 }}>
              Thanks for applying to be a creator on Circa.<br />
              Our team is currently reviewing your details.
            </p>

            {/* Notification bar */}
            <div
              style={{
                marginTop: 40,
                background: "#18181f",
                borderRadius: 14,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a9a" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{ color: "#8a8a9a", fontSize: 13 }}>
                We will send a notification to your email once your profile is approved
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}