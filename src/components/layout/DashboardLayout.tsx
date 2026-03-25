"use client";
import React, { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { RightSidebar } from "./RightSidebar";
import { ContentWrapper } from "./ContentWrapper";
import { RightSidebarNav } from "./RightSidebarNav";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  rightSidebar?: ReactNode;
}

export function DashboardLayout({
  children,
  title = "Explore",
  rightSidebar,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-[1.5fr_5.5fr_2fr] h-screen w-full text-white font-sans overflow-hidden">
      {/* LEFT SIDEBAR → 1 COL */}
      <div className=" h-screen sticky top-0 ">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* MIDDLE CONTAINER → 5 COL */}
      <div className=" border-x border-[#242424] flex flex-col min-h-dvh overflow-y-auto">
        <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />

        <ContentWrapper>
          <main className="p-4 sm:p-3 lg:p-4 w-full flex-1">{children}</main>
        </ContentWrapper>
      </div>

      {/* RIGHT SIDEBAR → 2 COL */}
      <div className="">
        <div className=" flex flex-col min-h-dvh overflow-y-auto">
          <RightSidebarNav />

          <ContentWrapper>
            {rightSidebar && <RightSidebar>{rightSidebar}</RightSidebar>}
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
}
