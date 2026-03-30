import CreditsModal from "@/components/modals/fans/CreditsModal";
import SendGiftModal from "@/components/modals/fans/SendGiftModal";
import { Heart, Lock, MessageCircle } from "lucide-react";
import Image from "next/image";
import { imgUrl } from "../../../../../../helpers/imgUrl";
import PostComments from "./PostComments";

interface PostDetailsLayoutProps {
  post: any;
}

export default function PostDetailsLayout({ post }: PostDetailsLayoutProps) {
  const isPremium = post?.isPrimium; // ✅ matches API typo "isPrimium"

  const authorImage = post?.user?.image;
  const authorName = post?.user?.name;
  const postImage = post?.images?.[0]; // ✅ images is an array
  const likeCount = post?.likeCount ?? post?.like_count ?? 0;
  const commentCount = post?.comment_count ?? 0;

  return (
    <div className="w-full mx-auto bg-[#0a0a0a] min-h-screen text-white pb-10">
      {/* Left Column - Main Post Content */}
      <div className="flex flex-col">
        {/* Post Card */}
        <div className="bg-[#1C1A24] rounded-2xl p-5 mb-6 border border-gray-800">

          {/* Header Row (Avatar, Name, Time) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src={imgUrl + authorImage}
                  alt={authorName}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{authorName}</span>
                <span className="text-gray-400 text-xs">{post.timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Main Image — only render if image exists */}
          {postImage && (
            <div className="relative w-full rounded-xl overflow-hidden mb-4 bg-red-100">
              <div className="h-136.25 w-full relative">
                <Image
                  src={ imgUrl + postImage}
                  alt="Post Image"
                  fill
                  className="object-cover w-full h-full transition-all duration-300"
                />
              </div>
              <SendGiftModal />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-5 pb-5 text-primary border-b border-[#2D2D2D]">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 hover:text-white hover:bg-white/5 transition-colors text-sm">
              <Heart className="w-4 h-4" />
              <span>
                {likeCount >= 1000
                  ? `${(likeCount / 1000).toFixed(1)}k`
                  : likeCount}
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 hover:text-white hover:bg-white/5 transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>
                {commentCount >= 1000
                  ? `${(commentCount / 1000).toFixed(1)}k`
                  : commentCount}
              </span>
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

            {/* Lock / Upgrade Box — Premium */}
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
           
          </div>
        </div>

       <PostComments post={post}/>
      </div>
    </div>
  );
}