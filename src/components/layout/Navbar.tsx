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
    <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#242424] h-25 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-white text-2xl" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="text-xl font-medium text-white tracking-wide">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <label className="relative hidden md:flex items-center">
          <span className="absolute left-3 text-gray-400 text-xl">
            <RiSearch2Line />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="bg-[#15131A] border border-[#242424] rounded-full py-2 pl-10 pr-4 text-sm w-85.25 text-white focus:outline-none focus:border-primary transition-colors h-12 placeholder:text-[#AFAFAF]"
          />
        </label>

      </div>
    </header>
  );
}
