
import { RiSearch2Line } from "react-icons/ri";
import Breadcrumbs from "../ui/Breadcrumbs";

export function Navbar({
  title = [],
  onMenuClick,
}: {
  title?:{ label: string; href: string }[];
  onMenuClick?: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#242424] h-25 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-white text-2xl" onClick={onMenuClick}>
          ☰
        </button>
     <Breadcrumbs items={title} />
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
