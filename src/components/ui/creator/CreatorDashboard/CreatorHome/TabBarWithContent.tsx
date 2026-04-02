'use client'
import React, { useState } from "react";
import PostCard from "./PostCard";
import ShopCard from "./ShopCard";
import { Post } from "@/types";


const posts = [
  { id: 1, title: 'Just done my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200', locked: true },
  { id: 2, title: 'Just done my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200', duration: '10:12' },
  { id: 3, title: 'Just done my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200', locked: true },
  { id: 4, title: 'Just done my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=200', isIllustration: true },
  { id: 5, title: 'Just done my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200', duration: '10:12' },
];
const shops = [
  { id: 1, title: 'Shops Shops my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200', locked: true },
  { id: 2, title: 'Shops Shops my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200', duration: '10:12' },
  { id: 3, title: 'Shops Shops my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200', locked: true },
  { id: 4, title: 'Shops Shops my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=200', isIllustration: true },
  { id: 5, title: 'Shops Shops my new paint', time: '2 hr ago', likes: '2.4k', comments: '1.4k', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200', duration: '10:12' },
];
const TabBarWithContent = ({ posts }: { posts: Post[] }) => {
  const [activeTab, setActiveTab] = useState('Post');

  return (
    <div className="">


      <div className="flex border-b border-gray-800 mb-6">
        {['Post', 'Shop'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full py-3 font-semibold transition-all relative ${activeTab === tab
              ? 'text-primary'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {
        activeTab === 'Post' ? (
          <div className="space-y-2 pb-20">
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>) : (
          <div className="space-y-2 pb-20">
            {shops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default TabBarWithContent;