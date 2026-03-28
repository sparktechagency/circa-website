"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaUnlockAlt } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

const CreditsModal = () => { 
  const [open, setOpen] = useState(false);

  return (
    <div> 
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <button className="border border-yellow-600 bg-[#3D3524] text-yellow-500 text-xs font-medium gap-1 flex items-center px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer">
            <span>🪙</span> 10 Credits
          </button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="sm:max-w-[460px] bg-[#1c1c20] border-none text-white p-7 sm:rounded-[24px] shadow-2xl [&>button]:text-zinc-400 [&>button]:hover:text-white">
          <DialogHeader className="flex flex-col items-center justify-center p-0 space-y-0">
            {/* Lock Icon */}
            <div className="mb-2 mt-1">
           <FaUnlockAlt color="#9EA4F9" size={28} />
            </div>

            {/* Headers */}
            <DialogTitle className="text-[22px] font-medium text-center text-white">
              Confirm Unlock
            </DialogTitle>
            
            <div className="text-[#AFAFAF] text-[15px] mt-2 text-center leading-relaxed sm:px-4">
              Are you sure you want to unlock this content for{` `}
              <span className="text-[#F2CC0D]">10 Coins</span>? this action cannot be undone.
            </div>

            {/* Balance Pill */}
            <div className="mt-3 px-5 py-2.5 rounded-full bg-[#2E2819] text-[#F2CC0D] text-[14px] flex items-center justify-center gap-2 font-medium">
          <MdAccountBalanceWallet color="#F2CC0D" size={18} />
              Current Balance : 120 Coins
            </div>
          </DialogHeader>

          <div className="mt-4">
            {/* Submit Button */}
            <button className="w-full py-3.5 rounded-[12px] bg-[#9EA4F9] hover:bg-[#8D94F5] text-white font-semibold text-[15.5px] transition-colors duration-200">
              Unlock
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditsModal;