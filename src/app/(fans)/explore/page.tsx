import React from "react";

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-[#242424] pb-2 text-sm text-gray-400">
        <button className="text-white border-b-2 border-primary pb-2 font-medium px-2">
          Browse Creators
        </button>
        <button className="pb-2 px-2 hover:text-white">My Creator</button>
        <button className="pb-2 px-2 hover:text-white">
          Friends & Flirting
        </button>
      </div>

      <div className="flex gap-3 text-sm">
        <button className="bg-primary text-black px-4 py-1.5 rounded-full font-medium">
          All
        </button>
        <button className="bg-[#1a1a1e] border border-[#242424] px-4 py-1.5 rounded-full hover:bg-[#242424] transition-colors">
          Musician
        </button>
        <button className="bg-[#1a1a1e] border border-[#242424] px-4 py-1.5 rounded-full hover:bg-[#242424] transition-colors">
          Artist
        </button>
        <button className="bg-[#1a1a1e] border border-[#242424] px-4 py-1.5 rounded-full hover:bg-[#242424] transition-colors">
          Singer
        </button>
        <button className="bg-[#1a1a1e] border border-[#242424] px-4 py-1.5 rounded-full hover:bg-[#242424] transition-colors">
          Videos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-2xl bg-[#141416] relative overflow-hidden group border border-[#242424]"
          >
            <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-600 opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <h3 className="font-bold text-lg text-white">Sarah Chen</h3>
              <p className="text-sm text-gray-300">Visual Artist</p>
              <p className="text-xs text-gray-400 mt-1">1,234 members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
