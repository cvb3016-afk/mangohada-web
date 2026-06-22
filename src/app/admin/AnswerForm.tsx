"use client";

import { useActionState } from "react";
import { answerInquiry } from "./actions";

export default function AnswerForm({ id, defaultAnswer }: { id: string; defaultAnswer: string | null }) {
  const [state, action, pending] = useActionState(answerInquiry, undefined);

  return (
    <form action={action} className="flex flex-col gap-2 mt-2">
      <input type="hidden" name="id" value={id} />
      <textarea
        name="answer"
        defaultValue={defaultAnswer ?? ""}
        placeholder="답변을 입력하세요"
        rows={2}
        className="border rounded-md px-3 py-2 text-sm"
      />
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-foreground text-background text-xs px-4 py-1.5 font-medium disabled:opacity-50"
      >
        {pending ? "저장 중..." : "답변 저장"}
      </button>
    </form>
  );
}
