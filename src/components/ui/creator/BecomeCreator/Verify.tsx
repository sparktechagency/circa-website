import React, { useState } from 'react'

const Verify = ({ onVerifyComplete }: { onVerifyComplete: () => void }) => {
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [bio, setBio] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarPreview(url);
        }
    };

    return (
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
                                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
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
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
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
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                    </svg>
                    <span style={{ color: "#c8c8d8", fontSize: 14 }}>Tap to browse</span>
                    <span style={{ color: "#666", fontSize: 12 }}>Image, Video or Audio</span>
                    <input type="file" accept="image/*,video/*,audio/*" style={{ display: "none" }} />
                </label>
            </div>

            <button
                className="btn-primary"
                onClick={onVerifyComplete}
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
    )
}

export default Verify