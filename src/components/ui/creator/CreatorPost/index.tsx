"use client";

import { useState } from "react";
import {
  Plus, Globe, Star, Crown, Heart, MessageCircle,
  MoreHorizontal, Lock, Eye, EyeOff, Calendar, Image as ImageIcon,
  Search, Filter, Trash2, Edit2
} from "lucide-react";
import CreatePostModal, { PostFormData } from "./CreatePostModal";

const DEMO_POSTS: PostFormData[] = [
  {
    id: "1",
    title: "Behind the scenes 🎬",
    description: "Sneak peek from today's shoot. It was an amazing day, can't wait to share more with everyone!",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&q=80",
    imageFile: null,
    visibility: "everyone",
    onlyMe: false,
    hideLikes: false,
    hideComments: false,
    nsfw: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Exclusive content drop 💎",
    description: "This one is only for my subscribers. Thank you all for the continued support — it means the world!",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    imageFile: null,
    visibility: "subscribers",
    onlyMe: true,
    hideLikes: true,
    hideComments: false,
    nsfw: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Gold members only ✨",
    description: "A very special post just for my Gold Tires members. You guys are incredible!",
    image: null,
    imageFile: null,
    visibility: "gold",
    onlyMe: false,
    hideLikes: false,
    hideComments: true,
    nsfw: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    scheduled: new Date(Date.now() + 86400000).toISOString(),
  },
];

const visibilityConfig = {
  everyone: { icon: Globe, label: "Everyone", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/20" },
  subscribers: { icon: Star, label: "Subscribers", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/20" },
  gold: { icon: Crown, label: "Gold Tiers", color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/20" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function PostCard({
  post,
  onDelete,
}: {
  post: PostFormData;
  onDelete: (id: string) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [likes] = useState(Math.floor(Math.random() * 500 + 20));
  const [comments] = useState(Math.floor(Math.random() * 80 + 5));
  const [menuOpen, setMenuOpen] = useState(false);
  const vis = visibilityConfig[post.visibility as keyof typeof visibilityConfig];
  const VisIcon = vis.icon;
  const isScheduled = post.scheduled && new Date(post.scheduled) > new Date();

  return (
    <div className="group relative bg-[#12131a] border border-white/8 rounded-2xl overflow-hidden hover:border-white/16 transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
      {/* Image */}
      {post.image ? (
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-transparent" />
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            {post.nsfw && (
              <span className="text-xs font-bold bg-red-500/90 text-white px-2 py-0.5 rounded-full">18+</span>
            )}
            {isScheduled && (
              <span className="text-xs font-medium bg-amber-500/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                <Calendar size={10} /> Scheduled
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="h-28 bg-gradient-to-br from-[#1c1d27] to-[#16172070] flex items-center justify-center border-b border-white/5">
          <ImageIcon size={32} className="text-white/10" />
          {isScheduled && (
            <span className="absolute top-3 left-3 text-xs font-medium bg-amber-500/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
              <Calendar size={10} /> Scheduled
            </span>
          )}
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-base leading-tight truncate">{post.title || "Untitled Post"}</h3>
            {post.description && (
              <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{post.description}</p>
            )}
          </div>

          {/* Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
            >
              <MoreHorizontal size={15} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 z-20 w-36 bg-[#1c1d27] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                  <Edit2 size={13} /> Edit post
                </button>
                <button
                  onClick={() => { onDelete(post.id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${vis.bg} ${vis.color}`}>
            <VisIcon size={11} />
            {vis.label}
          </span>

          {post.onlyMe && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/8">
              <Lock size={10} /> Only me
            </span>
          )}
          {post.hideLikes && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/8">
              <EyeOff size={10} /> Likes hidden
            </span>
          )}
          {post.hideComments && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/8">
              <EyeOff size={10} /> Comments off
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-red-400" : "text-gray-600 hover:text-red-400"}`}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              <span>{likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
              <MessageCircle size={14} />
              <span>{comments}</span>
            </button>
          </div>
          <span className="text-xs text-gray-600">{timeAgo(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default function CreatorPost() {
  const [posts, setPosts] = useState<PostFormData[]>(DEMO_POSTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "everyone" | "subscribers" | "gold">("all");

  const handlePublish = (post: PostFormData) => {
    setPosts((prev) => [post, ...prev]);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.visibility === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#0d0e14] text-white">
      {/* Top Nav */}
      <div className="border-b border-white/8 bg-[#0d0e14]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">Posts</h1>
            <p className="text-gray-600 text-xs mt-0.5">{posts.length} total posts</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>
      </div>

      <div className=" mx-auto px-6 py-8 space-y-6">
        {/* Search + Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-[#12131a] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-600" />
            {(["all", "everyone", "subscribers", "gold"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all border
                  ${filter === f
                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                    : "bg-[#12131a] border-white/8 text-gray-500 hover:text-white hover:border-white/20"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Public", count: posts.filter(p => p.visibility === "everyone").length, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { label: "Subscribers", count: posts.filter(p => p.visibility === "subscribers").length, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
            { label: "Gold Tiers", count: posts.filter(p => p.visibility === "gold").length, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl border px-4 py-3 ${stat.bg}`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Post Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#12131a] border border-white/8 flex items-center justify-center">
              <ImageIcon size={28} className="text-white/20" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">No posts found</p>
              <p className="text-gray-600 text-sm mt-1">
                {search ? "Try a different search term" : "Create your first post"}
              </p>
            </div>
            {!search && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all mt-2"
              >
                <Plus size={16} /> Create Post
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <CreatePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}