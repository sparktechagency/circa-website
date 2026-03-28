"use client";
import {
  Ban,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Lock,
  ShoppingBag,
  Star
} from "lucide-react";
import { useState } from "react";

import BlockList from "../../creator/Profile/BlockList";
import AccountInfo from "./AccontInfo";
import ChangePassword from "./ChangePassword";
import Credits from "./Creadit";
import MySubscription from "./MySubscription";
import OrderHistory from "./OrderHistory";
import Link from "next/link";

// ── Palette ────────────────────────────────────────────────────────────────────
const BG = "#0b0c13";
const SURFACE = "#13141f";
const SURFACE2 = "#1a1b2e";
const ACCENT = "#8b7cf8";

// ── Types ──────────────────────────────────────────────────────────────────────
type PageId =
  | "main"
  | "account-info"
  | "my-subscription"
  | "sub-detail"
  | "credits"
  | "order-history"
  | "change-password"
  | "block-list"
  | "settings";



function MenuRow({
  icon,
  label,
  onClick,
  right,
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
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 18px",
        borderRadius: 14,
        background: SURFACE,
        border: "none",
        cursor: "pointer",
        marginBottom: 8,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = SURFACE2)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = SURFACE)
      }
    >
      <div style={{ display: "flex", gap: 14 }}>
        <span style={{ color: ACCENT }}>{icon}</span>
        <span style={{ color: "#e5e7eb", fontSize: 16, fontWeight: 600 }}>{label}</span>
      </div>
      {right ?? <ChevronRight size={15} color="#4b5563" />}
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
function FanMain({ onNav }: { onNav: (p: PageId) => void }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <img
            src="https://api.dicebear.com/7.x/personas/svg?seed=jhonlur"
            alt=""
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              objectFit: "cover",
              border: `2.5px solid ${ACCENT}`,
              background: SURFACE2,
            }}
          />
          <div>
            <div style={{ color: "#fff", fontWeight: 700 }}>
              Jhon Lura
            </div>
            <div style={{ color: "#dddd", fontSize: 13 }}>
              jhonlura@mail.com
            </div>
          </div>
        </div>
        <Link href="/become-creator">
        <button
          style={{
            background: ACCENT,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Be Creator
        </button>
        </Link>

      </div>

      <MenuRow
        icon={<CreditCard size={17} />}
        label="My Subscription"
        onClick={() => onNav("my-subscription")}
      />
      <MenuRow
        icon={<Star size={17} />}
        label="Credits"
        onClick={() => onNav("credits")}
      />
      <MenuRow
        icon={<ShoppingBag size={17} />}
        label="Order History"
        onClick={() => onNav("order-history")}
      />
      <MenuRow
        icon={<Lock size={17} />}
        label="Change Password"
        onClick={() => onNav("change-password")}
      />
      <MenuRow
        icon={<Ban size={17} />}
        label="Block List"
        onClick={() => onNav("block-list")}
      />
    </div>
  );
}

// ── Topbar ─────────────────────────────────────────────────────────────────────
const PAGE_TITLES: Record<PageId, string> = {
  main: "Profile",
  "account-info": "Account Information",
  "my-subscription": "My Subscription",
  "sub-detail": "Subscription Detail",
  credits: "Credits",
  "order-history": "Order History",
  "change-password": "Change Password",
  "block-list": "Block List",
  settings: "Settings",
};

function Topbar({
  page,
  history,
  onBack,
}: {
  page: PageId;
  history: PageId[];
  onBack: () => void;
}) {
  const canGoBack = history.length > 0;
  const prev = history[history.length - 1];

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "16px 20px",
        borderBottom: "1px solid #ffffff08",
        background: BG,
      }}
    >
      {canGoBack && (
        <button onClick={onBack} style={{ background: "none", border: "none" }}>
          <ChevronLeft size={18} color="#9ca3af" />
        </button>
      )}

      <span className="text-lg">
        {canGoBack ? (
          <>
            <span onClick={onBack} style={{ cursor: "pointer", }}>
              {PAGE_TITLES[prev]}
            </span>
            <span style={{ margin: "0 6px" }}>›</span>
            <span style={{ fontWeight: 600, }}>
              {PAGE_TITLES[page]}
            </span>
          </>
        ) : (
          <span style={{ fontWeight: 600, }}>
            {PAGE_TITLES[page]}
          </span>
        )}
      </span>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function FanProfile() {
  const [page, setPage] = useState<PageId>("main");
  const [history, setHistory] = useState<PageId[]>([]);

  const navigate = (next: PageId) => {
    setHistory((h) => [...h, page]);
    setPage(next);
  };

  const goBack = () => {
    setPage(history[history.length - 1] ?? "main");
    setHistory((h) => h.slice(0, -1));
  };

  const renderPage = () => {
    switch (page) {
      case "main":
        return <FanMain onNav={navigate} />;
      case "account-info":
        return <AccountInfo />;
      case "my-subscription":
        return (
          <MySubscription />
        );
      case "credits":
        return <Credits />;
      case "order-history":
        return <OrderHistory />;
      case "change-password":
        return <ChangePassword />;
      case "block-list":
        return <BlockList />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Topbar page={page} history={history} onBack={goBack} />

      <div style={{ padding: "24px 20px" }}>{renderPage()}</div>
    </div>
  );
}