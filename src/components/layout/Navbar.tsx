import Image from "next/image";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";

export function Navbar({
  title = "Explore",
  onMenuClick,
}: {
  title?: string;
  onMenuClick?: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#242424] h-[72px] flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-white text-2xl" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="text-xl font-medium text-white tracking-wide">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search — hidden on small screens */}
        <label className="relative hidden md:flex items-center">
          <span className="absolute left-3 text-gray-400 text-xl">
            <RiSearch2Line />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="bg-[#15131A] border border-[#242424] rounded-full py-2 pl-10 pr-4 text-sm w-64 lg:w-80 text-white focus:outline-none focus:border-primary transition-colors h-11 placeholder:text-[#AFAFAF]"
          />
        </label>

        {/* Mobile search icon */}
        <button className="md:hidden flex w-10 h-10 rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400">
          <RiSearch2Line size={18} />
        </button>

        {/* Icons — visible on mobile since right sidebar is hidden on small screens */}
        <button className="lg:hidden flex w-10 h-10 rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
          <MdOutlineNotificationsNone size={22} />
        </button>
        <button className="lg:hidden flex w-10 h-10 rounded-full bg-[#15131A] border border-[#242424] justify-center items-center text-gray-400 hover:text-white transition-colors">
          <LuShoppingCart size={18} />
        </button>
        <div className="lg:hidden w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-[#242424] cursor-pointer">
          <Image src="/user.png" width={100} height={100} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}