import React from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#15131A] rounded-xl p-5 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name} 
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">
              {post.author.name}
            </h3>
            <p className="text-gray-400 text-xs">{post.timeAgo}</p>
          </div>
        </div>
        <div>
          {post.type === "free" ? (
            <span className="bg-[#2D1F35] text-[#D08BFF] text-xs px-3 py-1 rounded-full font-medium">
              Free
            </span>
          ) : (
            <span className="bg-[#351F26] text-[#FF8B94] text-xs px-3 py-1 rounded-full font-medium">
              Premium
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-white text-sm mb-4">
        {post.description}
      </p>

      {/* Image */}
      <div className="relative w-full h-125 overflow-hidden mb-5 bg-black/40">
        <Image
          src={post.imageUrl}
          alt="Post Cover"
          fill
          className="object-cover w-full h-full"
        />
        {post.type === "premium" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
            {/* Can add lock icon here if desired for feed view */}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-primary text-sm">
          <Heart className="w-4 h-4" />
          <span>{(post.likes / 1000).toFixed(1)}k</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-primary text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>{(post.commentsCount / 1000).toFixed(1)}k</span>
        </button>
      </div>
    </div>
  );
}
