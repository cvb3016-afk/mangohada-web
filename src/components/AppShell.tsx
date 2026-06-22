"use client";

import { usePathname } from "next/navigation";
import BottomTabBar from "./BottomTabBar";
import TopNavBar from "./TopNavBar";

const TAB_ROUTES = ["/home", "/wills", "/market", "/experts", "/profile", "/articles"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = TAB_ROUTES.some((p) => pathname.startsWith(p));

  return (
    <div className="flex flex-1 flex-col lg:items-stretch items-center">
      {showTabBar && <TopNavBar />}
      <div className="flex flex-1 justify-center w-full">
        <div
          className={`flex flex-1 flex-col w-full max-w-[430px] lg:max-w-none bg-background min-h-screen ${
            showTabBar ? "pb-20 lg:pb-0" : ""
          }`}
        >
          {children}
        </div>
      </div>
      {showTabBar && (
        <div className="lg:hidden">
          <BottomTabBar />
        </div>
      )}
    </div>
  );
}
