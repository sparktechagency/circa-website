import Image from "next/image";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";

export function RightSidebarNav() {
  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md  h-25 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-end  justify-end w-full">
        <div className="flex items-center gap-2 md:gap-3">
        <Link href="/notifications">  <button className="hidden sm:flex cursor-pointer relative w-11 h-11 rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
            <MdOutlineNotificationsNone size={25} />
            {/* Badge */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          </Link>
           <Link href="/add-to-card">          
          <button className="hidden sm:flex cursor-pointer relative w-11 h-11 rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
            <LuShoppingCart size={21} />
            {/* Badge */}
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          </Link>
          <div className="w-10.50 h-10.50  rounded-full bg-gray-100 overflow-hidden border border-[#242424] cursor-pointer">
            <Image src="/user.png" width={100} height={100} alt="avatar" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
