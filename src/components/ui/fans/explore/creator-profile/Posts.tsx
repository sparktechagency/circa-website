import Image from "next/image";
import { Heart, Lock } from "lucide-react";
import Link from "next/link";
import { postsData } from "@/constants/explore-data";
import { imageFormatter } from "../../../../../../helpers/imageFormatter";

const Posts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-4 pb-12">
      {postsData.map((post) => (
        <Link href={`/explore/creator-profile/post-details?type=${post.isLocked ? "premium" : "free"}`} key={post.id} className="flex flex-col gap-3 group cursor-pointer">
          <div className="relative w-full rounded-[22px] overflow-hidden bg-[#1c1c20]">
            <Image
              src={imageFormatter(post.image)}
              width={500}
              height={300}
              className={`object-cover  h-[300px] transition-transform duration-500 group-hover:scale-105 ${post.isLocked ? 'brightness-75' : ''}`}
              alt={post.title}
            />

            {/* Likes Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Heart size={14} className="text-[#D4D4D8]" />
              <span className="text-white text-[13px] font-medium tracking-wide">
                {post.likes}
              </span>
            </div>

            {/* Locked Overlay */}
            {post.isLocked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full bg-white/10 backdrop-blur-sm py-3.5 flex items-center justify-center gap-2 border-y border-white/20 shadow-xl">
                  <Lock size={15} className="text-white" />
                  <span className="text-white text-[15px] font-medium tracking-wide">
                    Locked
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="px-1">
            <h3 className="text-white font-medium text-[15px] truncate">
              {post.title}
            </h3>
            <p className="text-[#A1A1AA] text-sm mt-0.5 font-light tracking-wide">
              {post.time}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;