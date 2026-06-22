import Link from "next/link";

export default function ComingSoon({
  title,
  backHref = "/profile",
  backLabel = "내정보로 돌아가기",
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="text-4xl">🥭</span>
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm text-zinc-500">곧 만나보실 수 있어요. 준비 중입니다.</p>
      <Link href={backHref} className="text-sm text-brand underline mt-2">
        {backLabel}
      </Link>
    </main>
  );
}
