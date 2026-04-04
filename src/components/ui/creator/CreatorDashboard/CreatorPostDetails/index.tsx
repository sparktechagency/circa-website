'use client';
import PostComments from './PostComments';
import PostInfo from './PostInfo';
import { Comment, Post, User } from '@/types';


export default function CreatorPostDetails({ post, comments, user }: { post: Post, comments: Comment[], user: User }) {

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white selection:bg-purple-500/30">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <PostInfo post={post} />
        <PostComments comments={comments} user={user} postId={post?._id} />
      </main>
    </div>
  );
}