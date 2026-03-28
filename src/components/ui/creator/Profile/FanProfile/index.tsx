"use client";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, CreditCard, ShoppingBag,
  Lock, Ban, Settings, Camera, Check, Bell, Phone,
  User, Star,
} from "lucide-react";

// ── Palette ────────────────────────────────────────────────────────────────────
const BG       = "#0b0c13";
const SURFACE  = "#13141f";
const SURFACE2 = "#1a1b2e";
const ACCENT   = "#8b7cf8";
const GREEN    = "#22c55e";
const RED      = "#ef4444";
const PINK     = "#e879a0";
const GOLD     = "#f59e0b";

// ── Types ──────────────────────────────────────────────────────────────────────
type PageId =
  | "main"
  | "edit-profile"
  | "my-subscription"
  | "sub-detail"
  | "credits"
  | "order-history"
  | "change-password"
  | "block-list"
  | "settings";

interface Subscription {
  id: number;
  name: string;
  exp: string;
  tier: string;
  price: string;
  status: "Active" | "Expired";
  seed: string;
}

interface Order {
  id: string;
  item: string;
  date: string;
  amount: string;
  status: "Completed" | "Refunded";
}

interface BlockedUser {
  id: number;
  name: string;
  handle: string;
  seed: string;
}

interface CreditPack {
  amount: number;
  original: string;
  save: string;
  final: string;
}

// ── Shared components ──────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 48, height: 26, borderRadius: 999,
        background: value ? ACCENT : SURFACE2,
        position: "relative", flexShrink: 0,
        border: "none", cursor: "pointer", transition: "background .2s",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 4,
        left: value ? 26 : 4,
        transition: "left .2s",
        boxShadow: "0 1px 4px #0005",
      }} />
    </button>
  );
}

function Avatar({ src, size = 44, ring = false }: { src: string; size?: number; ring?: boolean }) {
  return (
    <img src={src} alt=""
      style={{
        width: size, height: size, borderRadius: "50%",
        objectFit: "cover", flexShrink: 0,
        border: ring ? `2px solid ${ACCENT}` : "none",
        background: SURFACE2,
      }}
    />
  );
}

function MenuRow({
  icon, label, onClick, right,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  right?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 18px", borderRadius: 14,
        background: SURFACE, border: "none", cursor: "pointer",
        marginBottom: 8, transition: "background .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = SURFACE2)}
      onMouseLeave={e => (e.currentTarget.style.background = SURFACE)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ color: ACCENT }}>{icon}</span>
        <span style={{ color: "#e5e7eb", fontSize: 15, fontFamily: "inherit" }}>{label}</span>
      </div>
      {right ?? <ChevronRight size={15} color="#4b5563" />}
    </button>
  );
}

function CreditPackRow({ c }: { c: CreditPack }) {
  return (
    <button style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: SURFACE, border: "none", borderRadius: 14,
      padding: "14px 18px", cursor: "pointer", width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: SURFACE2,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Star size={20} color={GOLD} fill={GOLD} />
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{c.amount}</div>
          <div style={{ color: "#6b7280", fontSize: 12 }}>Credits</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ color: "#6b7280", fontSize: 12, textDecoration: "line-through" }}>{c.original}</span>
          <span style={{
            background: "#16a34a20", color: GREEN, borderRadius: 6,
            padding: "2px 6px", fontSize: 10, fontWeight: 700,
          }}>Save {c.save}</span>
        </div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>{c.final}</div>
      </div>
    </button>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const SUBS: Subscription[] = [
  { id: 1, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam1" },
  { id: 2, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam2" },
  { id: 3, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam3" },
  { id: 4, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Expired", seed: "cam4" },
  { id: 5, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam5" },
  { id: 6, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam6" },
  { id: 7, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Expired", seed: "cam7" },
  { id: 8, name: "Cameron", exp: "11 Oct, 2025", tier: "Sweety", price: "$4.99", status: "Active",  seed: "cam8" },
];

const ORDERS: Order[] = [
  { id: "#ORD-001", item: "Diamond Plan – Cameron", date: "17 Jan 2026", amount: "$4.99",  status: "Completed" },
  { id: "#ORD-002", item: "50 Credits",             date: "10 Jan 2026", amount: "$12.50", status: "Completed" },
  { id: "#ORD-003", item: "Sweety Plan – Alex",     date: "5 Jan 2026",  amount: "$2.99",  status: "Refunded"  },
];

const BLOCKED_USERS: BlockedUser[] = [
  { id: 1, name: "Alex Johnson", handle: "@alexj",   seed: "alex1"  },
  { id: 2, name: "Maria Garcia", handle: "@mgarcia", seed: "maria1" },
  { id: 3, name: "James Smith",  handle: "@jsmith",  seed: "james1" },
];

const CREDIT_PACKS: CreditPack[] = [
  { amount: 50,  original: "$25.00", save: "50%", final: "$12.50" },
  { amount: 100, original: "$40.00", save: "30%", final: "$28.00" },
  { amount: 200, original: "$70.00", save: "25%", final: "$52.50" },
  { amount: 500, original: "$80.00", save: "20%", final: "$64.00" },
];

const FEATURES = [
  "Follow to updates",
  "See all post",
  "New feature unlock",
  "See all post",
  "Follow to updates",
];

// ── Pages ──────────────────────────────────────────────────────────────────────
function FanMain({ onNav }: { onNav: (p: PageId) => void }) {
  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 28,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar src="https://api.dicebear.com/7.x/personas/svg?seed=jhonlura" size={58} ring />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Jhon Lura</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>jhonlura@mail.com</div>
          </div>
        </div>
        <button style={{
          background: ACCENT, color: "#fff", border: "none",
          borderRadius: 12, padding: "10px 18px",
          fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
        }}>
          Be Creator
        </button>
      </div>

      <MenuRow icon={<CreditCard size={17} />} label="My Subscription"  onClick={() => onNav("my-subscription")} />
      <MenuRow icon={<Star size={17} />}        label="Credits"          onClick={() => onNav("credits")} />
      <MenuRow icon={<ShoppingBag size={17} />} label="Order History"   onClick={() => onNav("order-history")} />
      <MenuRow icon={<Lock size={17} />}        label="Change Password" onClick={() => onNav("change-password")} />
      <MenuRow icon={<Ban size={17} />}         label="Block List"      onClick={() => onNav("block-list")} />
      <MenuRow icon={<Settings size={17} />}    label="Settings"        onClick={() => onNav("settings")} />
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  contact: string;
  gender: string;
  contact2: string;
}

interface NotifState {
  msg: boolean;
  call: boolean;
  sales: boolean;
  gifts: boolean;
}

function EditProfile() {
  const [notifs, setNotifs] = useState<NotifState>({ msg: true, call: true, sales: true, gifts: true });
  const [form, setForm] = useState<FormState>({
    name: "Jhon Lura", email: "jhon@mail.com",
    contact: "+38947 39847", gender: "Female", contact2: "+38947 39847",
  });

  const field = (label: string, key: keyof FormState, half: boolean) => (
    <div style={{ flex: half ? "0 0 calc(50% - 6px)" : "1 1 100%" }}>
      <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 6 }}>{label}</div>
      <input
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{
          width: "100%", background: SURFACE, border: "none",
          borderRadius: 10, padding: "12px 14px", color: "#e5e7eb",
          fontSize: 14, fontFamily: "inherit", boxSizing: "border-box",
        }}
      />
    </div>
  );

  const notifRows: { key: keyof NotifState; label: string }[] = [
    { key: "msg",   label: "New Message"    },
    { key: "call",  label: "Incoming Call"  },
    { key: "sales", label: "Shop Sales"     },
    { key: "gifts", label: "Received Gifts" },
  ];

  return (
    <div>
      <div style={{ position: "relative", width: 90, marginBottom: 28 }}>
        <Avatar src="https://api.dicebear.com/7.x/personas/svg?seed=jhonlura" size={90} ring />
        <button style={{
          position: "absolute", bottom: 4, right: 0,
          background: ACCENT, border: "none", borderRadius: "50%",
          width: 28, height: 28, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
        }}>
          <Camera size={13} color="#fff" />
        </button>
      </div>

      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Personal Information</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        {field("Name",    "name",     true)}
        {field("Email",   "email",    true)}
        {field("Contact", "contact",  true)}
        {field("Gender",  "gender",   true)}
        {field("Contact", "contact2", false)}
      </div>

      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: "24px 0 12px" }}>Notification</div>
      {notifRows.map(({ key, label }) => (
        <div key={key} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: SURFACE, borderRadius: 12, padding: "14px 16px", marginBottom: 8,
        }}>
          <span style={{ color: "#e5e7eb", fontSize: 14 }}>{label}</span>
          <Toggle value={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
        </div>
      ))}

      <button style={{
        width: "100%", marginTop: 24, background: ACCENT, border: "none",
        borderRadius: 14, padding: "16px", color: "#fff",
        fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
      }}>
        Save Changes
      </button>
    </div>
  );
}

function MySubscription({ onSelect }: { onSelect: (sub: Subscription) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SUBS.map(sub => (
        <button
          key={sub.id}
          onClick={() => onSelect(sub)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: SURFACE, border: "none", borderRadius: 14,
            padding: "14px 16px", cursor: "pointer", textAlign: "left",
            transition: "background .15s", width: "100%",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = SURFACE2)}
          onMouseLeave={e => (e.currentTarget.style.background = SURFACE)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=${sub.seed}`} size={46} />
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{sub.name}</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>Exp:{sub.exp}</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: PINK, fontWeight: 600, fontSize: 14 }}>{sub.tier}</div>
            <div style={{ color: "#9ca3af", fontSize: 12 }}>{sub.price} /m</div>
          </div>
          <div style={{
            color: sub.status === "Active" ? GREEN : RED,
            fontWeight: 600, fontSize: 14, minWidth: 52, textAlign: "right",
          }}>
            {sub.status}
          </div>
        </button>
      ))}
    </div>
  );
}

function SubscriptionDetail({ sub }: { sub: Subscription | null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main card */}
      <div style={{ background: SURFACE, borderRadius: 18, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=${sub?.seed ?? "robert"}`} size={50} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{sub?.name ?? "Robert Fox"}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>11 Oct, 2025</div>
            </div>
          </div>
          <span style={{
            background: "#16a34a20", color: GREEN, borderRadius: 8,
            padding: "4px 12px", fontSize: 13, fontWeight: 600,
          }}>Active</span>
        </div>

        <div style={{ color: ACCENT, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Diamond</div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 26 }}>$4.99</span>
          <span style={{ color: "#6b7280", fontSize: 14 }}> /m</span>
        </div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 4 }}>Follow along for public updates</div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 2 }}>Purchase Date: 17/1/2026</div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>Expired Date: 17/2/2026</div>

        <div style={{ borderTop: "1px solid #ffffff10", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: ACCENT, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <Check size={12} color="#fff" strokeWidth={3} />
              </div>
              <span style={{ color: "#e5e7eb", fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Credit packages */}
      <div style={{ color: "#9ca3af", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
        Credit Packages
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CREDIT_PACKS.map(c => <CreditPackRow key={c.amount} c={c} />)}
      </div>
    </div>
  );
}

function ChangePassword() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["Current Password", "New Password", "Confirm Password"] as const).map(label => (
        <div key={label}>
          <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 6 }}>{label}</div>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%", background: SURFACE, border: "none",
              borderRadius: 10, padding: "13px 14px", color: "#e5e7eb",
              fontSize: 14, fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
        </div>
      ))}
      <button style={{
        marginTop: 8, background: ACCENT, border: "none", borderRadius: 14,
        padding: "15px", color: "#fff", fontSize: 15, fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit",
      }}>
        Update Password
      </button>
    </div>
  );
}

function BlockList() {
  const [list, setList] = useState<BlockedUser[]>(BLOCKED_USERS);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {list.length === 0 && (
        <p style={{ color: "#6b7280", textAlign: "center", padding: 32 }}>No blocked users</p>
      )}
      {list.map(u => (
        <div key={u.id} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: SURFACE, borderRadius: 14, padding: "12px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=${u.seed}`} size={42} />
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{u.name}</div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>{u.handle}</div>
            </div>
          </div>
          <button
            onClick={() => setList(l => l.filter(x => x.id !== u.id))}
            style={{
              background: "#ef444415", color: RED, border: "none",
              borderRadius: 8, padding: "6px 12px", fontSize: 12,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
}

function Credits() {
  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${ACCENT}33, ${SURFACE} 80%)`,
        border: `1px solid ${ACCENT}30`, borderRadius: 18, padding: 20, marginBottom: 20,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: SURFACE2,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Star size={24} color={GOLD} fill={GOLD} />
        </div>
        <div>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>Your Balance</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 26 }}>
            120 <span style={{ color: GOLD, fontSize: 16, fontWeight: 600 }}>Credits</span>
          </div>
        </div>
      </div>
      <div style={{ color: "#9ca3af", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
        Buy Credits
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CREDIT_PACKS.map(c => <CreditPackRow key={c.amount} c={c} />)}
      </div>
    </div>
  );
}

function OrderHistory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ORDERS.map(o => (
        <div key={o.id} style={{ background: SURFACE, borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: ACCENT, fontSize: 12, fontWeight: 600 }}>{o.id}</span>
            <span style={{ color: o.status === "Completed" ? GREEN : RED, fontSize: 12, fontWeight: 600 }}>
              {o.status}
            </span>
          </div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{o.item}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#6b7280", fontSize: 12 }}>{o.date}</span>
            <span style={{ color: "#e5e7eb", fontSize: 14, fontWeight: 700 }}>{o.amount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  twoFA: boolean;
  analytics: boolean;
}

function SettingsPage() {
  const [s, setS] = useState<SettingsState>({
    darkMode: true, notifications: true, twoFA: false, analytics: true,
  });

  const rows: { key: keyof SettingsState; label: string; desc: string }[] = [
    { key: "darkMode",      label: "Dark Mode",          desc: "Use dark theme throughout the app" },
    { key: "notifications", label: "Push Notifications", desc: "Receive push notifications"        },
    { key: "twoFA",         label: "Two-Factor Auth",    desc: "Extra security for your account"   },
    { key: "analytics",     label: "Usage Analytics",    desc: "Help improve the app"              },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map(({ key, label, desc }) => (
        <div key={key} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: SURFACE, borderRadius: 12, padding: "14px 16px",
        }}>
          <div>
            <div style={{ color: "#e5e7eb", fontSize: 14, fontWeight: 600 }}>{label}</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>{desc}</div>
          </div>
          <Toggle value={s[key]} onChange={v => setS(x => ({ ...x, [key]: v }))} />
        </div>
      ))}
      <button style={{
        marginTop: 16, background: "#ef444415", border: `1px solid ${RED}30`,
        borderRadius: 14, padding: "14px", color: RED,
        fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
      }}>
        Log Out
      </button>
    </div>
  );
}

// ── Topbar ─────────────────────────────────────────────────────────────────────
const PAGE_TITLES: Record<PageId, string> = {
  "main":             "Profile",
  "edit-profile":     "Edit Profile",
  "my-subscription":  "My Subscription",
  "sub-detail":       "Subscription Detail",
  "credits":          "Credits",
  "order-history":    "Order History",
  "change-password":  "Change Password",
  "block-list":       "Block List",
  "settings":         "Settings",
};

function Topbar({
  page, history, onBack,
}: {
  page: PageId;
  history: PageId[];
  onBack: () => void;
}) {
  const canGoBack = history.length > 0;
  const prev = history[history.length - 1];

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "16px 20px", borderBottom: "1px solid #ffffff08",
    }}>
      {canGoBack && (
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
        >
          <ChevronLeft size={18} color="#9ca3af" />
        </button>
      )}
      <span style={{ fontSize: 13, color: "#9ca3af" }}>
        {canGoBack ? (
          <>
            <span
              onClick={onBack}
              style={{ cursor: "pointer" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "#9ca3af")}
            >
              {PAGE_TITLES[prev] ?? "Back"}
            </span>
            <span style={{ margin: "0 6px", color: "#374151" }}>›</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>{PAGE_TITLES[page]}</span>
          </>
        ) : (
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{PAGE_TITLES[page]}</span>
        )}
      </span>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function FanProfile() {
  const [page, setPage] = useState<PageId>("main");
  const [history, setHistory] = useState<PageId[]>([]);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  const navigate = (next: PageId) => {
    setHistory(h => [...h, page]);
    setPage(next);
  };

  const goBack = () => {
    setPage(history[history.length - 1] ?? "main");
    setHistory(h => h.slice(0, -1));
  };

  const handleSelectSub = (sub: Subscription) => {
    setSelectedSub(sub);
    navigate("sub-detail");
  };

  const renderPage = () => {
    switch (page) {
      case "main":            return <FanMain onNav={navigate} />;
      case "edit-profile":    return <EditProfile />;
      case "my-subscription": return <MySubscription onSelect={handleSelectSub} />;
      case "sub-detail":      return <SubscriptionDetail sub={selectedSub} />;
      case "credits":         return <Credits />;
      case "order-history":   return <OrderHistory />;
      case "change-password": return <ChangePassword />;
      case "block-list":      return <BlockList />;
      case "settings":        return <SettingsPage />;
      default:                return null;
    }
  };

  return (
    <div style={{
      background: BG, minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#fff",
    }}>
      <Topbar page={page} history={history} onBack={goBack} />
      <div style={{ padding: "24px 20px", maxWidth: 560, margin: "0 auto" }}>
        {renderPage()}
      </div>
    </div>
  );
}