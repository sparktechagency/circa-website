"use client";
import React, { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { ContentWrapper } from "./ContentWrapper";
import { MessageNav } from "./MessageNav";
import { usePathname, useSearchParams } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/breadcrumbs";
import Image from "next/image";
import Link from "next/link";

interface MessageLayoutProps {
  children: ReactNode;
}

export function MessageLayout({ children }: MessageLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const exploreTab = searchParams.get("tab") || "browse";
  const breadcrumbs = generateBreadcrumbs(pathname, exploreTab);


  return (
    <div
      className="grid min-h-dvh w-full bg-[#0a0a0a] text-white font-sans
                    md:grid-cols-[220px_1fr]"
    >
      <div className="hidden md:block sticky top-0 h-dvh">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="md:hidden ">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col h-dvh overflow-hidden">
        {/* ✅ Mobile Topbar */}
        <div className="md:hidden flex h-[60px] border-b border-[#242424] items-center px-4 justify-between bg-[#0a0a0a]/90 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="text-white text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-xl font-bold tracking-wide">Circa</h1>
          </div>
          
          {/* <div className="w-10.50 h-10.50  rounded-full bg-gray-100 overflow-hidden border border-[#242424] cursor-pointer"> */}
          {/* </div> */}
           <Link href="/"> 
           <Image
              src="/user.png"
              width={100}
              height={100}
              alt="avatar"
              className="w-8 h-8"
            /></Link>
        </div>

        {/* ✅ Chat Content */}
        <MessageNav />
        <ContentWrapper className="flex-1 overflow-hidden p-0 min-h-0">
          <main className="h-full w-full overflow-hidden">{children}</main>
        </ContentWrapper>
      </div>
    </div>
  );
}
