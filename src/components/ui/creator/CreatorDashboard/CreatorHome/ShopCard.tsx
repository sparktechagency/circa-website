import { Heart, Lock, MessageCircle, MoreVertical } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ShopItem {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
}

const ShopCard = ({ shop }:any) => {
  return (
     <Link href={`/shop/${shop.id}`}>
        <div            
            className="border-b border-[#2a2a35] py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
        >
            <div className="flex items-center gap-4 flex-1">
                <div className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${shop.isIllustration ? 'bg-yellow-100 p-2' : ''}`}>
                    <img
                        src={shop.image}
                        alt={shop.title}
                        className={`w-full h-full object-cover ${shop.isIllustration ? 'object-contain' : ''}`}
                    />  
                    {shop.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] px-1 rounded font-mono">
                            {shop.duration}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-md text-lg leading-tight group-hover:text-primary transition-colors">
                        {shop.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">{shop.price}</p>
                    <div className="flex gap-4 mt-3">
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 cursor-pointer hover:text-pink-400 transition-colors">
                            <Heart size={14} /> {shop.likes}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 cursor-pointer hover:text-purple-400 transition-colors">
                            <MessageCircle size={14} /> {shop.comments}
                        </span>
                    </div>
                </div>
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-400 transition-colors">
                {shop.locked ? <Lock size={18} /> : <MoreVertical size={18} />}
            </button>
        </div>
        </Link>
  );
};

export default ShopCard;