"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <form action={action} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">회원가입</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">이름</label>
          <input id="name" name="name" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">이메일</label>
          <input id="email" name="email" type="email" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">비밀번호 (8자 이상)</label>
          <input id="password" name="password" type="password" required minLength={8} className="border rounded-md px-3 py-2" />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-foreground text-background py-2 font-medium disabled:opacity-50"
        >
          {pending ? "가입 중..." : "회원가입"}
        </button>

        <p className="text-sm text-center text-zinc-500">
          이미 계정이 있나요? <Link href="/login" className="font-medium underline">로그인</Link>
        </p>
      </form>
    </main>
  );
}
