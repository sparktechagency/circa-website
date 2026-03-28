import Image from "next/image";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";

export function MessageNav() {
  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md  h-25 flex items-center justify-between px-4 md:px-6 border-b border-[#242424]">
      <div className="flex items-center  justify-between w-full">
        <h1 className="text-xl font-medium text-white tracking-wide">
          Message
        </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden sm:flex w-11 h-11  rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
            <MdOutlineNotificationsNone size={25} />
          </button>
          <button className="hidden sm:flex w-11 h-11  rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
            <LuShoppingCart size={21} />
          </button>
          <div className="w-10.50 h-10.50  rounded-full bg-gray-100 overflow-hidden border border-[#242424] cursor-pointer">
            <Image
              src="/user.png"
              width={100}
              height={100}
              alt="avatar"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
