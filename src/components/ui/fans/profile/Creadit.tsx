import { Gem, Heart, Star, Trophy, Play } from "lucide-react";
import { useState } from "react";

const CREDIT_PACKS: any[] = [
  { credits: 50, original: "$25.00", save: "50%", final: "$25.00", icon: <Heart size={24} fill="#e879a0" color="#e879a0" />, iconBg: "#e879a015" },
  { credits: 100, original: "$25.00", save: "50%", final: "$75.00", icon: <Star size={24} fill="#f59e0b" color="#f59e0b" />, iconBg: "#f59e0b15", popular: true },
  { credits: 250, original: "$25.00", save: "50%", final: "$25.00", icon: <Gem size={24} color="#8b7cf8" />, iconBg: "#8b7cf815" },
  { credits: 500, original: "$25.00", save: "50%", final: "$25.00", icon: <Trophy size={24} color="#f97316" />, iconBg: "#f9731615" },
  { credits: 250, original: "$25.00", save: "50%", final: "$25.00", icon: <Gem size={24} color="#8b7cf8" />, iconBg: "#8b7cf815" },
  { credits: 50, original: "$25.00", save: "50%", final: "$25.00", icon: <Heart size={24} fill="#e879a0" color="#e879a0" />, iconBg: "#e879a015" },
];

export default function Credits() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <div style={{ paddingBottom: 100 }}>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ color: "#9ca3af", fontSize: 20 }}>
          1 Credits = $0.50 USD
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "#1a1b2e",
            borderRadius: 20,
            padding: "6px 14px",
            border: "1px solid #f59e0b40",
          }}
        >
          <Star size={14} color="#f59e0b" fill="#f59e0b" />
          <span style={{ color: "#f59e0b", fontSize: 16 }}>
            120 Credits
          </span>
        </div>
      </div>

      {/* Banner */}
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          marginBottom: 24,
          position: "relative",
          background:
            "linear-gradient(135deg, #1a1040 0%, #0d0820 50%, #1a0d30 100%)",
          minHeight: 148,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, #4c1d9530 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 50,
            bottom: -30,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "radial-gradient(circle, #8b7cf825 0%, transparent 65%)",
          }}
        />

        <div style={{ padding: "22px 24px" }}>
          <div
            style={{
              display: "inline-flex",
              background: "#8b7cf8",
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 14,
              color: "#fff",
              marginBottom: 50,
            }}
          >
            🔥 One Time Offer
          </div>

          <div style={{ color: "#fff", fontSize: 20 }}>
            First Purchase
          </div>

          <div
            style={{
              color: "#f59e0b",
              fontWeight: 600,
              fontSize: 30,
              marginBottom: 6,
            }}
          >
            50% OFF
          </div>

          <div style={{ color: "#9ca3af", fontSize: 14 }}>
            Grab your offer at any branch of your choice
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{ color: "#fff", fontSize: 20, marginBottom: 18 }}>
        Select a package
      </div>
      <div       
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
      >
        {CREDIT_PACKS.map((pack, i) => {
          const isSelected = selected === i;

          return (
            <div key={i} style={{ position: "relative" }}>
              {pack.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -13,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#f59e0b",
                    color: "#000",
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: 10,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    zIndex: 2,
                  }}
                >
                  Most Popular
                </div>
              )}

              <button
                onClick={() => setSelected(i)}
                style={{
                  width: "100%",
                  background: "#13141f",
                  border: `2px solid ${isSelected ? "#f59e0b" : "transparent"}`,
                  borderRadius: 14,
                  padding: "14px 10px",
                  cursor: "pointer",                  
                  textAlign: "left",
                  outline: "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    background: pack.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 50,
                  }}
                >
                  {pack.icon}
                </div>

                {/* Credits number */}
                <div
                  style={{
                    color: isSelected ? "#f59e0b" : "#fff",
                    fontWeight: 600,
                    fontSize: 26,
                    lineHeight: 1,
                    marginBottom: 2,
                  }}
                >
                  {pack.credits}
                </div>

                <div style={{ color: "#afafaf", fontSize: 14, marginBottom: 10 }}>
                  Credits
                </div>

                <div style={{ borderTop: "1px solid #ffffff08", marginBottom: 8 }} />

                {/* Original price */}
                <div style={{ color: "#6b7280", fontSize: 14, textDecoration: "line-through" }}>
                  {pack.original}
                </div>

                {/* Final price */}
                <div
                  style={{
                    color: isSelected ? "#f59e0b" : "#fff",                    
                    fontSize: 18,
                    marginBottom: 6,
                  }}
                >
                  {pack.final}
                </div>

                {/* Save badge */}
                <div
                  style={{
                    display: "inline-block",
                    background: isSelected ? "#16a34a20" : "#16a34a20",
                    color: "#22c55e",
                    borderRadius: 25,
                    padding: "6px 15px",
                    fontSize: 12,                    
                  }}
                >
                  Save {pack.save}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Watch Ads Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#13141f",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: 14,
          padding: "20px 14px",
          marginBottom: 24,
          marginTop: 40,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#8b7cf820",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Play color="#60A5F9" fill="#60A5F9" />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>
              Watch Ads & Earn Coins
            </div>
            <div style={{ color: "#afafaf", fontSize: 15 }}>
              Get 5 free coins instantly
            </div>
          </div>
        </div>

        <button
          style={{
            border: "1px solid #8b7cf8",
            borderRadius: 8,
            padding: "7px 16px",
            color: "#8b7cf8",
            background: "transparent",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Watch Ad
        </button>
      </div>

      {/* Sticky Buy CTA */}
      
        <button
          style={{
            width: "100%",
            background: "#8b7cf8",
            border: "none",
            borderRadius: 14,
            padding: "17px",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Buy Coins
        </button>
        <div style={{ color: "#afafaf", fontSize: 13, textAlign: "center", marginTop: 8 }}>
          Coins are universal across all creators
        </div>      
    </div>
  );
}