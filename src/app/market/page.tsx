import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-bold">마켓</h1>
      <p className="text-zinc-500">이 기능은 곧 만나보실 수 있어요. 준비 중입니다.</p>
      <Link href="/" className="text-sm underline">홈으로 돌아가기</Link>
    </main>
  );
}
