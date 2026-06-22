"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "홈" },
  { href: "/wills", label: "내유언" },
  { href: "/market", label: "마켓" },
  { href: "/experts", label: "전문가" },
  { href: "/profile", label: "내정보" },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <header className="hidden lg:flex items-center justify-between px-10 h-16 bg-surface border-b border-black/5 sticky top-0 z-50">
      <Link href="/home" className="font-extrabold text-lg tracking-tight">
        mangohada
      </Link>
      <nav className="flex items-center gap-8">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-sm font-medium transition-colors ${
                active ? "text-brand" : "text-zinc-500 hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
