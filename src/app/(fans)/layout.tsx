"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import React, { ReactNode } from "react";
import HomeRightSide from "@/components/ui/fans/home/HomeRightSide";
import PostDetailsRightSide from "@/components/ui/fans/home/post-details/PostDetailsRightSide";

export default function DashboardGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Derive title
  const rawPath =
    pathname === "/" ? "Home" : pathname?.replace("/", "") || "Home";
  const title = rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

  // ✅ Sidebar Map
  const rightSidebarMap: Record<string, ReactNode> = {
    "/explore": (
      <div className="space-y-6">
        <h3 className="text-xl font-bold border-b border-[#242424] pb-4">
          My Creator
        </h3>
        <div className="flex flex-col gap-5 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex justify-center items-center">
                👤
              </div>
              <div>
                <p className="font-semibold text-sm">Michel Lin</p>
                <p className="text-xs text-gray-400">Musician</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    "/home": <HomeRightSide/>,
    "/": <HomeRightSide/>,
    "/home/post-details": <PostDetailsRightSide/>,
  };

  const rightSidebarContent = rightSidebarMap[pathname] || null;

  return (
    <DashboardLayout title={title} rightSidebar={rightSidebarContent}>
      {children}
    </DashboardLayout>
  );
}
