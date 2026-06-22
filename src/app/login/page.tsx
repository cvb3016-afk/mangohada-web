"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <form action={action} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">로그인</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">이메일</label>
          <input id="email" name="email" type="email" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">비밀번호</label>
          <input id="password" name="password" type="password" required className="border rounded-md px-3 py-2" />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-foreground text-background py-2 font-medium disabled:opacity-50"
        >
          {pending ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-sm text-center text-zinc-500">
          계정이 없나요? <Link href="/signup" className="font-medium underline">회원가입</Link>
        </p>
      </form>
    </main>
  );
}
