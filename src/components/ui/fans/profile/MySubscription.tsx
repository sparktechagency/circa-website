import { Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";

// ── Static data ────────────────────────────────────────────────────────────────
const SUBS: any[] = [
  { id: 1, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Active",  seed: "cam1" },
  { id: 2, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Active",  seed: "cam2" },
  { id: 3, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Active",  seed: "cam3" },
  { id: 4, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Expired", seed: "cam4" },
  { id: 5, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Active",  seed: "cam5" },
  { id: 6, name: "Cameron", exp: "11 Oct, 2025", tier: "Diamond", price: "$9.99", status: "Active",  seed: "cam6" },
  { id: 7, name: "Cameron", exp: "11 Oct, 2025", tier: "Diamond", price: "$9.99", status: "Expired", seed: "cam7" },
  { id: 8, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety",  price: "$4.99", status: "Active",  seed: "cam8" },
];

const FEATURES = ["Follow to updates", "See all post", "New feature unlock", "See all post", "Follow to updates"];


export default function MySubscription() {
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (sub: any) => {
    setSelected(sub);
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SUBS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => handleOpen(sub)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#13141f",
              border: "none",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              <img
                src={`https://api.dicebear.com/7.x/personas/svg?seed=${sub.seed}`}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#1a1b2e",
                }}
              />
              <div>
                <div style={{ color: "#fff" }}>{sub.name}</div>
                <div style={{ color: "#aaa", fontSize: 13 }}>
                  Exp: {sub.exp}
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: "#e879a0" }}>{sub.tier}</div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>
                {sub.price}
              </div>
            </div>

            <div
              style={{
                color:
                  sub.status === "Active" ? "#22c55e" : "#ef4444",
              }}
            >
              {sub.status}
            </div>
          </button>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#13141f] border-none max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              Subscription Detail
            </DialogTitle>
          </DialogHeader>

          <SubscriptionDetail sub={selected} />
        </DialogContent>
      </Dialog>
    </>
  );
}


function SubscriptionDetail({ sub }: { sub: any | null }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#13141f", borderRadius: 18, padding: 20 }}>

                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        flexWrap: "wrap",
                        gap: 10,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>                    
                        <img
                            src={`https://api.dicebear.com/7.x/personas/svg?seed=${sub?.seed ?? "robert"}`}
                            alt=""
                            style={{
                                width: 50, height: 50, borderRadius: "50%",
                                objectFit: "cover", flexShrink: 0,                                
                                background: "#1a1b2e",
                            }}
                        />
                        <div>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                                {sub?.name ?? "Robert Fox"}
                            </div>
                            <div style={{ color: "#6b7280", fontSize: 13 }}>
                                11 Oct, 2025
                            </div>
                        </div>
                    </div>

                    {/* STATIC STATUS */}
                    <span
                        style={{
                            background: "#16a34a20",
                            color: "#22c55e",
                            borderRadius: 8,
                            padding: "4px 12px",
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        Active
                    </span>
                </div>

                {/* STATIC PLAN */}
                <div
                    style={{
                        color: "#8b7cf8",
                        fontWeight: 700,
                        fontSize: 16,
                        marginBottom: 6,
                    }}
                >
                    Diamond Plan
                </div>

                <div style={{ marginBottom: 8 }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 26 }}>
                        $4.99
                    </span>
                    <span style={{ color: "#6b7280", fontSize: 14 }}> /m</span>
                </div>

                {/* STATIC INFO */}
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 4 }}>
                    Follow along for public updates
                </div>
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 2 }}>
                    Purchase Date: 17/1/2026
                </div>
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>
                    Expired Date: 17/2/2026
                </div>

                {/* FEATURES */}
                <div
                    style={{
                        borderTop: "1px solid #ffffff10",
                        paddingTop: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            style={{ display: "flex", alignItems: "center", gap: 12 }}
                        >
                            <div
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "#22c55e",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Check size={12} color="#fff" strokeWidth={3} />
                            </div>
                            <span style={{ color: "#e5e7eb", fontSize: 14 }}>{f}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}