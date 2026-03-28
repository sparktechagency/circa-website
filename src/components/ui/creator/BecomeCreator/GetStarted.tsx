import React from 'react'

const GetStarted = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
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
              onClick={onGetStarted}
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
  )
}

export default GetStarted