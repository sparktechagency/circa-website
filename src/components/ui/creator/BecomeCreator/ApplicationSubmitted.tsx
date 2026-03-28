import React from 'react'

const ApplicationSubmitted = () => {
  return (
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

            <h1 style={{ fontSize: 30, fontWeight: 500, color: "#a89af5", marginBottom: 12 }}>Application Submitted!</h1>
            <p style={{ color: "#8a8a9a", fontSize: 20, lineHeight: 1.7 }}>
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
                justifyContent: "center",
                gap: 7,
                textAlign: "left",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a9a" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{ color: "#8a8a9a", fontSize: 16, textAlign: "center" }}>
                We will send a notification to your email once your profile is approved
              </span>
            </div>
          </div>
  )
}

export default ApplicationSubmitted