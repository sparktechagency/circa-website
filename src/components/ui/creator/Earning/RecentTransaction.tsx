import Link from 'next/link';
import React from 'react';
import {
    ShoppingBag, ArrowDownLeft, ArrowUpRight, Clock,
    CheckCircle2, XCircle, RefreshCw, Lock, ImageIcon, Video,
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TransactionType   = 'sale' | 'withdrawal' | 'refund' | 'tip';
export type ContentType       = 'shop' | 'illustration' | 'video' | 'locked';

export interface Transaction {
    id: string;
    title: string;
    contentType: ContentType;
    image: string;
    buyerName: string;
    buyerAvatar: string;
    amount: number;
    fee: number;
    net: number;
    type: TransactionType;
    status: TransactionStatus;
    time: string;
    txRef: string;
}

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const TRANSACTIONS: Transaction[] = [
    {
        id: 't1',
        title: 'Premium Watercolor Brush Set',
        contentType: 'shop',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200',
        buyerName: 'Alex Morgan',
        buyerAvatar: 'https://i.pravatar.cc/40?img=1',
        amount: 29.99,
        fee: 2.70,
        net: 27.29,
        type: 'sale',
        status: 'completed',
        time: '2 hr ago',
        txRef: 'TXN-00123',
    },
    {
        id: 't2',
        title: 'Forest Walk — 4K Timelapse',
        contentType: 'video',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
        buyerName: 'Jamie Lee',
        buyerAvatar: 'https://i.pravatar.cc/40?img=5',
        amount: 14.99,
        fee: 1.35,
        net: 13.64,
        type: 'sale',
        status: 'pending',
        time: '5 hr ago',
        txRef: 'TXN-00122',
    },
    {
        id: 't3',
        title: 'Abstract Neon Series — Vol. 3',
        contentType: 'locked',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200',
        buyerName: 'Riley Kim',
        buyerAvatar: 'https://i.pravatar.cc/40?img=9',
        amount: 9.99,
        fee: 0.90,
        net: 9.09,
        type: 'sale',
        status: 'completed',
        time: '1 day ago',
        txRef: 'TXN-00121',
    },
    {
        id: 't4',
        title: 'Midnight City Illustration',
        contentType: 'illustration',
        image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=200',
        buyerName: 'Dana Park',
        buyerAvatar: 'https://i.pravatar.cc/40?img=12',
        amount: 49.00,
        fee: 4.41,
        net: 44.59,
        type: 'sale',
        status: 'failed',
        time: '1 day ago',
        txRef: 'TXN-00120',
    },
    {
        id: 't5',
        title: 'Forest Walk — 4K Timelapse',
        contentType: 'video',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
        buyerName: 'Chris Wade',
        buyerAvatar: 'https://i.pravatar.cc/40?img=15',
        amount: 14.99,
        fee: 1.35,
        net: 13.64,
        type: 'refund',
        status: 'refunded',
        time: '2 days ago',
        txRef: 'TXN-00119',
    },
    {
        id: 't6',
        title: 'Earnings Withdrawal',
        contentType: 'shop',
        image: 'https://i.pravatar.cc/40?img=20',
        buyerName: 'You',
        buyerAvatar: 'https://i.pravatar.cc/40?img=20',
        amount: -150.00,
        fee: 1.50,
        net: -151.50,
        type: 'withdrawal',
        status: 'completed',
        time: '3 days ago',
        txRef: 'TXN-00118',
    },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const STATUS_CONFIG: Record<TransactionStatus, { label: string; icon: React.FC<{ size?: number; className?: string }>; classes: string }> = {
    completed: { label: 'Completed', icon: CheckCircle2, classes: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    pending:   { label: 'Pending',   icon: Clock,         classes: 'text-amber-400  bg-amber-400/10  border-amber-400/20'  },
    failed:    { label: 'Failed',    icon: XCircle,       classes: 'text-red-400    bg-red-400/10    border-red-400/20'    },
    refunded:  { label: 'Refunded',  icon: RefreshCw,     classes: 'text-sky-400    bg-sky-400/10    border-sky-400/20'    },
};

const TYPE_CONFIG: Record<TransactionType, { icon: React.FC<{ size?: number; className?: string }>; amountClass: string }> = {
    sale:       { icon: ArrowDownLeft, amountClass: 'text-emerald-400' },
    withdrawal: { icon: ArrowUpRight,  amountClass: 'text-red-400'     },
    refund:     { icon: RefreshCw,     amountClass: 'text-sky-400'     },
    tip:        { icon: ArrowDownLeft, amountClass: 'text-purple-400'  },
};

const CONTENT_ICON: Record<ContentType, React.FC<{ size?: number; className?: string }>> = {
    shop:         ShoppingBag,
    illustration: ImageIcon,
    video:        Video,
    locked:       Lock,
};

function fmt(n: number): string {
    const abs = Math.abs(n).toFixed(2);
    return n < 0 ? `-$${abs}` : `+$${abs}`;
}

// ─────────────────────────────────────────────
// ROW COMPONENT
// ─────────────────────────────────────────────
interface TransactionRowProps {
    tx: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ tx }) => {
    const status  = STATUS_CONFIG[tx.status];
    const typeConf = TYPE_CONFIG[tx.type];
    const ContentTypeIcon = CONTENT_ICON[tx.contentType];
    const StatusIcon      = status.icon;
    const TypeIcon        = typeConf.icon;

    return (
        <div className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-transparent hover:bg-[#16161e] hover:border-[#2a2a35] transition-all duration-200 cursor-pointer">

            {/* Thumbnail */}
            <div className="relative shrink-0">
                <img
                // @TS-ignorenpm ru
                    src={tx?.image}
                    alt={tx.title}
                    className="w-11 h-11 rounded-xl object-cover border border-[#2a2a35]"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0d0d12] border border-[#2a2a35] flex items-center justify-center">
                    <ContentTypeIcon size={10} className="text-gray-400" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-white truncate">{tx.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={tx.buyerAvatar} alt={tx.buyerName} className="w-4 h-4 rounded-full object-cover" />
                    <span className="text-gray-500 text-[11px] truncate">{tx.buyerName}</span>
                    <span className="text-gray-700 text-[10px]">•</span>
                    <span className="text-gray-600 text-[11px] shrink-0">{tx.time}</span>
                </div>
            </div>

            {/* Status badge */}
            <div className={`hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full shrink-0 ${status.classes}`}>
                <StatusIcon size={10} />
                {status.label}
            </div>

            {/* Amount */}
            <div className="shrink-0 text-right">
                <div className={`flex items-center gap-1 justify-end font-bold text-sm ${typeConf.amountClass}`}>
                    <TypeIcon size={12} />
                    {fmt(tx.net)}
                </div>
                <div className="text-gray-600 text-[10px] mt-0.5">
                    fee ${tx.fee.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// SUMMARY STRIP
// ─────────────────────────────────────────────
const SummaryStrip: React.FC = () => {
    const totalEarned  = TRANSACTIONS.filter(t => t.type === 'sale' && t.status === 'completed').reduce((s, t) => s + t.net, 0);
    const totalPending = TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.net, 0);
    const totalRefunded = TRANSACTIONS.filter(t => t.type === 'refund').reduce((s, t) => s + t.amount, 0);

    const items = [
        { label: 'Earned',   value: `$${totalEarned.toFixed(2)}`,   color: 'text-emerald-400' },
        { label: 'Pending',  value: `$${totalPending.toFixed(2)}`,  color: 'text-amber-400'  },
        { label: 'Refunded', value: `$${totalRefunded.toFixed(2)}`, color: 'text-sky-400'    },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-5">
            {items.map(item => (
                <div key={item.label} className="bg-[#16161e] border border-[#2a2a35] rounded-2xl px-4 py-3 text-center">
                    <p className={`font-black text-base ${item.color}`}>{item.value}</p>
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-0.5">{item.label}</p>
                </div>
            ))}
        </div>
    );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const RecentTransactions: React.FC = () => {
    return (
        <div className="mt-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-black text-white tracking-tight">Transactions</h2>
            </div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Recent activity</p>
                <Link
                    href="/earnings/transactions"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                    View All <ArrowUpRight size={12} />
                </Link>
            </div>

            {/* Summary */}
            <SummaryStrip />

            {/* Transaction List */}
            <div className="space-y-1">
                {TRANSACTIONS.map(tx => (
                    <TransactionRow key={tx.id} tx={tx} />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;