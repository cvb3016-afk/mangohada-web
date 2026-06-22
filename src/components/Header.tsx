import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg">
        망고하다
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/inquiry" className="hover:underline">문의하기</Link>
        {user ? (
          <>
            <Link href="/mypage" className="hover:underline">마이페이지</Link>
            <form action={logout}>
              <button type="submit" className="hover:underline">로그아웃</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">로그인</Link>
            <Link
              href="/signup"
              className="rounded-full bg-foreground text-background px-4 py-1.5 font-medium"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
