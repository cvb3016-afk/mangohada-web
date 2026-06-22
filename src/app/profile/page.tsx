import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import NotificationBell from "@/components/NotificationBell";

const menuItems = [
  { label: "저장한 콘텐츠", count: 0, href: "/saved" },
  { label: "안부인사 받기 설정", href: "/greeting-settings" },
  { label: "자주 묻는 질문", href: "/faq" },
  { label: "1:1 문의", href: "/inquiry" },
  { label: "공지사항", href: "/notices" },
  { label: "앱 잠금 설정", href: "/lock-settings" },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, email")
    .eq("id", user.id)
    .single();

  return (
    <main className="flex flex-1 flex-col gap-5 px-5 pt-6 lg:max-w-2xl lg:mx-auto lg:w-full lg:px-10 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold lg:text-2xl">내정보</h1>
        <NotificationBell />
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4 flex items-center gap-3">
        <span className="w-12 h-12 rounded-full bg-[#FBE9D0] flex items-center justify-center text-2xl shrink-0">
          🥭
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm">{profile?.name ?? "회원"}</p>
          <p className="text-xs text-zinc-500">{profile?.email ?? user.email}</p>
        </div>
        <Link href="/profile/edit" className="text-xs text-brand font-medium">
          프로필 수정 ›
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">보유 망고</span>
          <span className="text-sm font-bold text-brand">0 🥭</span>
        </div>
        <div className="flex gap-2">
          <Link
            href="/payments"
            className="flex-1 text-center rounded-full bg-zinc-100 py-2 text-sm font-medium"
          >
            결제내역
          </Link>
          <Link
            href="/recharge"
            className="flex-1 text-center rounded-full bg-brand text-white py-2 text-sm font-medium"
          >
            충전하기
          </Link>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm divide-y divide-black/5">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-4 py-3.5"
          >
            <span className={`text-sm ${item.count !== undefined ? "text-brand font-medium" : ""}`}>
              {item.label}
              {item.count !== undefined ? ` ${item.count}개` : ""}
            </span>
            <span className="text-zinc-300">›</span>
          </Link>
        ))}
      </div>

      <form action={logout}>
        <button type="submit" className="w-full text-center text-sm text-zinc-400 py-3">
          로그아웃
        </button>
      </form>
    </main>
  );
}
