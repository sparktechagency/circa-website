import { useState } from "react";

const BLOCKED_USERS: any[] = [
    { id: 1, name: "Alex Johnson", handle: "@alexj", seed: "alex1" },
    { id: 2, name: "Maria Garcia", handle: "@mgarcia", seed: "maria1" },
    { id: 3, name: "James Smith", handle: "@jsmith", seed: "james1" },
];


function BlockList() {
    const [list, setList] = useState(BLOCKED_USERS);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {list.length === 0 && (
                <p style={{ color: "#6b7280", textAlign: "center", padding: 40 }}>No blocked users</p>
            )}
            {list.map(u => (
                <div key={u.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "#13141f", borderRadius: 14, padding: "12px 16px", gap: 10,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img
                            src={`https://api.dicebear.com/7.x/personas/svg?seed=${u?.seed ?? "robert"}`}
                            alt=""
                            style={{
                                width: 42, height: 42, borderRadius: "50%",
                                objectFit: "cover", flexShrink: 0,
                                background: "#1a1b2e",
                            }}
                        />
                        <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                            <div style={{ color: "#6b7280", fontSize: 12 }}>{u.handle}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setList(l => l.filter(x => x.id !== u.id))}
                        style={{
                            background: "#ef444415", color: "#ef4444", border: "none",
                            borderRadius: 8, padding: "6px 14px", fontSize: 12,
                            fontWeight: 600, cursor: "pointer", flexShrink: 0,
                        }}
                    >Unblock</button>
                </div>
            ))}
        </div>
    );
}