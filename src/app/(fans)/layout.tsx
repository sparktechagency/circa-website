"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import React from "react";

export default function DashboardGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isExplore = pathname === "/explore";

  const rightSidebarContent = isExplore ? (
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
  ) : null;

  // Derive title from pathname
  const rawPath =
    pathname === "/" ? "Home" : pathname?.replace("/", "") || "Home";
  const title = rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

  return (
    <DashboardLayout title={title} rightSidebar={rightSidebarContent}>
      {children}
    </DashboardLayout>
  );
}
