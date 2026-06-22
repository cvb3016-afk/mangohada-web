import Link from "next/link";

const features = [
  { name: "유언 남기기", href: "/will", desc: "텍스트 또는 동영상으로 유언을 남겨보세요" },
  { name: "행복저금", href: "/happiness", desc: "오늘 하루의 행복한 순간을 기록하세요" },
  { name: "전문가 서비스", href: "/experts", desc: "변호사, 재무설계 등 전문가와 상담하세요" },
  { name: "나의 마지막 초대장", href: "/invitation", desc: "소중한 사람에게 초대장을 보내세요" },
  { name: "아티클 보기", href: "/articles", desc: "웰다잉 관련 콘텐츠를 만나보세요" },
  { name: "마켓", href: "/market", desc: "포인트로 테마를 구매하세요" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-4xl flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-3xl font-bold">망고하다</h1>
          <p className="text-zinc-500">
            인생의 마지막을 미리, 그리고 따뜻하게 준비하는 공간
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="border rounded-xl p-5 flex flex-col gap-1 hover:bg-black/[.03] transition-colors"
            >
              <span className="font-semibold">{f.name}</span>
              <span className="text-sm text-zinc-500">{f.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
