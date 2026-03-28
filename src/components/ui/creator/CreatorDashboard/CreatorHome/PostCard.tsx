import { Heart, Lock, MessageCircle, MoreVertical } from "lucide-react";
import Link from "next/link";

export interface Post {
    id: number;
    title: string;
    timeAgo: string;
    likes: string;
    comments: string;
    thumbnail: string;
    isLocked?: boolean;
    duration?: string;
}


const PostCard = ({ post }:any) => {
    return (
       <Link href={`/post/${post.id}`}>
        <div            
            className="border-b border-[#2a2a35] py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
        >
            <div className="flex items-center gap-4 flex-1">
                <div className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${post.isIllustration ? 'bg-yellow-100 p-2' : ''}`}>
                    <img
                        src={post.image}
                        alt={post.title}
                        className={`w-full h-full object-cover ${post.isIllustration ? 'object-contain' : ''}`}
                    />
                    {post.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] px-1 rounded font-mono">
                            {post.duration}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-md leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">{post.time}</p>
                    <div className="flex gap-4 mt-3">
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 cursor-pointer hover:text-pink-400 transition-colors">
                            <Heart size={14} /> {post.likes}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 cursor-pointer hover:text-purple-400 transition-colors">
                            <MessageCircle size={14} /> {post.comments}
                        </span>
                    </div>
                </div>
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-400 transition-colors">
                {post.locked ? <Lock size={18} /> : <MoreVertical size={18} />}
            </button>
        </div>
        </Link>
    );
};

export default PostCard;