'use client'

import { Heart, MessageCircle } from 'lucide-react'
import React from 'react'
import { myFetch } from '../../../../../../helpers/myFetch';
import { toast } from 'sonner';
import { revalidate } from '../../../../../../helpers/revalidateHelper';
import { FaHeart } from 'react-icons/fa';

const LikeCommentButton = ({ post }: any) => {
    const likeCount = post?.likeCount ?? post?.like_count ?? 0;
    const commentCount = post?.comment_count ?? 0;
    const isLike = !!post?.isLike;


    const handleToggleLike = async () => {
        const response = await myFetch(`/post/like/${post?._id}`,  {method: "POST", body: {type: 'post'}});
        if (response?.success) {
            revalidate('single-post')            
        } else {
            if (response?.error && Array.isArray(response.error)) {
                response.error.forEach((err: { message: string }) => {
                    toast.error(err.message, { id: "sign-up" });
                });
            } else {
                toast.error(response?.message || "Something went wrong!", {
                    id: "sign-up",
                });
            }
        }
    }
    return (
        <div className="flex gap-4 mb-5 pb-5 text-primary border-b border-[#2D2D2D]">
            <button onClick={()=>handleToggleLike()} className="cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 hover:text-white hover:bg-white/5 transition-colors text-sm">
               {isLike ?  <FaHeart color={`var(--color-primary)`} className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                <span>
                    {likeCount >= 1000
                        ? `${(likeCount / 1000).toFixed(1)}k`
                        : likeCount}
                </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 hover:text-white hover:bg-white/5 transition-colors text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>
                    {commentCount >= 1000
                        ? `${(commentCount / 1000).toFixed(1)}k`
                        : commentCount}
                </span>
            </button>
        </div>
    )
}

export default LikeCommentButton