import { ArrowLeft, Heart, MessageCircle, MoreHorizontal, Palette, Share2, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import PostEditModal, { DEFAULT_POST_DATA } from './PostEditModal';

const postData = {
    title: "Just Finished a new watercolor piece!",
    author: "Michel Lin",
    time: "2 hour ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    mainImage: "/post-image.png",
    likes: "1.2k",
    commentsCount: 122,
    description: `Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight! 

This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.`
};



const PostInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedPost, setSelectedPost] = useState('');
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-white/5">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-semibold text-sm">Back</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Share2 size={20} />
                </button>
            </div>


            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={postData?.avatar}
                            alt={postData.author}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/20"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0d12]"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">{postData.author}</h3>
                        <p className="text-gray-500 text-xs">{postData.time}</p>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="p-2 text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Main Post Image */}
            <div className="rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 shadow-2xl bg-[#1a1a24]">
                <img
                    src={postData.mainImage}
                    alt="Watercolor Piece"
                    className="w-full aspect-[4/5] sm:aspect-square object-cover"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
                <button className="flex items-center gap-2.5 bg-[#1a1a24] border border-[#2a2a35] px-6 py-3 rounded-full hover:border-purple-500/50 transition-all group">
                    <Heart size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-400 font-bold text-sm">{postData.likes}</span>
                </button>
                <button className="flex items-center gap-2.5 bg-[#1a1a24] border border-[#2a2a35] px-6 py-3 rounded-full hover:border-purple-500/50 transition-all group">
                    <MessageCircle size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-400 font-bold text-sm">{postData.likes}</span>
                </button>
            </div>

            {/* Post Text Content */}
            <article className="space-y-4 mb-10">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    {postData.title} <Palette className="inline-block ml-1" size={24} /> <Sparkles className="inline-block" size={24} />
                </h1>
                <div className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line opacity-90">
                    {postData.description}
                </div>
            </article>

            <PostEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={DEFAULT_POST_DATA}   // optional, falls back to DEFAULT_POST_DATA
                onUpdate={(updated) => console.log(updated)}  // optional callback
            />
        </div>
    )
}

export default PostInfo