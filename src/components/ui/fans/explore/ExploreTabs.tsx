"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BrowseCreators from "@/components/ui/fans/explore/Browse-Creators";
import FriendsFlirting from "@/components/ui/fans/explore/Friends-Flirting";
import MyCreator from "@/components/ui/fans/explore/My-Creator";

export function ExploreTabs({ defaultTab }: { defaultTab: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (value: string) => {
    router.push(`/explore?tab=${value}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      {/* Tab Buttons */}
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="browse">Browse Creators</TabsTrigger>
        <TabsTrigger value="my-creator">My Creator</TabsTrigger>
        <TabsTrigger value="friends">Friends & Flirting</TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="browse">
        <BrowseCreators />
      </TabsContent>

      <TabsContent value="my-creator">
        <MyCreator />
      </TabsContent>

      <TabsContent value="friends">
        <FriendsFlirting />
      </TabsContent>
    </Tabs>
  );
}
