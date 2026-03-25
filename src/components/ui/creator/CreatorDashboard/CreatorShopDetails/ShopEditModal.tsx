import React, { useState, useEffect, useRef } from 'react';
import {
    X, ShoppingBag, Image as ImageIcon, Terminal, ChevronRight, Check,
    Link, DollarSign, Tag, FileText,
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type LogType = 'info' | 'success' | 'error' | 'diff' | 'data';

export interface ShopItemData {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    resourceLink: string;
}

export interface ShopItemUpdatePayload {
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    resourceLink: string;
}

export interface UpdateShopItemResponse {
    success: boolean;
    updatedAt: string;
    itemId: string;
    data: ShopItemUpdatePayload;
}

export interface LogEntry {
    time: string;
    message: string;
    type: LogType;
}

export interface ShopEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: ShopItemData;
    onUpdate?: (updated: ShopItemData) => void;
}

// ─────────────────────────────────────────────
// DATA LAYER
// ─────────────────────────────────────────────
export const DEFAULT_SHOP_DATA: ShopItemData = {
    id: 'item_001',
    title: 'Premium Watercolor Brush Set',
    price: '29.99',
    description:
        'A curated collection of 12 professional-grade watercolor brushes, perfect for artists of all skill levels. Includes round, flat, and fan brushes crafted from high-quality synthetic fibers for smooth, consistent strokes.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    resourceLink: 'https://example.com/downloads/brush-set',
};

// ─────────────────────────────────────────────
// API / UPDATE HANDLER
// ─────────────────────────────────────────────
export async function updateShopItem(
    itemId: string,
    payload: ShopItemUpdatePayload,
): Promise<UpdateShopItemResponse> {
    await new Promise<void>(r => setTimeout(r, 600));

    if (Math.random() < 0.1) {
        throw new Error('Network error: failed to reach server');
    }

    return {
        success: true,
        updatedAt: new Date().toISOString(),
        itemId,
        data: payload,
    };
}

// ─────────────────────────────────────────────
// CONSOLE PANEL
// ─────────────────────────────────────────────
const LOG_COLORS: Record<LogType, string> = {
    info:    'text-sky-400',
    success: 'text-emerald-400',
    error:   'text-red-400',
    diff:    'text-amber-300',
    data:    'text-purple-300',
};

interface ConsoleLineProps {
    entry: LogEntry;
}

const ConsoleLine: React.FC<ConsoleLineProps> = ({ entry }) => (
    <div className="flex gap-2 font-mono text-[11px] leading-relaxed">
        <span className="text-gray-600 shrink-0 select-none">{entry.time}</span>
        <span className={LOG_COLORS[entry.type]}>{entry.message}</span>
    </div>
);

interface ConsolePanelProps {
    logs: LogEntry[];
    onClear: () => void;
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ logs, onClear }) => (
    <div className="bg-[#07070d] border border-[#1e1e28] rounded-xl overflow-hidden flex flex-col" style={{ height: 200 }}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#1e1e28] bg-[#0d0d14] shrink-0">
            <div className="flex items-center gap-2 text-gray-400">
                <Terminal size={13} />
                <span className="text-[11px] font-bold uppercase tracking-widest">Update Console</span>
            </div>
            <button
                type="button"
                onClick={onClear}
                className="text-[10px] text-gray-600 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
                Clear
            </button>
        </div>
        <div className="p-3 overflow-y-auto flex-1 space-y-1 custom-scrollbar">
            {logs.length === 0
                ? <p className="text-[11px] text-gray-700 font-mono">No activity yet…</p>
                : logs.map((entry, i) => <ConsoleLine key={i} entry={entry} />)
            }
        </div>
    </div>
);

// ─────────────────────────────────────────────
// FIELD COMPONENT
// ─────────────────────────────────────────────
interface FieldProps {
    label: string;
    icon: React.FC<{ size?: number; className?: string }>;
    children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, icon: Icon, children }) => (
    <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            <Icon size={11} className="text-emerald-500/70" />
            {label}
        </label>
        {children}
    </div>
);

// ─────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────
const ShopEditModal: React.FC<ShopEditModalProps> = ({
    isOpen,
    onClose,
    initialData = DEFAULT_SHOP_DATA,
    onUpdate,
}) => {
    const [formData,      setFormData]      = useState<ShopItemData>({ ...initialData });
    const [savedData,     setSavedData]     = useState<ShopItemData>({ ...initialData });
    const [isSubmitting,  setIsSubmitting]  = useState(false);
    const [showSuccess,   setShowSuccess]   = useState(false);
    const [logs,          setLogs]          = useState<LogEntry[]>([]);
    const consoleBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    if (!isOpen) return null;

    // ── Helpers ──────────────────────────────
    const setField = <K extends keyof ShopItemData>(key: K, value: ShopItemData[K]): void => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const addLog = (message: string, type: LogType = 'info'): void => {
        const time = new Date().toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
        setLogs(prev => [...prev, { time, message, type }]);
    };

    const getDiff = (): Partial<Record<keyof ShopItemData, { from: ShopItemData[keyof ShopItemData]; to: ShopItemData[keyof ShopItemData] }>> => {
        const changes: Partial<Record<keyof ShopItemData, { from: ShopItemData[keyof ShopItemData]; to: ShopItemData[keyof ShopItemData] }>> = {};
        (Object.keys(formData) as (keyof ShopItemData)[]).forEach(key => {
            if (formData[key] !== savedData[key]) {
                changes[key] = { from: savedData[key], to: formData[key] };
            }
        });
        return changes;
    };

    const isDirty = Object.keys(getDiff()).length > 0;

    // Price validation: allow only numeric/decimal input
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const val = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(val)) {
            setField('price', val);
        }
    };

    // ── Submit ────────────────────────────────
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (isSubmitting) return;

        const diff = getDiff();
        addLog('▶ Update triggered', 'info');

        if (Object.keys(diff).length === 0) {
            addLog('⚠ No changes detected — skipping request', 'info');
            return;
        }

        addLog(`Δ Changed fields: ${Object.keys(diff).join(', ')}`, 'diff');
        (Object.entries(diff) as [keyof ShopItemData, { from: ShopItemData[keyof ShopItemData]; to: ShopItemData[keyof ShopItemData] }][])
            .forEach(([key, { from, to }]) => {
                addLog(`  ${key}: "${String(from)}" → "${String(to)}"`, 'diff');
            });

        const payload: ShopItemUpdatePayload = {
            title:        formData.title,
            price:        formData.price,
            description:  formData.description,
            imageUrl:     formData.imageUrl,
            resourceLink: formData.resourceLink,
        };

        addLog(`→ PATCH /api/shop/${formData.id}`, 'info');
        addLog(`  Payload: ${JSON.stringify(payload)}`, 'data');

        setIsSubmitting(true);
        try {
            const result = await updateShopItem(formData.id, payload);
            addLog(`✓ Success (${result.updatedAt})`, 'success');
            addLog(`  Response: ${JSON.stringify({ itemId: result.itemId, success: result.success })}`, 'data');

            setSavedData({ ...formData });
            onUpdate?.({ ...formData });

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            addLog(`✗ Error: ${message}`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-[#0d0d12] border border-[#2a2a35] w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[92vh]">
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">

                    {/* ── Header ── */}
                    <div className="px-6 py-5 border-b border-[#2a2a35] flex items-center justify-between sticky top-0 bg-[#0d0d12] z-10 rounded-t-[2rem] shrink-0">
                        <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                            Edit Shop Item <ShoppingBag size={18} className="text-emerald-500" />
                            {isDirty && (
                                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                    Unsaved
                                </span>
                            )}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* ── Scrollable Body ── */}
                    <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">

                        {/* Image Preview */}
                        <div className="relative group rounded-2xl overflow-hidden border border-[#2a2a35] aspect-[21/9] bg-[#1a1a24] cursor-pointer">
                            <img
                                src={formData.imageUrl}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity duration-300"
                                alt="Product preview"
                                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                <ImageIcon size={28} className="mb-1.5" />
                                <p className="text-[11px] font-bold uppercase tracking-widest">Change Product Image</p>
                            </div>
                        </div>

                        {/* Image URL */}
                        <Field label="Image URL" icon={ImageIcon}>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={e => setField('imageUrl', e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700"
                            />
                        </Field>

                        {/* Title & Price row */}
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                            <Field label="Title" icon={Tag}>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setField('title', e.target.value)}
                                    placeholder="Product name"
                                    className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700"
                                />
                            </Field>
                            <Field label="Price (USD)" icon={DollarSign}>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500/70 font-bold text-sm select-none">$</span>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={formData.price}
                                        onChange={handlePriceChange}
                                        placeholder="0.00"
                                        className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 pl-7 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700 min-w-[120px]"
                                    />
                                </div>
                            </Field>
                        </div>

                        {/* Description */}
                        <Field label="Description" icon={FileText}>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={e => setField('description', e.target.value)}
                                placeholder="Describe your product…"
                                className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none placeholder:text-gray-700"
                            />
                        </Field>

                        {/* Resource Link */}
                        <Field label="Resource / Download Link" icon={Link}>
                            <div className="relative">
                                <Link size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500/50 pointer-events-none" />
                                <input
                                    type="url"
                                    value={formData.resourceLink}
                                    onChange={e => setField('resourceLink', e.target.value)}
                                    placeholder="https://your-download-link.com"
                                    className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 pl-9 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </Field>

                        {/* Console */}
                        <ConsolePanel logs={logs} onClear={() => setLogs([])} />
                        <div ref={consoleBottomRef} />

                    </div>

                    {/* ── Footer ── */}
                    <div className="px-6 py-5 border-t border-[#2a2a35] bg-[#0d0d12] rounded-b-[2rem] shrink-0">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className={`w-full relative font-bold py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98] text-sm text-white ${
                                showSuccess
                                    ? 'bg-emerald-600 shadow-emerald-500/20'
                                    : isDirty
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
                                    : 'bg-[#1a1a24] border border-[#2a2a35] text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Saving…
                                </span>
                            ) : showSuccess ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Check size={16} strokeWidth={3} /> Saved
                                </span>
                            ) : isDirty ? (
                                <span className="flex items-center justify-center gap-1.5">
                                    Update Item <ChevronRight size={16} />
                                </span>
                            ) : (
                                'No Changes'
                            )}
                        </button>
                    </div>

                </form>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e1e2a; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2a2a38; }
            `}</style>
        </div>
    );
};

export default ShopEditModal;