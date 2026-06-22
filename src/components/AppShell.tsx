"use client";

import { usePathname } from "next/navigation";
import BottomTabBar from "./BottomTabBar";

const TAB_ROUTES = ["/home", "/wills", "/market", "/experts", "/profile"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = TAB_ROUTES.some((p) => pathname.startsWith(p));

  return (
    <div className="flex flex-1 justify-center">
      <div
        className={`flex flex-1 flex-col w-full max-w-[430px] bg-background min-h-screen ${
          showTabBar ? "pb-20" : ""
        }`}
      >
        {children}
      </div>
      {showTabBar && <BottomTabBar />}
    </div>
  );
}
