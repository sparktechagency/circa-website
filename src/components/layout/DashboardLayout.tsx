"use client";
import  { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { RightSidebar } from "./RightSidebar";
import { ContentWrapper } from "./ContentWrapper";
import { RightSidebarNav } from "./RightSidebarNav";

interface DashboardLayoutProps {
  children: ReactNode;
 breadcrumbs?: { label: string; href: string }[];
  rightSidebar?: ReactNode;
}

export function DashboardLayout({
  children,
  breadcrumbs=[],
  rightSidebar,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-[1.5fr_5.5fr_2fr] h-screen w-full text-white font-sans overflow-hidden">
      {/* LEFT SIDEBAR → 1 COL */}
      <div className=" h-screen sticky top-0 ">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* MIDDLE CONTENT */}
      <div className="flex-1 border-x border-[#242424] flex flex-col min-h-dvh overflow-y-auto w-full min-w-0">
        <Navbar title={breadcrumbs} onMenuClick={() => setSidebarOpen(true)} />
        <ContentWrapper>
          <main className="p-3 sm:p-4 w-full flex-1">{children}</main>
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
