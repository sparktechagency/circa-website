'use client'
import { Heart, MessageCircle } from 'lucide-react'
import React from 'react'
import { revalidate } from '../../../../../helpers/revalidateHelper';
import { myFetch } from '../../../../../helpers/myFetch';
import { toast } from 'sonner';

const PostCardButton = ({ post }: { post: any }) => {

  const handleToggleLike = async () => {
    const response = await myFetch(`/post/like/${post?._id}`, { method: "POST", body: { type: 'post' } });
    if (response?.success) {
      revalidate('feed-posts')
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
    <div className="flex gap-4">
      <button
        onClick={(e) => {
           e.preventDefault();  
          e.stopPropagation();
          handleToggleLike();
        }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-primary text-sm hover:bg-gray-800 transition"
      >
        <Heart
          className={`w-4 h-4 transition ${post?.isLiked ? "fill-primary text-primary" : "text-gray-400"
            }`}
        />
        <span>{post?.likeCount ?? 0}</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-primary text-sm">
        <MessageCircle className="w-4 h-4" />
        <span>{post.comment_count}</span>
      </button>
    </div>
  )
}

export default PostCardButton