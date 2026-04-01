
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { FRIENDS_FLIRTING, RECENTLY_ACTIVE, TOP_CREATORS } from "@/constants/home-data";
import TopCreators from "./TopCreators";
import RecentActive from "./RecentActive";
import FriendsFlirting from "./FriendsFlirting";

const HomeRightSide = () => {
  return (
    <div className="flex flex-col gap-6 w-full ">
      <TopCreators />
      <RecentActive />
      <FriendsFlirting />
    </div>
  );
};

export default HomeRightSide;
