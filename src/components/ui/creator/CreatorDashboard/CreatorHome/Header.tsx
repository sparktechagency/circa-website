import { Coins } from "lucide-react";
import React from "react";



const Header= () => {
  return (
    <nav className=" flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0d12]"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Jhon G.</h1>
            <p className="text-primary/70 text-md">Digital Artist</p>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-xl px-4 py-2 flex items-center gap-2">
          <Coins size={18} className="text-yellow-500" />
          <span className="text-yellow-500 font-semibold text-sm">Balance : 120 Coins</span>
        </div>
      </nav>
  );
};

export default Header;