import { Heart, MessageCircle, Lock, } from "lucide-react";
import { Post } from "@/types/post";
import Image from "next/image";
import SendGiftModal from "@/components/modals/fans/SendGiftModal";
import CreditsModal from "@/components/modals/fans/CreditsModal";

interface PostDetailsLayoutProps {
  post: Post;
}

export default function PostDetailsLayout({ post }: PostDetailsLayoutProps) {
  const isPremium = post.type === "premium";

  return (
    <div className=" w-full  mx-auto bg-[#0a0a0a] min-h-screen text-white pb-10">
      {/* Left Column - Main Post Content */}
      <div className="flex flex-col">
        {/* Post Card */}
        <div className="bg-[#1C1A24] rounded-2xl p-5 mb-6 border border-gray-800">
          {/* Header Row (Avatar, Name, Time) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.name} 
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{post.author.name}</span>
                <span className="text-gray-400 text-xs">{post.timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative w-full rounded-xl overflow-hidden mb-4 bg-red-100"> 
          <div className="h-136.25 w-full relative"> 
            <Image
              src={post.imageUrl}
              alt="Post Image"
              fill
              className={`object-cover w-full h-full transition-all duration-300`}
            />
          </div>
            {!isPremium && (
           <SendGiftModal />
            )}
            
            {isPremium && (
   <SendGiftModal />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-5 pb-5 text-primary border-b border-[#2D2D2D]  ">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700  hover:text-white hover:bg-white/5 transition-colors text-sm">
              <Heart className="w-4 h-4" />
              <span>{(post.likes / 1000).toFixed(1)}k</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700  hover:text-white hover:bg-white/5 transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>{(post.commentsCount / 1000).toFixed(1)}k</span>
            </button>
          </div>

          {/* Content */}
          <div className="relative">
            <h2 className="text-xl font-bold mb-3">{post.title}</h2>
            
            <p className={`text-gray-300 leading-relaxed text-sm ${isPremium ? "blur-sm select-none opacity-90" : ""}`}>
              {post.description}
              {isPremium && (
                <>
                  <br /><br />
                  This part of the post is hidden. You need to upgrade your membership to view the full details of this exclusive content. 
                  Enjoy the beautiful art and story behind it.
                </>
              )}
            </p>

            {/* Lock / Upgrade Box */}
            {isPremium && (
              <div className="mt-8 bg-[#2b3047] border border-primary rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Exclusive Post</h4>
                    <p className="text-xs text-gray-400">Upgrade membership to view the post</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#7971FF] hover:bg-[#6c64e6] text-white text-xs font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                    Membership plan
                  </button>
                  <CreditsModal />
                </div>
              </div>
            )}
            
            {!isPremium && (
               <div className="mt-8 bg-[#2A2B3D] border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                   <Lock className="w-5 h-5 text-gray-300" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-sm">Upgrade Membership</h4>
                   <p className="text-xs text-gray-400">Unlock to see the full Photo from today</p>
                 </div>
               </div>
               <div>
                 <button className="bg-[#7971FF] hover:bg-[#6c64e6] text-white text-xs font-medium px-6 py-2 rounded-full transition-colors">
                   Membership plan
                 </button>
               </div>
             </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-1">
          <h3 className="font-semibold text-lg mb-4">Comments (122)</h3>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-700">
               <img src="https://i.pravatar.cc/150?u=current" alt="Current User" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 bg-[#1A1A24] rounded-full border border-gray-800 px-4 py-3 flex items-center">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-6">
             {/* Mock Comment 1 */}
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                 <img src="https://i.pravatar.cc/150?u=user1" alt="User 1" className="object-cover w-full h-full" />
               </div>
               <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                   <span className="font-semibold text-sm text-gray-200">Takács Bianka</span>
                   <span className="text-xs text-gray-500">• 19min</span>
                 </div>
                 <p className="text-sm text-gray-300 mb-2">
                   The lighting in this one is absolutely incredible. Your growth as an artist is inspiring! 🔥
                 </p>
                 <div className="flex flex-row items-center gap-3 text-xs text-gray-400 font-medium">
                   <button className="flex items-center gap-1 hover:text-white transition-colors">
                     <Heart className="w-3.5 h-3.5" /> 142
                   </button>
                   <button className="hover:text-white transition-colors">Reply</button>
                 </div>
               </div>
             </div>
             
             {/* Mock Comment 2 */}
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                 <img src="https://i.pravatar.cc/150?u=user2" alt="User 2" className="object-cover w-full h-full" />
               </div>
               <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                   <span className="font-semibold text-sm text-gray-200">Elena Rostova</span>
                   <span className="text-xs text-gray-500">• 1h</span>
                 </div>
                 <p className="text-sm text-gray-300 mb-2">
                   The textures are so well rendered! Looking forward to the time-lapse.
                 </p>
                 <div className="flex flex-row items-center gap-3 text-xs text-gray-400 font-medium">
                   <button className="flex items-center gap-1 hover:text-white transition-colors">
                     <Heart className="w-3.5 h-3.5" /> 23
                   </button>
                   <button className="hover:text-white transition-colors">Reply</button>
                 </div>
               </div>
             </div>

          </div>
        </div>
      </div>

      {/* Right Column - User Info & Subscriptions */}

    </div>
  );
}
