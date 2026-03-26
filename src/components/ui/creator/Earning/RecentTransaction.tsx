import {
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TransactionType = 'sale' | 'withdrawal' | 'refund' | 'tip';
export type ContentType = 'shop' | 'illustration' | 'video' | 'locked';

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



function fmt(n: number): string {
    const abs = Math.abs(n).toFixed(2);
    return n < 0 ? `-$${abs}` : `+$${abs}`;
}


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
                    href="/transactions"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                    View All <ArrowUpRight size={12} />
                </Link>
            </div>

            {/* Transaction List */}
            <div className="space-y-1">
                {TRANSACTIONS.map((tx, index) => (
                    <div key={index} className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-transparent hover:bg-[#16161e] hover:border-[#2a2a35] transition-all duration-200 cursor-pointer">
                        {/* Thumbnail */}
                        <div className="relative shrink-0">
                            <img
                                // @TS-ignorenpm ru
                                src={tx?.image}
                                alt={tx.title}
                                className="w-11 h-11 rounded-xl object-cover border border-[#2a2a35]"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0d0d12] border border-[#2a2a35] flex items-center justify-center">
                                {/* <ContentTypeIcon size={10} className="text-gray-400" /> */}
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
                        {/* Amount */}
                        <div className="shrink-0 text-right">
                            <div className={`flex items-center gap-1 justify-end text-sm text-emerald-400`}>
                                {fmt(tx.net)}
                            </div>
                            <div className="text-primary text-sm mt-0.5">
                                Shop
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;