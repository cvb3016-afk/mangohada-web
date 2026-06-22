import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AnswerForm from "./AnswerForm";

const comingSoon = [
  "포인트 관리",
  "아티클 관리",
  "마켓 관리",
  "전문가 관리",
  "통계 대시보드",
];

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <h1 className="text-xl font-bold">접근 권한이 없어요</h1>
        <p className="text-sm text-zinc-500">관리자 계정으로만 들어올 수 있는 페이지예요.</p>
      </main>
    );
  }

  const { data: members } = await supabase
    .from("profiles")
    .select("id, name, email, created_at")
    .order("created_at", { ascending: false });

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id, name, phone, title, content, status, answer, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
        <h1 className="text-2xl font-bold">관리자 페이지</h1>

        <section>
          <h2 className="text-lg font-semibold mb-3">회원 관리 ({members?.length ?? 0}명)</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left">
                <tr>
                  <th className="px-4 py-2">이름</th>
                  <th className="px-4 py-2">이메일</th>
                  <th className="px-4 py-2">가입일</th>
                </tr>
              </thead>
              <tbody>
                {members?.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="px-4 py-2">{m.name ?? "-"}</td>
                    <td className="px-4 py-2">{m.email}</td>
                    <td className="px-4 py-2 text-zinc-500">
                      {new Date(m.created_at).toLocaleDateString("ko-KR")}
                    </td>
                  </tr>
                ))}
                {(!members || members.length === 0) && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-zinc-400">
                      아직 가입한 회원이 없어요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">문의사항 관리 ({inquiries?.length ?? 0}건)</h2>
          <div className="flex flex-col gap-4">
            {inquiries?.map((inq) => (
              <div key={inq.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{inq.title}</span>
                  <span className="text-xs text-zinc-500">
                    {inq.status === "answered" ? "답변완료" : "답변대기"}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">
                  {inq.name} {inq.phone ? `· ${inq.phone}` : ""} ·{" "}
                  {new Date(inq.created_at).toLocaleDateString("ko-KR")}
                </p>
                <p className="text-sm mt-2 whitespace-pre-wrap">{inq.content}</p>
                <AnswerForm id={inq.id} defaultAnswer={inq.answer} />
              </div>
            ))}
            {(!inquiries || inquiries.length === 0) && (
              <p className="text-sm text-zinc-400">아직 문의가 없어요.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">준비 중인 관리 메뉴</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {comingSoon.map((label) => (
              <div
                key={label}
                className="border rounded-lg px-4 py-6 text-center text-sm text-zinc-400"
              >
                {label}
                <br />
                (준비 중)
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
