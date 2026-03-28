import { Edit2 } from 'lucide-react';
import { useRef, useState } from "react";

export default function EditProfile() {
  const [name, setName] = useState("Jina Sara");
  const [username, setUsername] = useState("@SaraSara_late");
  const [occupation, setOccupation] = useState("Content Creator ...");
  const [website, setWebsite] = useState("website.com");
  const [bio, setBio] = useState("Hi there! I'm a passionate digital creator sharing my journey...\nJoin me for a blend of art and storytelling.\nLet's make magic ✨");
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div
        onClick={() => avatarRef.current?.click()}
        className="relative w-16 h-16 rounded-full overflow-hidden bg-[#1a1b2e] cursor-pointer group"
      >
        <img src={avatar ?? "https://api.dicebear.com/7.x/personas/svg?seed=jina99"} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Edit2 size={14} className="text-white" />
        </div>
      </div>
      <input ref={avatarRef} type="file" accept="image/*" className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]; if (!f) return;
          const r = new FileReader(); r.onload = ev => setAvatar(ev.target?.result as string); r.readAsDataURL(f);
        }} />
      <div className="space-y-1.5">
        <p className="text-[13px] text-gray-400">Name</p>
        <div className="relative flex items-center">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="w-full bg-[#1a1b2e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 transition-all border-0" />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[13px] text-gray-400">Username</p>
        <div className="relative flex items-center">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="@username"
            className="w-full bg-[#1a1b2e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 transition-all border-0" />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[13px] text-gray-400">Occupation</p>
        <div className="relative flex items-center">
          <input type="text" value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Your occupation"
            className="w-full bg-[#1a1b2e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 transition-all border-0" />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[13px] text-gray-400">Website</p>
        <div className="relative flex items-center">
          <input type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="website.com"
            className="w-full bg-[#1a1b2e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 transition-all border-0" />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[13px] text-gray-400">Bio</p>
        <textarea
          value={bio} onChange={e => setBio(e.target.value)} rows={4}
          className="w-full bg-[#1a1b2e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 resize-none border-0"
        />
      </div>
       <button
      
      className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-primary`}
    >
      Save
    </button>
    </div>
  );
}