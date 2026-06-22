import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NotificationBell from "@/components/NotificationBell";

const expertCategories = [
  { label: "변호사", icon: "⚖️" },
  { label: "재무설계", icon: "💰" },
  { label: "심리상담", icon: "💔" },
  { label: "장례지도", icon: "⚰️" },
  { label: "보험", icon: "📄" },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  const nickname = profile?.name ?? "회원";

  return (
    <main className="flex flex-1 flex-col gap-5 px-5 pt-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-extrabold tracking-tight">mangohada</span>
        <NotificationBell />
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold">
            안녕하세요, {nickname}님
          </p>
          <p className="text-sm text-zinc-500 mt-1">오늘도 소중한 하루 되세요</p>
        </div>
        <span className="text-4xl">🥭</span>
      </div>

      <Link
        href="/happiness"
        className="rounded-2xl p-5 text-white flex flex-col gap-1"
        style={{ background: "linear-gradient(135deg, #F5A623, #FFC966)" }}
      >
        <span className="font-semibold">행복저금 🎁</span>
        <span className="text-sm opacity-90">이번주 행복했던 순간을 기록해 보세요</span>
      </Link>

      <Link
        href="/happiness"
        className="bg-surface rounded-2xl shadow-sm p-4 flex items-center justify-between"
      >
        <span className="text-sm font-medium">행복저금 0개</span>
        <span className="text-zinc-400">›</span>
      </Link>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">망고의 전문가 서비스를 만나 보세요.</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5">
          {expertCategories.map((c) => (
            <Link
              key={c.label}
              href="/experts"
              className="flex flex-col items-center gap-2 bg-surface rounded-2xl shadow-sm px-4 py-4 shrink-0 w-20"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-medium text-center">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">나의 마지막 초대장</h2>
        <Link
          href="/invitation"
          className="bg-surface rounded-2xl shadow-sm p-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">초대인원 0명</span>
          <span className="text-sm text-brand font-medium">관리하기 ›</span>
        </Link>
      </section>
    </main>
  );
}
