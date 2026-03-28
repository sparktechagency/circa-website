"use client";
import { useState } from "react";
import { creatorsData } from "@/constants/explore-data";
import { useRouter } from "next/navigation";

const categories = ["All", "Musician", "Artist", "Singer", "Videos"];

const BrowseCreators = () => {
  const [activeTab, setActiveTab] = useState("All"); 
  const router = useRouter()

  // Filter logic for clicking buttons
  const filteredCreators = creatorsData.filter(creator => {
    if (activeTab === "All") return true;
    return creator.categoryType === activeTab;
  });

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors whitespace-nowrap outline-none ${
              activeTab === category
                ? "bg-[#9EA4F9] text-white"
                : "bg-[#1A1A1F] text-[#A1A1AA] border border-[#2A2A30] hover:bg-[#2A2A30] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id} 
            onClick={() => router.push("/explore/creator-profile")}
            className="group relative rounded-2xl overflow-hidden border border-[#2A2A30] cursor-pointer bg-[#1c1c20]"
          >
            <img
              src={creator.imageUrl}
              alt={creator.name}
              className="object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Gradient Dark Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-5 pt-20">
              <h3 className="text-white text-[19px] font-medium mb-0.5">
                {creator.name}
              </h3>
              <p className="text-[#D4D4D8] text-[14px]">
                {creator.category}
              </p>
              <p className="text-[#A1A1AA] text-[13px] mt-0.5">
                {creator.members}
              </p>
            </div>
          </div>
        ))}

        {filteredCreators.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 text-[15px]">
            No creators found in this timeline category.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCreators;