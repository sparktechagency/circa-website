"use client";

import PrivacyPolicy from "@/components/shared/PrivacyPolicy/PrivacyPolicy";
import {
  Ban,
  Bell,
  ChevronLeft,
  ChevronRight,
  Edit2,
  FileText,
  Lock,
  MessageSquare,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { MdLineStyle } from "react-icons/md";
import BlockList from "./BlockList";
import ChangePassword from "./ChangePassword";
import ChangeYourVive from "./ChangeYourVive";
import CreatePlan from "./CreatePlan";
import EditProfile from "./EditProfile";
import MemberList from "./MemberList";
import MembershipPlan from "./MembershipPlan";
import NotificationSettings from "./NotificationSettings";
import OrderList from "./OrderList";
import SubscribersList from "./SubscribersList";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageId =
  | "main"
  | "edit-profile"
  | "membership-plan"
  | "create-plan"
  | "notification-settings"
  | "change-password"
  | "change-your-vive"
  | "order-list"
  | "member-list"
  | "block-list"
  | "subscribers"
  | "privacy"
  | "user-detail";

interface MenuItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  hasToggle?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  { id: "edit-profile", label: "Account Information", icon: <User size={14} /> },
  { id: "membership-plan", label: "Membership Plan", icon: <MessageSquare size={14} /> },
  { id: "notification-settings", label: "Notification Settings", icon: <Bell size={14} /> },
  { id: "change-password", label: "Change Password", icon: <Lock size={14} /> },
  { id: "change-password", label: "Received Photo from Fans", icon: <TrendingUp size={14} />, hasToggle: true },
  { id: "change-your-vive", label: "Change Your Vive", icon: <MdLineStyle size={14} /> },
  { id: "order-list", label: "Order List", icon: <FileText size={14} /> },
  { id: "member-list", label: "Member List", icon: <Users size={14} /> },
  { id: "block-list", label: "Block List", icon: <Ban size={14} /> },
  { id: "privacy", label: "Privacy", icon: <Lock size={14} /> },
];

const PAGE_TITLES: Record<any, string> = {
  "main": "Edit Profile",
  "edit-profile": "Edit Profile",
  "membership-plan": "Membership Plan",
  "create-plan": "Create Membership Plan",
  "notification-settings": "Notification Settings",
  "change-password": "Change Password",
  "change-your-vive": "Change Your Vive",
  "order-list": "Order List",
  "member-list": "Member List",
  "block-list": "Block List",
  "subscribers": "Subscribers",
  "privacy": "Privacy Policy",
  "user-detail": "User Detail",
};

function SmallToggle({ value, onChange }: any) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{ width: 40, height: 22 }}
      className={`rounded-full relative transition-all flex-shrink-0 ${value ? "bg-indigo-500" : "bg-[#2a2b40]"
        }`}
    >
      <div
        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all shadow ${value ? "left-[21px]" : "left-[3px]"
          }`}
      />
    </button>
  );
}

// ─── ProfileMain ──────────────────────────────────────────────────────────────


function ProfileMain({ onNav }: any) {
  const [receiveFanPhotos, setReceiveFanPhotos] = useState(true);

  return (
    <div className="space-y-2">
      <ProfileHeader />

      {MENU_ITEMS.map((item, i) => (
        <MenuRow
          key={i}
          item={item}
          toggleValue={receiveFanPhotos}
          onToggle={setReceiveFanPhotos}
          onNav={onNav}
        />
      ))}
    </div>
  );
}

function ProfileHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#1a1b2e]">
        <img
          src="https://api.dicebear.com/7.x/personas/svg?seed=jina99"
          alt="Jina Sara avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-indigo-400 flex items-center justify-center">
          <Edit2 size={7} className="text-white" />
        </div>
      </div>
      <div>
        <p className="text-white font-semibold text-sm leading-tight">Jina Sara</p>
        <p className="text-gray-500 text-xs">@sarasara_late</p>
      </div>
    </div>
  );
}



function MenuRow({ item, toggleValue, onToggle, onNav }: any) {
  return (
    <button
      onClick={() => onNav(item.id)}
      className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg bg-[#1a1b2e] hover:bg-[#1f2040] transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400 group-hover:text-indigo-400 transition-colors">
          {item.icon}
        </span>
        <span className="text-white text-sm">{item.label}</span>
      </div>

      {item.hasToggle ? (
        <div onClick={(e) => { e.stopPropagation(); onToggle(!toggleValue); }}>
          <SmallToggle value={toggleValue} onChange={onToggle} />
        </div>
      ) : (
        <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
      )}
    </button>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────


function Topbar({ page, history, viewingUser, onBack }: any) {
  const canGoBack = history.length > 0;
  const previousPage = history[history.length - 1];
  const currentTitle = page === "user-detail" ? viewingUser : PAGE_TITLES[page];

  return (
    <div className="flex items-center gap-2 px-6 py-4 border-b border-white/6">
      {canGoBack && (
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={18} />
        </button>
      )}

      <span className="text-sm text-gray-500">
        {canGoBack ? (
          <>
            <span
              className="cursor-pointer hover:text-white transition-colors"
              onClick={onBack}
            >
              {PAGE_TITLES[previousPage] ?? "Back"}
            </span>
            <span className="mx-1.5 text-gray-700">›</span>
            <span className="text-white">{currentTitle}</span>
          </>
        ) : (
          <span className="text-white font-medium">{currentTitle}</span>
        )}
      </span>
    </div>
  );
}

// ─── PageRenderer ─────────────────────────────────────────────────────────────

interface PageRendererProps {
  page: PageId;
  onNav: (page: PageId) => void;
  onViewUser: (name: string) => void;
}

function PageRenderer({ page, onNav, onViewUser }: PageRendererProps) {
  switch (page) {
    case "main": return <ProfileMain onNav={onNav} />;
    case "edit-profile": return <EditProfile />;
    case "membership-plan": return <MembershipPlan onCreate={() => onNav("create-plan")} />;
    case "create-plan": return <CreatePlan />;
    case "notification-settings": return <NotificationSettings />;
    case "change-password": return <ChangePassword />;
    case "change-your-vive": return <ChangeYourVive />;
    case "order-list": return <OrderList />;
    case "member-list": return <MemberList />;
    case "block-list": return <BlockList />;
    case "subscribers": return <SubscribersList onViewUser={onViewUser} />;
    case "privacy": return <PrivacyPolicy />;
    default: return null;
  }
}

// ─── CreatorProfile (Root) ────────────────────────────────────────────────────

export default function CreatorProfile() {
  const [page, setPage] = useState<PageId>("main");
  const [history, setHistory] = useState<PageId[]>([]);
  const [viewingUser, setViewingUser] = useState("");

  const navigate = (next: PageId) => {
    setHistory((h) => [...h, page]);
    setPage(next);
  };

  const goBack = () => {
    setPage(history[history.length - 1] ?? "main");
    setHistory((h) => h.slice(0, -1));
  };

  const handleViewUser = (name: string) => {
    setViewingUser(name);
    navigate("user-detail");
  };

  return (
    <div className="bg-[#0f1020]">
      <Topbar
        page={page}
        history={history}
        viewingUser={viewingUser}
        onBack={goBack}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <PageRenderer page={page} onNav={navigate} onViewUser={handleViewUser} />
      </div>
    </div>
  );
}