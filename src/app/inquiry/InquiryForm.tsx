"use client";

import { useActionState, useEffect, useRef } from "react";
import { createInquiry } from "@/app/actions/inquiry";

export default function InquiryForm() {
  const [state, action, pending] = useActionState(createInquiry, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">이름</label>
          <input id="name" name="name" required className="border rounded-md px-3 py-2" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">연락처 (선택)</label>
          <input id="phone" name="phone" className="border rounded-md px-3 py-2" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">제목</label>
        <input id="title" name="title" required className="border rounded-md px-3 py-2" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="text-sm font-medium">내용</label>
        <textarea id="content" name="content" required rows={5} className="border rounded-md px-3 py-2" />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">문의가 접수되었어요. 빠르게 답변드릴게요.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground text-background py-2 font-medium disabled:opacity-50"
      >
        {pending ? "등록 중..." : "문의 등록"}
      </button>
    </form>
  );
}
