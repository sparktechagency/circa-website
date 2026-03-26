import { useState } from "react";



function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1a1b2e] rounded-lg">
      <span className="text-white text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{ width: 44, height: 24 }}
        className={`rounded-full relative transition-all flex-shrink-0 ${value ? "bg-indigo-500" : "bg-[#2a2b40]"}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white absolute top-[4px] transition-all duration-200 shadow ${value ? "left-[24px]" : "left-[4px]"}`} />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(true);
  const [t3, setT3] = useState(true);
  const [t4, setT4] = useState(true);

  return (
    <div className="space-y-2">
      <ToggleRow label="Notification list" value={t1} onChange={setT1} />
      <ToggleRow label="Create Membership Plan" value={t2} onChange={setT2} />
      <ToggleRow label="MARKETING TIP" value={t3} onChange={setT3} />
      <ToggleRow label="Personalization list on ms" value={t4} onChange={setT4} />
    </div>
  );
}