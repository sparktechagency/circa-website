import { Ban, Flag, Gem, Heart, MoreVertical, Star, User } from "lucide-react";
import { useState } from "react";


interface Member {
  id: number;
  name: string;
  handle: string;
  tier: string;
  tierColor: string;
  tierIcon: React.ReactNode;
  avatar: string;
}

interface MemberRowProps {
  member: Member;
}

interface ContextMenuItem {
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}

function Avatar({ src, name, size = 44 }: any) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="rounded-full object-cover bg-[#1e1f35] flex-shrink-0"
    />
  );
}

function TierBadge({ tier, color, icon }: any) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
    >
      {icon} {tier}
    </span>
  );
}



const MEMBERS: Member[] = [
  { id: 1, name: "Theresa Webb", handle: "@criss001", tier: "Sweety", tierColor: "#e879a0", tierIcon: <Heart size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=theresa" },
  { id: 2, name: "Dianne Russell", handle: "@criss001", tier: "Diamond", tierColor: "#a78bfa", tierIcon: <Gem size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=dianne" },
  { id: 3, name: "Robert Fox", handle: "@criss001", tier: "Free", tierColor: "#6b7280", tierIcon: <Star size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=robert" },
  { id: 4, name: "Arlene McCoy", handle: "@criss001", tier: "Sweety", tierColor: "#e879a0", tierIcon: <Heart size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=arlene" },
  { id: 5, name: "Courtney Henry", handle: "@criss001", tier: "Sweety", tierColor: "#e879a0", tierIcon: <Heart size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=courtney" },
  { id: 6, name: "Kathryn Murphy", handle: "@criss001", tier: "Diamond", tierColor: "#a78bfa", tierIcon: <Gem size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=kathryn" },
  { id: 7, name: "Annette Black", handle: "@criss001", tier: "Diamond", tierColor: "#a78bfa", tierIcon: <Gem size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=annette" },
  { id: 8, name: "Jane Cooper", handle: "@criss001", tier: "Sweety", tierColor: "#e879a0", tierIcon: <Heart size={10} />, avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jane" },
];


function MemberRow({ member }: MemberRowProps) {
  const [open, setOpen] = useState(false);

  const menuItems: ContextMenuItem[] = [
    { label: "Profile", icon: <User size={13} /> },
    { label: "Block", icon: <Ban size={13} />, danger: false },
    { label: "Report", icon: <Flag size={13} />, danger: true },
  ];

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <Avatar src={member.avatar} name={member.name} size={44} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">{member.name}</span>
            <TierBadge tier={member.tier} color={member.tierColor} icon={member.tierIcon} />
          </div>
          <span className="text-gray-500 text-xs">{member.handle}</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-gray-500 hover:text-white transition-colors p-1"
        >
          <MoreVertical size={16} />
        </button>
        {open && <ContextMenu items={menuItems} onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}

function ContextMenu({ items, onClose }: any) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-8 z-50 bg-[#1a1b2e] border border-white/8 rounded-xl shadow-2xl py-1.5 min-w-[140px] overflow-hidden">
        {items.map(({ label, icon, danger }: any) => (
          <button
            key={label}
            onClick={onClose}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${danger ? "text-red-400" : "text-gray-200"
              }`}
          >
            <span className={danger ? "text-red-400" : "text-gray-400"}>{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

export default function MemberList() {
  return (
    <div className="bg-[#13141f] rounded-2xl border border-white/5 px-4">
      {MEMBERS.map((m) => <MemberRow key={m.id} member={m} />)}
    </div>
  );
}