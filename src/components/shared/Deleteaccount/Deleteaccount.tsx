"use client";
import { useState } from "react";

// Eye icons
const EyeOffIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
  </svg>
);
const EyeIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

// ─── Modal overlay ────────────────────────────────────────────────────────────
function Modal({ children, onClose }:any) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#13141f", borderRadius: 16, padding: "28px 24px",
          width: 320, border: "1px solid #252638",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Confirm Dialog (Account Delete) ─────────────────────────────────────────
function ConfirmDeleteModal({ onClose, onConfirm }:any) {
  return (
    <Modal onClose={onClose}>
      <p style={{ color: "#e05555", fontWeight: 700, fontSize: 16, textAlign: "center", margin: "0 0 12px" }}>
        Account Delete
      </p>
      <p style={{ color: "#ccc", fontSize: 14, textAlign: "center", lineHeight: 1.6, margin: "0 0 24px" }}>
        Are you sure you want to Delete this Account?
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={btnOutline}>Cancel</button>
        <button onClick={onConfirm} style={btnDanger}>Confirm</button>
      </div>
    </Modal>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────
function DeletedScreen() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 16, paddingTop: 60,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "#e0555515", border: "2px solid #e05555",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
      }}>🗑️</div>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: 0 }}>Account Deleted</p>
      <p style={{ color: "#888", fontSize: 14, textAlign: "center", maxWidth: 260, margin: 0, lineHeight: 1.6 }}>
        Your account and all associated data have been permanently removed.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "confirm" | "done"

  const handleConfirmClick = () => {
    if (!password) return;
    setStep("confirm");
  };

  if (step === "done") return <DeletedScreen />;

  return (
    <div className="h-full w-full p-4 rounded-2xl">
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Warning card */}
        <div style={{
          background: "#1a0f0f", border: "1px solid #e0555530",
          borderRadius: 10, padding: "16px 18px",
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ color: "#e05555", fontWeight: 600, fontSize: 13, margin: "0 0 6px" }}>
              Permanent Action
            </p>
            <p style={{ color: "#c07070", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
              This action will delete your all plans and permanently erase your all data.
              You <strong>cannot</strong> undo this action.
            </p>
          </div>
        </div>

        {/* What will be deleted */}
        <div style={{ background: "#1a1b2e", borderRadius: 10, padding: "16px 18px", border: "1px solid #2a2b40" }}>
          <p style={{ color: "#8183b0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
            What will be deleted
          </p>
          {[
            "Your profile and all personal data",
            "All posts, photos, and uploaded content",
            "Active memberships and plans",
            "Order history and transaction records",
            "All followers and subscriptions",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 4 ? 10 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e05555", flexShrink: 0 }} />
              <span style={{ color: "#bbb", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Password entry */}
        <div>
          <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6, margin: "0 0 14px" }}>
            If you are sure you want to proceed, enter your password below.
          </p>
          <label style={{ color: "#8183b0", fontSize: 12, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Enter Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Your current password"
              style={{
                width: "100%", background: "#1a1b2e",
                border: `1px solid ${focused ? "#e05555" : "#2a2b40"}`,
                borderRadius: 8, padding: "12px 42px 12px 14px",
                color: "#fff", fontSize: 14, outline: "none",
                boxSizing: "border-box", transition: "border-color 0.2s",
              }}
            />
            <button
              onClick={() => setShowPw(s => !s)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#666",
                display: "flex", alignItems: "center",
              }}
            >
              {showPw ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirmClick}
          style={{
            width: "100%", background: password ? "#e05555" : "#3a2020",
            border: "none", borderRadius: 10,
            color: password ? "#fff" : "#7a4040",
            fontWeight: 600, fontSize: 14, padding: "13px 0",
            cursor: password ? "pointer" : "not-allowed",
            transition: "background 0.25s, color 0.25s",
          }}
        >
          Delete My Account
        </button>
      </div>

      {/* Confirm modal */}
      {step === "confirm" && (
        <ConfirmDeleteModal
          onClose={() => setStep("form")}
          onConfirm={() => setStep("done")}
        />
      )}
    </div>
  );
}

// Button styles
const btnOutline = {
  flex: 1, background: "transparent", border: "1px solid #3a3b55",
  borderRadius: 10, color: "#fff", fontWeight: 600, fontSize: 14,
  padding: "11px 0", cursor: "pointer",
};
const btnDanger = {
  flex: 1, background: "#e05555", border: "none",
  borderRadius: 10, color: "#fff", fontWeight: 600, fontSize: 14,
  padding: "11px 0", cursor: "pointer",
};