"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/wills", label: "내유언", icon: "📝" },
  { href: "/market", label: "마켓", icon: "🛍️" },
  { href: "/home", label: "홈", icon: "🏠" },
  { href: "/experts", label: "전문가", icon: "🧑‍⚕️" },
  { href: "/profile", label: "내정보", icon: "👤" },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-black/5 flex items-stretch px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 z-50">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const isHome = tab.href === "/home";

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-0.5 py-1"
          >
            <span
              className={
                isHome
                  ? `flex items-center justify-center w-11 h-11 rounded-full -mt-6 shadow-md text-xl ${
                      active ? "bg-brand text-white" : "bg-white text-zinc-400 border border-black/5"
                    }`
                  : `text-lg ${active ? "" : "opacity-60"}`
              }
            >
              {tab.icon}
            </span>
            <span
              className={`text-[11px] font-medium ${
                active ? "text-brand" : "text-zinc-400"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
