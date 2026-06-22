"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AnswerFormState = { error?: string } | undefined;

export async function answerInquiry(
  _prevState: AnswerFormState,
  formData: FormData
): Promise<AnswerFormState> {
  const id = String(formData.get("id") || "");
  const answer = String(formData.get("answer") || "").trim();

  if (!id || !answer) {
    return { error: "답변 내용을 입력해주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ answer, status: "answered" })
    .eq("id", id);

  if (error) {
    return { error: "답변 등록에 실패했어요: " + error.message };
  }

  revalidatePath("/admin");
}
