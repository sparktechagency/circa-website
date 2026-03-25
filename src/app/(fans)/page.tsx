
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
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
        <button className="bg-[#F084A9] text-white  py-1.5 rounded-lg text-sm">
          Send a gift
        </button>
      </div>
      </div>
      <h2 className="text-3xl font-bold">Welcome to Circa</h2>
      <p className="text-gray-400">
        Navigate to Explore to see the 3-column layout in action, or Message for
        the chat layout.
      </p>
      <Link href="/home/post-details">
        <button className="bg-primary hover:bg-opacity-90 transition-all text-black font-semibold py-2.5 px-4 rounded-lg text-sm">
          Post Details
        </button>
      </Link>
    </div>
  );
}
