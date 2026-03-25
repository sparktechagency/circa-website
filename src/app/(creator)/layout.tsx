const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">      
      <main className=" mb-auto">{children}</main>
    </div>
  );
};

export default layout;
