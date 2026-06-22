import NotificationBell from "@/components/NotificationBell";

const categories = [
  { label: "변호사", desc: "공증 및 집행대리, 법률자문", icon: "⚖️" },
  { label: "장례준비", desc: "장례준비, 장례진행관리", icon: "⚰️" },
  { label: "재무설계", desc: "유산정리, 재산분할", icon: "💰" },
  { label: "보험", desc: "보험 관리", icon: "📄" },
  { label: "타로/사주 전문가", desc: "타로/사주 전문가", icon: "🔮" },
  { label: "심리상담", desc: "마음을 위로해 줄 수 있는 상담사를 연결해 드려요", icon: "💔" },
];

export default function ExpertsPage() {
  return (
    <main className="flex flex-1 flex-col gap-5 px-5 pt-6 lg:max-w-6xl lg:mx-auto lg:w-full lg:px-10 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold lg:text-2xl">전문가</h1>
        <NotificationBell />
      </div>

      <div className="rounded-2xl px-4 py-3 flex items-center justify-between bg-[#FBE9D0]">
        <span className="text-sm font-medium text-brand-dark">필독사항</span>
        <span className="text-sm text-brand-dark">›</span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
        {categories.map((c) => (
          <div key={c.label} className="bg-surface rounded-2xl shadow-sm p-4 lg:p-6 flex flex-col gap-2">
            <span className="text-2xl">{c.icon}</span>
            <p className="text-sm font-semibold lg:text-base">{c.label}</p>
            <p className="text-xs text-zinc-500 line-clamp-2">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400">상담 신청 내역이 아직 없어요</span>
        <span className="text-sm text-brand font-medium">나의 상담 내역 ›</span>
      </div>
    </main>
  );
}
