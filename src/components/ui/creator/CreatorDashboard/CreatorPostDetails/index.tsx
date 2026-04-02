'use client';
import {
  Lock
} from 'lucide-react';
import PostComments from './PostComments';
import PostInfo from './PostInfo';
import { Comment, Post } from '@/types';

const MembershipCard = () => (
  <div className="bg-[#1a1a24] border border-purple-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 my-8 shadow-xl shadow-purple-500/5">
    <div className="flex items-center gap-4 text-center sm:text-left">
      <div className="w-14 h-14 rounded-2xl bg-[#2a2a35] flex items-center justify-center text-purple-400 border border-white/5 shadow-inner">
        <Lock size={24} />
      </div>
      <div>
        <h4 className="font-normal text-white text-base">Upgrade Membership</h4>
        <p className="text-gray-400 text-xs mt-0.5">Unlock to see the full Photo from today</p>
      </div>
    </div>
    <button className="w-full sm:w-auto bg-linear-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white text-sm font-normal px-8 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
      Membership plan
    </button>
  </div>
);


export default function CreatorPostDetails({ post, comments }: { post: Post, comments: Comment[] }) {

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white selection:bg-purple-500/30">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <PostInfo post={post} />
        <MembershipCard />
        <PostComments comments={comments} />
      </main>
    </div>
  );
}