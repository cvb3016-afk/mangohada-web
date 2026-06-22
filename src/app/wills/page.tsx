"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type WillType = "text" | "photo" | "video";

type Will = {
  id: string;
  date: string; // YYYY-MM-DD
  type: WillType;
  title: string;
  preview: string;
  recipients: string[];
  theme: string;
  duration?: string;
};

const mockWills: Will[] = [
  {
    id: "1",
    date: "2026-06-10",
    type: "text",
    title: "엄마에게",
    preview: "그동안 키워주셔서 감사했어요. 항상 건강하시고...",
    recipients: ["엄마"],
    theme: "🌅",
  },
  {
    id: "2",
    date: "2026-05-02",
    type: "video",
    title: "동생에게 남기는 말",
    preview: "영상으로 남긴 마지막 인사",
    recipients: ["동생"],
    theme: "🎬",
    duration: "02:14",
  },
  {
    id: "3",
    date: "2026-03-21",
    type: "photo",
    title: "우리 가족 앨범",
    preview: "함께했던 순간들을 모았어요",
    recipients: ["가족 전체"],
    theme: "📷",
  },
];

const tabs: { key: "all" | WillType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "text", label: "글" },
  { key: "photo", label: "사진" },
  { key: "video", label: "영상" },
];

export default function WillsPage() {
  const [tab, setTab] = useState<"all" | WillType>("all");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const filtered = useMemo(() => {
    const items = tab === "all" ? mockWills : mockWills.filter((w) => w.type === tab);
    return [...items].sort((a, b) =>
      sort === "latest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );
  }, [tab, sort]);

  const year = filtered[0]?.date.slice(0, 4) ?? new Date().getFullYear().toString();

  return (
    <main className="flex flex-1 flex-col gap-4 px-5 pt-6 relative lg:max-w-4xl lg:mx-auto lg:w-full lg:px-10 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold lg:text-2xl">내 유언</h1>
        <span className="text-sm text-zinc-400">유언 수신인 관리</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-surface rounded-full p-1 shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tab === t.key ? "bg-brand text-white" : "text-zinc-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setView(view === "list" ? "calendar" : "list")}
          aria-label="보기 전환"
          className="text-lg text-zinc-400"
        >
          {view === "list" ? "🗓️" : "📋"}
        </button>
      </div>

      {view === "calendar" ? (
        <div className="bg-surface rounded-2xl shadow-sm p-8 text-center text-sm text-zinc-400">
          캘린더 보기는 준비 중이에요.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mt-1">
            <h2 className="font-bold">{year}</h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
              className="text-xs text-zinc-500 bg-transparent"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-surface rounded-2xl shadow-sm p-10 text-center text-sm text-zinc-400">
              아직 작성한 유언이 없어요.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((w) => (
                <div key={w.id} className="flex gap-3">
                  <span className="text-xs text-zinc-400 w-10 pt-1 shrink-0">
                    {w.date.slice(5).replace("-", "/")}
                  </span>
                  <div className="flex-1 bg-surface rounded-2xl shadow-sm p-4 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{w.title}</p>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{w.preview}</p>
                      <span className="inline-block mt-2 text-[11px] bg-brand/10 text-brand-dark px-2 py-0.5 rounded-full">
                        {w.recipients.join(", ")}
                      </span>
                    </div>
                    {w.type === "video" ? (
                      <div className="relative w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center text-lg shrink-0">
                        ▶
                        <span className="absolute bottom-0.5 right-1 text-[9px] text-zinc-500">
                          {w.duration}
                        </span>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center text-xl shrink-0">
                        {w.theme}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Link
        href="/wills/new"
        aria-label="유언 작성"
        className="fixed bottom-24 left-1/2 translate-x-[139px] lg:absolute lg:left-auto lg:translate-x-0 lg:bottom-8 lg:right-8 w-14 h-14 rounded-full bg-brand text-white text-2xl flex items-center justify-center shadow-lg"
      >
        ✏️
      </Link>
    </main>
  );
}
