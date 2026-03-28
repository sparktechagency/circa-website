import Link from "next/link";
import { MOCK_POSTS } from "@/constants/home-data";
import PostCard from "@/components/ui/fans/home/PostCard";

export default function HomePage() {


  return (
    <div className="space-y-6 pb-10">
      <div
        className=" h-34 w-full rounded-lg overflow-hidden flex  items-center justify-start px-6"
        style={{
          backgroundImage: "url('/homeBanner.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      > 
      <div className="flex flex-col gap-2"> 
        <div className="font-extrabold text-[#BDDDFF] max-w-xs tracking-widest">
          <span>Become <span className="text-white"> a  <br />
            SANTA  </span>  <br /> 
            for your creators</span>
        </div> 
        <div className="max-w-28 text-center bg-[#F084A9] text-white  py-1.5 rounded-full text-sm">
          Send a gift
        </div>
      </div>
      </div>

      
      {/* Posts Feed Grid */}
      <div className="grid grid-cols-1  gap-6">
        {MOCK_POSTS.map(post => (
          <Link href={`/home/post-details?type=${post.type}`} key={post.id}>
             <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
