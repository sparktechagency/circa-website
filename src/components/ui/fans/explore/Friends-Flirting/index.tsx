"use client";
import React, { useState, useEffect } from "react";
import { X, Heart, Star, Filter, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { friendsData } from "@/constants/explore-data";
import WowModal from "@/components/modals/fans/WowModal";
import FilterDropdown from "./FilterDropdown";

const FriendsFlirting = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full relative pb-10">
      {/* Top Filter Button */}
      <div className="flex justify-end mb-4">
        <FilterDropdown />
      </div>

      <div className="flex flex-col items-center">
        {/* Main Carousel Area */}
        <Carousel 
          setApi={setApi} 
          className="w-full max-w-[480px]"
        >
          <CarouselContent>
            {friendsData.map((friend) => (
              <CarouselItem key={friend.id}>
                <div className="bg-[#20232c] rounded-[24px] overflow-hidden border border-[#2E2E36] shadow-xl">
                  {/* Card Image */}
                  <div className="relative w-full h-[410px]">
                    <img
                      src={friend.imageUrl}
                      alt={friend.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Card Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h2 className="text-[22px] font-medium text-white">
                        {friend.name}, {friend.age}
                      </h2>
                      {friend.isOnline && (
                        <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <span className="text-[#EAB308] text-sm">✨</span>
                      <span className="text-[#06B6D4] font-medium text-[15px]">
                        {friend.role}
                      </span>
                    </div>
                    
                    <p className="text-[#9AA0A6] text-[15px] leading-relaxed">
                      {friend.bio}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav Chevrons (Outside Card) */}
          <CarouselPrevious className="hidden lg:flex -left-[120px] bg-[#222228] border-none text-white w-[80px] h-[80px] shadow-lg hover:bg-[#34343a] hover:text-white [&_svg]:!w-8 [&_svg]:!h-8" />
          <CarouselNext className="hidden lg:flex -right-[120px] bg-[#222228] border-none text-white w-[80px] h-[80px] shadow-lg hover:bg-[#34343a] hover:text-white [&_svg]:!w-8 [&_svg]:!h-8" />
        </Carousel>

        {/* Setup dots navigation mapped statically to match indicator styles */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i + 1 === current
                  ? "w-1.5 h-1.5 bg-[#9EA4F9]"
                  : "w-1 h-1 bg-[#4C4C55]"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-7">
          {/* Cross Button */}
          <button 
            onClick={() => api?.scrollNext()}
            className="w-[52px] h-[52px] rounded-full bg-[#f45c5c] hover:bg-[#e05454] flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          >
            <X className="w-[24px] h-[24px]" strokeWidth={2.5} />
          </button>

          {/* Wow Center Button */}
          <WowModal>
            <div className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#1c1c20] text-[#EFC341] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center justify-center shadow-md whitespace-nowrap">
                <span className="text-[10px] mr-1">🪙</span> 10
              </div>
              <button className="w-[76px] h-[76px] rounded-full bg-gradient-to-b from-[#FAC94A] to-[#F18D0E] flex flex-col items-center justify-center text-white shadow-[0_4px_20px_rgba(241,141,14,0.3)] cursor-pointer">
                <Star fill="currentColor" className="w-[30px] h-[30px] mb-0.5" stroke="none" />
                <span className="text-[13px] font-bold tracking-wide">Wow</span>
              </button>
            </div>
          </WowModal>

          {/* Love Button */}
          <button 
            onClick={() => api?.scrollNext()}
            className="w-[52px] h-[52px] rounded-full bg-[#fba1c7] hover:bg-[#e390b3] flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          >
            <Heart fill="currentColor" stroke="none" className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsFlirting;