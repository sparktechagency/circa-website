import React, { useState } from 'react'

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


const Vive = ({ onVibeComplete }: { onVibeComplete: () => void }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [friendsMode, setFriendsMode] = useState(true);
    const [selectedTag, setSelectedTag] = useState("Friends");

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };


    return (
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
                onClick={onVibeComplete}
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
    )
}

export default Vive