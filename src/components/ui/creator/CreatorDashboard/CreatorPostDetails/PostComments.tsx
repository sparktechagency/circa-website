import { Heart, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
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


  const CommentItem = ({ user, text, time, likes, avatar }:any) => (
  <div className="flex gap-4 group">
    <img src={avatar} alt={user} className="w-10 h-10 rounded-full object-cover shrink-0 mt-1" />
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-sm text-white">{user}</span>
        <span className="text-gray-500 text-[10px]">• {time}</span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-3">
        {text}
      </p>
      <div className="flex gap-6">
        <button className="text-gray-500 text-xs flex items-center gap-1.5 hover:text-pink-400 transition-colors">
          <Heart size={14} /> {likes}
        </button>
        <button className="text-gray-500 text-xs font-semibold hover:text-white transition-colors">
          Reply
        </button>
      </div>
    </div>
  </div>
);

const PostComments = () => {
      const [comment, setComment] = useState("");
    
  return (     
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            Comments <span className="text-gray-500 font-medium">({postData.commentsCount})</span>
          </h2>

          {/* Comment Input */}
          <div className="flex gap-4 items-center mb-12">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20" 
              alt="Current User" 
            />
            <div className="flex-1 relative group">
              <input 
                type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..." 
                className="w-full bg-[#1a1a24] border border-[#2a2a35] rounded-full py-3.5 px-6 text-sm focus:outline-none focus:border-purple-500/60 transition-all placeholder:text-gray-600"
              />
              <button className={`absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 p-1 rounded-full transition-opacity ${comment ? 'opacity-100' : 'opacity-0'}`}>
                <Sparkles size={18} />
              </button>
            </div>
          </div>

          {/* Comment Thread */}
          <div className="space-y-10 pb-20">
            <CommentItem 
              user="Takács Bianka" 
              time="19min" 
              likes="142" 
              text="The lighting in this one is absolutely incredible. Your growth as an artist is inspiring! 🔥"
              avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            />
            <CommentItem 
              user="Takács Bianka" 
              time="19min" 
              likes="142" 
              text="The lighting in this one is absolutely incredible. Your growth as an artist is inspiring! 🔥"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            />
          </div>
        </section>
  )
}

export default PostComments