import { Mail, Phone, Search, User } from 'lucide-react';
import React, { useState } from 'react'


const CONTACTS = [
    { name: "Thomas Black", handle: "@thomas_b", role: "Prime", roleColor: "text-yellow-300", avatar: "thomas", online: true },
    { name: "Gianna Kovas", handle: "@giannak", role: "Fan", roleColor: "text-indigo-400", avatar: "gianna", online: false },
    { name: "Juneth Lin", handle: "@juneth_lin", role: "Fan", roleColor: "text-indigo-400", avatar: "juneth", online: true },
    { name: "Alicia McCoy", handle: "@aliciamcc", role: "Prime", roleColor: "text-yellow-300", avatar: "alicia", online: false },
    { name: "Gael Thermaly", handle: "@gaelt", role: "Regular", roleColor: "text-gray-400", avatar: "gael", online: true },
    { name: "Ruthlyn Murphy", handle: "@ruthlynm", role: "Fan", roleColor: "text-indigo-400", avatar: "ruthlyn", online: false },
    { name: "Annette Black", handle: "@annetteb", role: "Prime", roleColor: "text-yellow-300", avatar: "annette", online: true },
    { name: "Grant Cooper", handle: "@grantcoop", role: "Regular", roleColor: "text-gray-400", avatar: "grant", online: false },
];



function ContactsList({ onViewUser }: { onViewUser: (name: string) => void }) {
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<"all" | "online">("all");

    const filtered = CONTACTS.filter(c =>
        (tab === "all" || c.online) &&
        (c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search contacts..."
                    className="w-full bg-[#1a1b2e] rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/40 border-0"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#1a1b2e] rounded-xl p-1">
                {(["all", "online"] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? "bg-indigo-500 text-white" : "text-gray-500 hover:text-white"}`}
                    >
                        {t === "online" ? `Online (${CONTACTS.filter(c => c.online).length})` : `All (${CONTACTS.length})`}
                    </button>
                ))}
            </div>

            {/* Contact rows */}
            <div className="space-y-1.5">
                {filtered.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => onViewUser(c.name)}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1b2e] rounded-xl hover:bg-[#1f2040] transition-colors text-left group"
                    >
                        <div className="relative flex-shrink-0">
                            <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${c.avatar}`} className="w-9 h-9 rounded-full bg-[#0d0e16]" alt="" />
                            {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1a1b2e]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <p className="text-white text-sm font-medium truncate">{c.name}</p>
                                <span className={`text-[10px] font-semibold ${c.roleColor}`}>{c.role}</span>
                            </div>
                            <p className="text-gray-500 text-xs">{c.handle}</p>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                                <Mail size={11} />
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-[#0d0e16] flex items-center justify-center text-gray-400">
                                <Phone size={11} />
                            </div>
                        </div>
                    </button>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        <User size={28} className="mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No contacts found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactsList