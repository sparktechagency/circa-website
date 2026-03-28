
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { FRIENDS_FLIRTING, RECENTLY_ACTIVE, TOP_CREATORS } from "@/constants/home-data";

const HomeRightSide = () => {
  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Top Creator Section */}
      <div className="bg-[#15131A] border border-[#2D2D2D] rounded-2xl p-5">
        <div className="mb-5 border-b border-[#2D2D2D] pb-4">
          <h3 className="flex items-center gap-2 text-base font-normal text-white mb-0.5">
            <span>🏵️</span> Top Creator
          </h3>
          <p className="text-gray-400 text-xs font-medium ">
            Most supported this week
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          {TOP_CREATORS.map((creator) => (
            <div key={creator.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full relative overflow-hidden">
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{creator.name}</h4>
                  <p className="text-xs text-gray-400">{creator.gifts}</p>
                </div>
              </div>
              <button className="bg-[#3D2A42] p-2 rounded-lg flex items-center justify-center hover:bg-[#4d3553] transition-colors">
                 {/* Replicating the little gift icon with emoji or lucide */}
                 <span className="text-sm">🎁</span>
              </button>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#5E699B33] hover:bg-[#2F2C3D] text-gray-300 font-medium py-2.5 rounded-xl text-xs transition-colors">
          View All
        </button>
      </div>

      {/* Recently Active Section */}
      <div className="bg-[#15131A] border border-gray-800/80 rounded-2xl p-5">
        <div className="mb-5 border-b border-[#2D2D2D] pb-4">
          <h3 className="flex items-center gap-2 text-base font-normal text-white mb-0.5">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#18C964]">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#18C964] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            Recently Active
          </h3>
          <p className="text-gray-400 text-xs font-medium ">Online Now</p>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          {RECENTLY_ACTIVE.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full relative overflow-hidden">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{user.name}</h4>
                  <p
                    className={`text-xs ${
                      user.isOnline ? "text-[#18C964]" : "text-gray-400"
                    }`}
                  >
                    {user.status}
                  </p>
                </div>
              </div>
              <button className="bg-[#1A233A] p-2 rounded-lg flex items-center justify-center text-[#3B82F6] hover:bg-[#1E294A] transition-colors">
                <MessageCircle size={14} className="fill-current" />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#252330] hover:bg-[#2F2C3D] text-gray-300 font-semibold py-2.5 rounded-xl text-xs transition-colors">
          View All
        </button>
      </div>

      {/* Friends & Flirting Section */}
      <div className="bg-[#15131A] border border-gray-800/80 rounded-2xl p-5">
        <div className="mb-5 border-b border-[#2D2D2D] pb-4">
          <h3 className="flex items-center gap-2 text-base font-normal text-white">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#18C964]">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            Friends & Flirting
          </h3>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          {FRIENDS_FLIRTING.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full relative overflow-hidden shrink-0">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white">{user.name}</h4>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#252330] hover:bg-[#2F2C3D] text-gray-300 font-semibold py-2.5 rounded-xl text-xs transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default HomeRightSide;
