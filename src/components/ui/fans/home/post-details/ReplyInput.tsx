'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { SendHorizonal } from 'lucide-react'
import { myFetch } from '../../../../../../helpers/myFetch'
import { revalidate } from '../../../../../../helpers/revalidateHelper'
import { imgUrl } from '../../../../../../helpers/imgUrl'
import { toast } from 'sonner'

interface ReplyInputProps {
    commentId: string;
    profileData: any;
    onClose: () => void;
}

const ReplyInput = ({ commentId, profileData, onClose }: ReplyInputProps) => {
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReply = async () => {
        if (!reply.trim()) return;
        setLoading(true);
        try {
            const response = await myFetch(`/post/comment/${commentId}`, {
                method: 'POST',
                body: { type: "comment", comment_text: reply },
            });
            if (response?.success) {
                revalidate("comments");
                setReply('');
                onClose();
            } else {
                if (response?.error && Array.isArray(response.error)) {
                    response.error.forEach((err: { message: string }) => {
                        toast.error(err.message, { id: "Reply" });
                    });
                } else {
                    toast.error(response?.message || "Something went wrong!", { id: "Reply" });
                }
            }
        } catch (error) {
            console.error('Failed to post reply:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleReply();
        if (e.key === 'Escape') onClose();
    };

    const isEmpty = !reply.trim();

    return (
        <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-700 relative">
                <Image
                    src={profileData?.image ? imgUrl + profileData.image : '/asset/default.jpg'}
                    alt={profileData?.name || 'User'}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 bg-[#1A1A24] rounded-full border border-gray-700 px-3 py-2 flex items-center gap-2">
                <input
                    autoFocus
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write a reply..."
                    className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-500"
                />
                <button
                    onClick={handleReply}
                    disabled={isEmpty || loading}
                    className={`shrink-0 p-1 rounded-full transition-all duration-200
                        ${isEmpty || loading
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-[#7971FF] hover:bg-[#7971FF]/10 cursor-pointer'
                        }`}
                >
                    <SendHorizonal className="w-3.5 h-3.5" />
                </button>
            </div>
            <button
                onClick={onClose}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors shrink-0"
            >
                Cancel
            </button>
        </div>
    );
};

export default ReplyInput;