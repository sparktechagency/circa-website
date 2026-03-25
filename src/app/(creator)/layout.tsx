
import NavServer from "@/components/shared/Navbar/NavbarServer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavServer />
      <main className=" mb-auto">{children}</main>
    </div>
  );
};

export default layout;
