import React from "react";

export function ContentWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex-1 flex flex-col min-h-[calc(100vh-85px)] relative w-full ${className}`}
    >
      {children}
    </div>
  );
}
