"use client";

import AboutUs from "@/components/shared/AboutUs/AboutUs";
import ContactUs from "@/components/shared/ContactUs/ContactUs";
import DeleteAccount from "@/components/shared/Deleteaccount/Deleteaccount";
import PrivacyPolicy from "@/components/shared/PrivacyPolicy/PrivacyPolicy";
import Termsandcondition from "@/components/shared/Termsandcondition/Termsandcondition";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PageId = "main" | "about-us" | "terms" | "privacy" | "contact-us" | "delete";

interface MenuItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  danger: boolean;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  { id: "about-us",    label: "About Us",          icon: Info,       danger: false },
  { id: "terms",       label: "Terms & Condition",  icon: FileText,   danger: false },
  { id: "privacy",     label: "Privacy Policy",     icon: ShieldCheck,danger: false },
  { id: "contact-us",  label: "Contact Us",         icon: Mail,       danger: false },
  { id: "delete",      label: "Delete Account",     icon: Trash2,     danger: true  },
];

const PAGE_TITLES: Record<PageId, string> = {
  main:        "Settings",
  "about-us":  "About Us",
  terms:       "Terms & Condition",
  privacy:     "Privacy Policy",
  "contact-us":"Contact Us",
  delete:      "Delete Account",
};

// ─── PageRenderer ──────────────────────────────────────────────────────────────

function PageRenderer({ page }: { page: PageId }) {
  switch (page) {
    case "about-us":   return <AboutUs />;
    case "terms":      return <Termsandcondition />;
    case "privacy":    return <PrivacyPolicy />;
    case "contact-us": return <ContactUs />;
    case "delete":     return <DeleteAccount />;
    default:           return null;
  }
}

// ─── Topbar ────────────────────────────────────────────────────────────────────

interface TopbarProps {
  page: PageId;
  onBack: () => void;
}

function Topbar({ page, onBack }: TopbarProps) {
  const isMain = page === "main";

  return (
    <div className="flex items-center gap-2 px-6 py-4 border-b border-white/6">
      {!isMain && (
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={18} />
        </button>
      )}
      <span className="text-lg">
        {!isMain ? (
          <>
            <span
              className="text-gray-500 cursor-pointer hover:text-white transition-colors"
              onClick={onBack}
            >
              {PAGE_TITLES["main"]}
            </span>
            <span className="mx-1.5 text-gray-700">›</span>
            <span className="text-white">{PAGE_TITLES[page]}</span>
          </>
        ) : (
          <span className="text-white font-medium">{PAGE_TITLES["main"]}</span>
        )}
      </span>
    </div>
  );
}

// ─── SettingsMenu (main list) ──────────────────────────────────────────────────

function SettingsMenu({ onNav }: { onNav: (page: PageId) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {MENU_ITEMS.map((item) => {
        const IconComponent = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg bg-[#1a1b2e] hover:bg-[#1f2040] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <IconComponent
                size={16}
                className={item.danger ? "text-red-400" : "text-indigo-400"}
                strokeWidth={1.8}
              />
              <span
                className={`text-md font-semibold ${
                  item.danger ? "text-red-400" : "text-white"
                }`}
              >
                {item.label}
              </span>
            </div>
            <ChevronRight
              size={15}
              className={item.danger ? "text-red-400/30" : "text-gray-600 group-hover:text-gray-400"}
              strokeWidth={2}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── SettingsPage (Root) ───────────────────────────────────────────────────────

export default function Settings() {
  const [page, setPage] = useState<PageId>("main");

  const navigate = (next: PageId) => setPage(next);
  const goBack   = ()            => setPage("main");

  return (
    <div className="bg-[#0f1020]">
      <Topbar page={page} onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {page === "main" ? (
          <SettingsMenu onNav={navigate} />
        ) : (
          <PageRenderer page={page} />
        )}
      </div>
    </div>
  );
}