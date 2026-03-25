import { CreatorSidebar } from "@/components/ui/creator/CreatorDashboard/CreatorSidebar";
import Topbar from "@/components/ui/creator/CreatorDashboard/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen bg-[#111111] overflow-hidden">
      <CreatorSidebar />
      <main className="flex-1 overflow-y-auto bg-linear-to-br from-black via-[#0A0A0A] to-black">
        <Topbar />
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
