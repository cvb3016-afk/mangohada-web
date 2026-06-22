"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type InquiryFormState = { error?: string; success?: boolean } | undefined;

export async function createInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!name || !title || !content) {
    return { error: "이름, 제목, 내용을 입력해주세요." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("inquiries").insert({
    user_id: user?.id ?? null,
    name,
    phone: phone || null,
    title,
    content,
  });

  if (error) {
    return { error: "문의 등록에 실패했어요: " + error.message };
  }

  revalidatePath("/inquiry");
  return { success: true };
}
