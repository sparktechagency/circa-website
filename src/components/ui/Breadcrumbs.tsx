"use client";

import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <div className="text-sm text-gray-400 flex items-center gap-2 px-4 pt-3">
      <Link href="/" className="hover:text-white">
        Home
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.href} className="flex items-center gap-2">
            <span>{">"}</span>

            {isLast ? (
              <span className="text-white">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}