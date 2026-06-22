import { createClient } from "@/lib/supabase/server";
import InquiryForm from "./InquiryForm";

export default async function InquiryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: myInquiries } = user
    ? await supabase
        .from("inquiries")
        .select("id, title, status, answer, created_at")
        .order("created_at", { ascending: false })
    : { data: null };

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="w-full max-w-lg flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-bold mb-2">문의하기</h1>
          <p className="text-sm text-zinc-500">
            회원이 아니어도 문의를 남길 수 있어요. 답변은 등록하신 연락처로 안내드려요.
          </p>
        </div>

        <InquiryForm />

        {user && (
          <div>
            <h2 className="text-lg font-semibold mb-3">내 문의 내역</h2>
            {myInquiries && myInquiries.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {myInquiries.map((inq) => (
                  <li key={inq.id} className="border rounded-md px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{inq.title}</span>
                      <span className="text-xs text-zinc-500">
                        {inq.status === "answered" ? "답변완료" : "답변대기"}
                      </span>
                    </div>
                    {inq.answer && (
                      <p className="mt-2 text-sm text-zinc-600">{inq.answer}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">아직 문의 내역이 없어요.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
