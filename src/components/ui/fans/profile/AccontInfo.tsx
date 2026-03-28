import { Camera } from "lucide-react";
import { useState } from "react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
      {children}
    </div>
  );
}

function InputField({
  label, value, onChange, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 6 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", background: "#1a1b2e",
          border: "1px solid #ffffff0a",
          borderRadius: 10, padding: "12px 14px", color: "#e5e7eb",
          fontSize: 14, fontFamily: "inherit", boxSizing: "border-box",
          outline: "none",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = `#1a1b260`)}
        onBlur={e => (e.currentTarget.style.borderColor = "#ffffff0a")}
      />
    </div>
  );
}


function Avatar({ src, size = 44, ring = false }: { src: string; size?: number; ring?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        width: size, height: size, borderRadius: "50%",
        objectFit: "cover", flexShrink: 0,
        border: ring ? `2.5px solid #8b7cf8` : "none",
        background: "#1a1b2e",
      }}
    />
  );
}

// ── Shared ─────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 52, height: 28, borderRadius: 999,
        background: value ? "#8b7cf8" : "#1a1b2e",
        position: "relative", flexShrink: 0,
        border: "none", cursor: "pointer", transition: "background .2s",
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 4,
        left: value ? 28 : 4,
        transition: "left .2s",
        boxShadow: "0 1px 4px #0005",
      }} />
    </button>
  );
}

export default function AccountInfo() {
    
  const [form, setForm] = useState({
    name: "Jhon Lura", email: "jhon@mail.com",
    contact: "+38947 39847", gender: "Female", contact2: "+38947 39847",
  });
  const [notifs, setNotifs] = useState({ msg: true, call: true, sales: true, gifts: true });

  const notifRows: { key: keyof any; label: string }[] = [
    { key: "msg",   label: "New Message"    },
    { key: "call",  label: "Incoming Call"  },
    { key: "sales", label: "Shop Sales"     },
    { key: "gifts", label: "Received Gifts" },
  ];

  return (
    <div>
      {/* Avatar with camera button */}
      <div style={{ position: "relative", width: 100, marginBottom: 28 }}>
        <Avatar
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face"
          size={100}
          ring
        />
        <button style={{
          position: "absolute", bottom: 4, right: 2,
          background: "#8b7cf8", border: "none", borderRadius: "50%",
          width: 30, height: 30, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
        }}>
          <Camera size={13} color="#fff" />
        </button>
      </div>

      <SectionTitle>Personal Information</SectionTitle>

      {/* Name + Email */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <InputField label="Name"  value={form.name}  onChange={v => setForm(f => ({ ...f, name: v }))} />
        <InputField label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" />
      </div>

      {/* Contact + Gender */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <InputField label="Contact" value={form.contact} onChange={v => setForm(f => ({ ...f, contact: v }))} />
        <InputField label="Gender"  value={form.gender}  onChange={v => setForm(f => ({ ...f, gender: v }))} />
      </div>

      {/* Contact full-width */}
      <div style={{ marginBottom: 28 }}>
        <InputField label="Contact" value={form.contact2} onChange={v => setForm(f => ({ ...f, contact2: v }))} />
      </div>

      <SectionTitle>Notification</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {notifRows.map(({ key, label }:any) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#1a1b2e", borderRadius: 12, padding: "14px 16px",
          }}>
            <span style={{ color: "#e5e7eb", fontSize: 14 }}>{label}</span>
            {/* @ts-ignore */}
            <Toggle value={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
                
          </div>
        ))}
      </div>

      <button style={{
        width: "100%", background: "#8b7cf8", border: "none",
        borderRadius: 14, padding: "16px", color: "#fff",
        fontSize: 15, fontWeight: 600, cursor: "pointer",
      }}>
        Save Changes
      </button>
    </div>
  );
}