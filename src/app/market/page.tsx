"use client";

import { useState } from "react";

type Theme = { id: string; name: string; price: number; emoji: string };

const recommended: Theme[] = [
  { id: "r1", name: "노을빛 하늘", price: 100, emoji: "🌇" },
  { id: "r2", name: "포근한 봄날", price: 80, emoji: "🌸" },
  { id: "r3", name: "별이 빛나는 밤", price: 120, emoji: "🌌" },
];

const allThemes: Theme[] = [
  ...recommended,
  { id: "a4", name: "잔잔한 바다", price: 90, emoji: "🌊" },
  { id: "a5", name: "푸른 숲길", price: 70, emoji: "🌳" },
  { id: "a6", name: "따뜨한 거실", price: 60, emoji: "🛋️" },
  { id: "a7", name: "첫눈 오는 날", price: 110, emoji: "❄️" },
  { id: "a8", name: "가을 단풍", price: 95, emoji: "🍁" },
];

export default function MarketPage() {
  const [balance, setBalance] = useState(34);
  const [selected, setSelected] = useState<Theme | null>(null);
  const [owned, setOwned] = useState<string[]>([]);

  function confirmPurchase() {
    if (!selected) return;
    if (balance < selected.price) {
      alert("보유한 망고가 부족해요.");
      return;
    }
    setBalance((b) => b - selected.price);
    setOwned((o) => [...o, selected.id]);
    setSelected(null);
  }

  return (
    <main className="flex flex-1 flex-col gap-6 px-5 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">마켓</h1>
        <span className="text-sm font-medium text-brand">보유 {balance} 🥭</span>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">망고하다 님 맞춤 추천 테마</h2>
        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1">
          {recommended.map((t) => (
            <ThemeCard key={t.id} theme={t} owned={owned.includes(t.id)} onClick={() => setSelected(t)} wide />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">전체 테마</h2>
        <div className="grid grid-cols-3 gap-3">
          {allThemes.map((t) => (
            <ThemeCard key={t.id} theme={t} owned={owned.includes(t.id)} onClick={() => setSelected(t)} />
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
          <div className="bg-surface rounded-2xl p-6 w-full max-w-xs flex flex-col items-center gap-3">
            <span className="text-4xl">{selected.emoji}</span>
            <p className="font-semibold">{selected.name}</p>
            <p className="text-sm text-zinc-500">{selected.price} 🥭</p>
            <p className="text-xs text-zinc-400">구매 후 보유 망고에서 차감돼요</p>
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 rounded-full border border-black/10 py-2 text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 rounded-full bg-brand text-white py-2 text-sm font-medium"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ThemeCard({
  theme,
  owned,
  onClick,
  wide,
}: {
  theme: Theme;
  owned: boolean;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-2 text-left ${wide ? "shrink-0 w-28" : ""}`}
    >
      <div className="aspect-[3/4] rounded-xl bg-surface shadow-sm flex items-center justify-center text-3xl relative">
        {theme.emoji}
        {owned && (
          <span className="absolute top-1.5 right-1.5 text-[10px] bg-brand text-white rounded-full px-1.5 py-0.5">
            보유중
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-medium truncate">{theme.name}</p>
        <p className="text-xs text-zinc-500">{theme.price} 🥭</p>
      </div>
    </button>
  );
}
