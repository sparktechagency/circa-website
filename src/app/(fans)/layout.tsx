"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import React, { ReactNode } from "react";
import HomeRightSide from "@/components/ui/fans/home/HomeRightSide";
import PostDetailsRightSide from "@/components/ui/fans/home/post-details/PostDetailsRightSide";
import BrowseRightSide from "@/components/ui/fans/explore/Browse-Creators/BrowseRightSide";
import MembershipRightSide from "@/components/ui/fans/explore/creator-profile/membership/MembershipRightSide";

export default function DashboardGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const exploreTab = searchParams.get("tab") || "browse";

  const rawPath =
    pathname === "/" ? "Home" : pathname?.replace("/", "") || "Home";
  const title = rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

  const rightSidebarMap: Record<string, ReactNode> = {
    "/explore": exploreTab === "browse" ? (
 <BrowseRightSide />
    ) : null,

    "/home": <HomeRightSide/>,
    "/": <HomeRightSide/>,
    "/home/post-details": <PostDetailsRightSide/>,
    "/explore/creator-profile/post-details": <PostDetailsRightSide/>,
    "/explore/creator-profile/product-details": <PostDetailsRightSide/>,
    "/explore/creator-profile/membership": <MembershipRightSide/>,
    "/explore/creator-profile/about": <PostDetailsRightSide/>,
  };

  const rightSidebarContent = rightSidebarMap[pathname] || null;

  return (
    <DashboardLayout title={title} rightSidebar={rightSidebarContent}>
      {children}
    </DashboardLayout>
  );
}
