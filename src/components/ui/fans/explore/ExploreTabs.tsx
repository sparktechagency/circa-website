"use client";
import BrowseCreators from "@/components/ui/fans/explore/Browse-Creators";
import FriendsFlirting from "@/components/ui/fans/explore/Friends-Flirting";
import MyCreator from "@/components/ui/fans/explore/My-Creator";
import TabsSelect from "./TabsSelect";

export function ExploreTabs({ response, tab }: { response: any, tab: string }) {
  
  return (
    <div className="">
      <TabsSelect />

      {/* Tab Content */}
      {tab === "browse" ? (<BrowseCreators  creatorData={response?.data}/>) : 
      tab === "my-creator" ? (<MyCreator />) : tab === "friends" 
      ? (<FriendsFlirting />) : <BrowseCreators creatorData={response?.data}/>}
    </div>
  );
}
