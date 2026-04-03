import React, { useState, useEffect, useRef } from 'react';
import {
    X, Globe, Star, Image as ImageIcon, Palette, Terminal, ChevronRight, Check,
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type Visibility = 'everyone' | 'subscribers';
export type Engagement = 'only_me' | 'hide_likes' | 'hide_comments';
export type LogType = 'info' | 'success' | 'error' | 'diff' | 'data';

export interface PostData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    visibility: Visibility;
    engagement: Engagement;
    nsfw: boolean;
}

export interface PostUpdatePayload {
    title: string;
    description: string;
    visibility: Visibility;
    engagement: Engagement;
    nsfw: boolean;
}

export interface UpdatePostResponse {
    success: boolean;
    updatedAt: string;
    postId: string;
    data: PostUpdatePayload;
}

export interface LogEntry {
    time: string;
    message: string;
    type: LogType;
}

export interface PostEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: PostData;
    onUpdate?: (updated: PostData) => void;
}

// ─────────────────────────────────────────────
// DATA LAYER
// ─────────────────────────────────────────────
export const DEFAULT_POST_DATA: PostData = {
    id: 'post_001',
    title: 'Just Finished a new watercolor piece!',
    description:
        'This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    visibility: 'everyone',
    engagement: 'only_me',
    nsfw: true,
};

interface EngagementOption {
    value: Engagement;
    label: string;
}

interface VisibilityOption {
    value: Visibility;
    label: string;
    description: string;
    icon: React.FC<{ size?: number }>;
}

export const ENGAGEMENT_OPTIONS: EngagementOption[] = [
    { value: 'only_me', label: 'Only me' },
    { value: 'hide_likes', label: 'Hide likes from Fans' },
    { value: 'hide_comments', label: 'Hide comments from Fans' },
];

export const VISIBILITY_OPTIONS: VisibilityOption[] = [
    { value: 'everyone', label: 'Everyone', description: 'All fans', icon: Globe },
    { value: 'subscribers', label: 'Subscribers Only', description: 'Paying subscribers', icon: Star },
];

// ─────────────────────────────────────────────
// API / UPDATE HANDLER
// ─────────────────────────────────────────────
export async function updatePost(
    postId: string,
    payload: PostUpdatePayload,
): Promise<UpdatePostResponse> {
    await new Promise<void>(r => setTimeout(r, 600));

    if (Math.random() < 0.1) {
        throw new Error('Network error: failed to reach server');
    }

    return {
        success: true,
        updatedAt: new Date().toISOString(),
        postId,
        data: payload,
    };
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
interface RadioOptionProps {
    label: string;
    description?: string;
    icon?: React.FC<{ size?: number }>;
    isSelected: boolean;
    onClick: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, description, icon: Icon, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${isSelected
                ? 'bg-[#1a1a24] border-purple-500/60 shadow-[0_0_18px_rgba(168,85,247,0.12)]'
                : 'bg-[#16161e] border-[#2a2a35] hover:border-[#3a3a48]'
            }`}
    >
        <div className="flex items-center gap-3">
            {Icon && (
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-purple-500/20 text-purple-400' : 'bg-[#2a2a35] text-gray-400'
                    }`}>
                    <Icon size={18} />
                </div>
            )}
            <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                {description && <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>}
            </div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-purple-500' : 'border-[#3a3a45]'
            }`}>
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
        </div>
    </div>
);

// ─────────────────────────────────────────────
// CONSOLE PANEL
// ─────────────────────────────────────────────
const LOG_COLORS: Record<LogType, string> = {
    info: 'text-sky-400',
    success: 'text-emerald-400',
    error: 'text-red-400',
    diff: 'text-amber-300',
    data: 'text-purple-300',
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
// MAIN MODAL
// ─────────────────────────────────────────────
const PostEditModal: React.FC<PostEditModalProps> = ({
    isOpen,
    onClose,
    initialData = DEFAULT_POST_DATA,
    onUpdate,
}) => {
    const [formData, setFormData] = useState<PostData>({ ...initialData });
    const [savedData, setSavedData] = useState<PostData>({ ...initialData });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const consoleBottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll console to bottom on new log
    useEffect(() => {
        consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    if (!isOpen) return null;

    // ── Helpers ──────────────────────────────
    const setField = <K extends keyof PostData>(key: K, value: PostData[K]): void => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const addLog = (message: string, type: LogType = 'info'): void => {
        const time = new Date().toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
        setLogs(prev => [...prev, { time, message, type }]);
    };

    const getDiff = (): Partial<Record<keyof PostData, { from: PostData[keyof PostData]; to: PostData[keyof PostData] }>> => {
        const changes: Partial<Record<keyof PostData, { from: PostData[keyof PostData]; to: PostData[keyof PostData] }>> = {};
        (Object.keys(formData) as (keyof PostData)[]).forEach(key => {
            if (formData[key] !== savedData[key]) {
                changes[key] = { from: savedData[key], to: formData[key] };
            }
        });
        return changes;
    };

    const isDirty = Object.keys(getDiff()).length > 0;

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

        // Log diff
        addLog(`Δ Changed fields: ${Object.keys(diff).join(', ')}`, 'diff');
        (Object.entries(diff) as [keyof PostData, { from: PostData[keyof PostData]; to: PostData[keyof PostData] }][])
            .forEach(([key, { from, to }]) => {
                addLog(`  ${key}: "${String(from)}" → "${String(to)}"`, 'diff');
            });

        const payload: PostUpdatePayload = {
            title: formData.title,
            description: formData.description,
            visibility: formData.visibility,
            engagement: formData.engagement,
            nsfw: formData.nsfw,
        };

        addLog(`→ PATCH /api/posts/${formData.id}`, 'info');
        addLog(`  Payload: ${JSON.stringify(payload)}`, 'data');

        setIsSubmitting(true);
        try {
            const result = await updatePost(formData.id, payload);
            addLog(`✓ Success (${result.updatedAt})`, 'success');
            addLog(`  Response: ${JSON.stringify({ postId: result.postId, success: result.success })}`, 'data');

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
            <div className="bg-[#0d0d12] border border-[#2a2a35] w-full max-w-2xl rounded-4xl shadow-2xl flex flex-col max-h-[92vh]">
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">

                    {/* ── Header ── */}
                    <div className="px-6 py-5 border-b border-[#2a2a35] flex items-center justify-between sticky top-0 bg-[#0d0d12] z-10 rounded-t-4xl shrink-0">
                        <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                            Edit Post <Palette size={18} className="text-purple-500" />
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
                    <div className="p-6 overflow-y-auto space-y-7 custom-scrollbar flex-1">

                        {/* Image Preview */}
                        <div className="relative group rounded-2xl overflow-hidden border border-[#2a2a35] aspect-21/9 bg-[#1a1a24] cursor-pointer">
                            <img
                                src={formData.imageUrl}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity duration-300"
                                alt="Post preview"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                <ImageIcon size={28} className="mb-1.5" />
                                <p className="text-[11px] font-bold uppercase tracking-widest">Change Artwork</p>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setField('title', e.target.value)}
                                    className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={e => setField('description', e.target.value)}
                                    className="w-full bg-[#16161e] border border-[#2a2a35] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Post Engagement */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                Post Engagement Visibility
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                {ENGAGEMENT_OPTIONS.map(opt => (
                                    <RadioOption
                                        key={opt.value}
                                        label={opt.label}
                                        isSelected={formData.engagement === opt.value}
                                        onClick={() => setField('engagement', opt.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* NSFW */}
                        <div className="flex items-center gap-3 px-1">
                            <button
                                type="button"
                                onClick={() => setField('nsfw', !formData.nsfw)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.nsfw ? 'bg-purple-600 border-purple-600' : 'bg-transparent border-[#3a3a45]'
                                    }`}
                            >
                                {formData.nsfw && <X size={13} strokeWidth={4} className="text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-white">18+ NSFW Content</span>
                        </div>

                        {/* Visibility */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                Who can see this?
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                {VISIBILITY_OPTIONS.map(opt => (
                                    <RadioOption
                                        key={opt.value}
                                        label={opt.label}
                                        description={opt.description}
                                        icon={opt.icon}
                                        isSelected={formData.visibility === opt.value}
                                        onClick={() => setField('visibility', opt.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Console */}
                        <ConsolePanel logs={logs} onClear={() => setLogs([])} />
                        <div ref={consoleBottomRef} />

                    </div>

                    {/* ── Footer ── */}
                    <div className="px-6 py-5 border-t border-[#2a2a35] bg-[#0d0d12] rounded-b-4xl shrink-0">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className={`w-full relative font-bold py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98] text-sm text-white ${showSuccess
                                    ? 'bg-emerald-600 shadow-emerald-500/20'
                                    : isDirty
                                        ? 'bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/20'
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
                                    Update Post <ChevronRight size={16} />
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

export default PostEditModal;