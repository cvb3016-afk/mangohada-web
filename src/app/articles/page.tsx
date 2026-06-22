"use client";

import { useMemo, useState } from "react";

type Category = "유언" | "장례" | "마무리";

type Article = {
  id: string;
  title: string;
  preview: string;
  category: Category;
  emoji: string;
};

const articles: Article[] = [
  {
    id: "1",
    title: "소중한 사람에게 건네지 못한 말",
    preview:
      "여러분에게는 입 밖으로 꺼내지 못한 채 마음 속에만 오래 담아둔 말이 있으신가요…",
    category: "유언",
    emoji: "💌",
  },
  {
    id: "2",
    title: "좋은 죽음이란 무엇일까요",
    preview:
      "지난 5월 7일, KBS 1TV 다큐인사이트에서 '좋은 죽음을 묻습니다'가 방영됐어요…",
    category: "장례",
    emoji: "🕊️",
  },
  {
    id: "3",
    title: "어버이날, 부모님께도 나에게…",
    preview:
      "매년 어버이날이 되면 카네이션을 사고 용돈을 챙겨드리고, 온 가족이 함께 맛있는…",
    category: "마무리",
    emoji: "🌷",
  },
  {
    id: "4",
    title: "바쁘게 살았는데 왜 기억나는…",
    preview:
      "오늘 하루, 어떻게 보내셨어요? 혹시 어떤 일들이 있었는지 기억하실 수 있나요. 그…",
    category: "유언",
    emoji: "📝",
  },
];

const tabs: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "유언", label: "유언" },
  { key: "장례", label: "장례" },
  { key: "마무리", label: "마무리" },
];

export default function ArticlesPage() {
  const [tab, setTab] = useState<"all" | Category>("all");

  const filtered = useMemo(
    () => (tab === "all" ? articles : articles.filter((a) => a.category === tab)),
    [tab]
  );

  return (
    <main className="flex flex-1 flex-col lg:max-w-4xl lg:mx-auto lg:w-full">
      <div className="flex border-b border-black/5 px-5 pt-6 lg:px-10 lg:pt-10">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 pb-3 text-sm transition-colors border-b-2 -mb-px ${
                active
                  ? "font-bold text-black border-black"
                  : "text-zinc-400 border-transparent"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col px-5 lg:px-10">
        {filtered.map((a) => (
          <div key={a.id} className="flex gap-4 py-5 border-b border-black/5">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{a.title}</p>
              <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2">{a.preview}</p>
              <p className="text-xs text-zinc-400 mt-2">망고하다</p>
            </div>
            <div className="w-20 h-20 rounded-lg bg-surface shadow-sm flex items-center justify-center text-3xl shrink-0">
              {a.emoji}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-zinc-400">아티클이 없어요.</p>
        )}
      </div>
    </main>
  );
}
