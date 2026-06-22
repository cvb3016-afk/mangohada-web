import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function MyPage() {
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
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <p className="text-zinc-600">
          {profile?.name ? `${profile.name}님, 환영합니다.` : "환영합니다."}
        </p>
        <p className="text-sm text-zinc-500">{profile?.email ?? user.email}</p>

        <form action={logout} className="mt-4">
          <button
            type="submit"
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium hover:bg-black/[.04]"
          >
            로그아웃
          </button>
        </form>
      </div>
    </main>
  );
}
