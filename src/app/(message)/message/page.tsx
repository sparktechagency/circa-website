import React from "react";
import { LuSearch } from "react-icons/lu";

export default function MessagePage() {
  return (
    <div className="flex h-full w-full bg-[#0a0a0a]">
      {/* Left List Area */}
      <div className="w-80 border-r border-[#242424] flex-col h-full hidden md:flex">
        <div className="p-4 border-b border-[#242424] pb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#141416] border border-[#242424] rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary text-white"
            />
            <span className="absolute left-4 top-3 text-gray-400 text-xs">
              <LuSearch size={20} />
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex gap-3 p-4 hover:bg-[#141416] cursor-pointer transition-colors border-b border-[#141416]"
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 shrink-0"></div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-white truncate">
                    Marvin McKinney
                  </h4>
                  <span className="text-xs text-gray-500 shrink-0">
                    11:30 AM
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  Hey Bro! Let's do it...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
        <div className="h-[72px] border-b border-[#242424] p-4 flex items-center justify-between shrink-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 shrink-0"></div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">
                Marvin McKinney
              </h3>
              <span className="text-xs text-primary font-medium">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              📞
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              ⋮
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-h-full pb-24 md:pb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 shrink-0"></div>
            <div className="bg-[#1a1a1e] rounded-2xl rounded-tl-sm p-4 max-w-[85%] md:max-w-[70%] border border-[#242424]">
              <p className="text-sm text-gray-200">
                Glad you liked it! It's called "Midnight Pulse." I can send you
                the stems if you're ready.
              </p>
              <span className="text-xs text-gray-500 mt-2 block">10:39 AM</span>
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-gray-600 shrink-0 hidden md:block"></div>
            <div className="bg-primary/90 text-black rounded-2xl rounded-tr-sm p-4 max-w-[85%] md:max-w-[70%] shadow-sm">
              <p className="text-sm font-medium">
                Glad you liked it! It's called "Midnight Pulse." I can send you
                the stems if you're ready.
              </p>
              <span className="text-xs text-black/60 mt-2 block text-right">
                10:39 AM{" "}
                <span className="text-black inline-block ml-1">✓✓</span>
              </span>
            </div>
          </div>

          <div className="my-6">
            <div className="bg-[#1a1a1e] border border-[#242424] rounded-xl p-4 md:p-6 text-center max-w-md mx-auto relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary to-purple-500"></div>
              <h4 className="font-bold text-white mb-2">Continue Chatting</h4>
              <p className="text-sm text-gray-400 mb-4">
                Unlock the next message from{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  @jhon_lura
                </span>
              </p>
              <div className="flex items-center justify-center gap-2 font-bold mb-4 text-white">
                <span>🪙</span> 5 Credits{" "}
                <span className="text-xs font-normal text-gray-400">
                  /20 message
                </span>
              </div>
              <button className="w-full bg-primary hover:bg-opacity-90 transition-all text-black font-semibold py-2.5 rounded-lg text-sm">
                Buy Credit
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#242424] shrink-0 bg-[#0a0a0a]">
          <div className="relative flex items-center">
            <button className="absolute left-3 text-gray-400 hover:text-white transition-colors z-10">
              <span className="text-xl">📎</span>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-[#141416] border border-[#242424] rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-primary text-white"
            />
            <button className="absolute right-3 text-primary hover:text-white transition-colors z-10 w-8 h-8 flex justify-center items-center bg-primary/10 rounded-lg">
              <span className="transform -rotate-45 block mb-1 ml-0.5 mt-1">
                ➤
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
