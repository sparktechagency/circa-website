"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SendGiftModal = () => { 
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div> 
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <button className="absolute top-4 right-4 bg-white text-black font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <span>🎁</span> Send Gift
          </button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="sm:max-w-[540px] bg-[#1c1c20] border-none text-white p-6 sm:rounded-[24px] shadow-2xl [&>button]:text-zinc-400 [&>button]:hover:text-white">
          <DialogHeader className="flex flex-col items-center justify-center p-0 space-y-0">
            {/* Gift Icon */}
            <div className="relative mb-2 mt-2">
              <div 
                className="text-[64px] leading-none"
                style={{ 
                  filter: "drop-shadow(0 0 25px rgba(255, 180, 0, 0.4))" 
                }}
              >
                🎁
              </div>
            </div>

            {/* Headers */}
            <DialogTitle className="text-[22px] font-bold mt-2 text-center text-white">
              Send a Gift
            </DialogTitle>
            <div className="text-[#A1A1AA] text-[15px] mt-1 text-center">
              Stand out and jump to the top of their inbox
            </div>

            {/* Balance Pill */}
            <div className="mt-5 px-5 py-2 rounded-full bg-[#2E2819] text-[#EFC341] text-[14px] flex items-center justify-center gap-2 font-medium">
              <svg width="15" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M21 7.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-1.5M18 12h4v-3h-4a2 2 0 00-2 2v1h-.5a.5.5 0 000 1h.5v1a2 2 0 002 2zM16 12a1 1 0 11-2 0 1 1 0 012 0z"/>
              </svg>
              Current Balance : 120 Coins
            </div>
          </DialogHeader>

          <div className="mt-6">
            {/* Credits Input/Display */}
            <div className="bg-[#26262D] rounded-[16px] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F2C047] w-[22px] h-[22px] rounded-full flex items-center justify-center text-[#1E1E22] text-[12px] font-bold font-serif">
                  $
                </div>
                <span className="text-white font-medium text-[17px]">10</span>
              </div>
              <span className="text-[#84848E] text-[14.5px]">Credits</span>
            </div>

            {/* Message Textarea */}
            <div className="mt-5">
              <label className="text-[15px] text-zinc-100 font-medium mb-3 block">
                Say Something
              </label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 140) {
                      setMessage(e.target.value);
                    }
                  }}
                  className="w-full bg-[#26262D] text-white p-4 pb-9 rounded-[16px] border border-transparent resize-none focus:ring-1 focus:ring-[#9DA8FD] focus:border-[#9DA8FD] outline-none placeholder:text-[#676771] min-h-[120px] text-[15px]"
                  placeholder="Add a short message...(optional)"
                />
                <span className="absolute bottom-3 right-4 text-[13px] text-[#676771]">
                  {message.length}/140
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full mt-6 py-3.5 rounded-[12px] bg-[#9EA4F9] hover:bg-[#8D94F5] text-white font-semibold text-[15.5px] transition-colors duration-200">
              Send Gift
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendGiftModal;