"use client";
import { CalendarDays, FilePenLine, Globe2, Pencil } from "lucide-react";
import type { ContentItem, EventItem, Section } from "../../lib/admin/types";

function isThisMonth(dateStr: string): boolean {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

export function DashboardHome({
  news,
  events,
  onCreate,
  onNavigate,
}: {
  news: ContentItem[];
  events: EventItem[];
  onCreate: () => void;
  onNavigate: (s: Section) => void;
}) {
  const all = [...news, ...events];
  const published = all.filter((i) => i.status === "Нийтлэгдсэн").length;
  const drafts = all.filter((i) => i.status === "Ноорог").length;
  const thisMonth = news.filter((i) => isThisMonth(i.date)).length;

  const stats = [
    { label: "Нийт контент", value: String(all.length), icon: Globe2 },
    { label: "Нийтлэгдсэн", value: String(published), icon: FilePenLine },
    { label: "Ноорог", value: String(drafts), icon: Pencil },
    { label: "Энэ сарын мэдээ", value: String(thisMonth), icon: CalendarDays },
  ];

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Хянах самбар
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            БСОН-ийн цахим орчныг эндээс хялбар удирдана.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <FilePenLine size={18} />
          Шинэ контент үүсгэх
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon size={18} className="text-primary" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold">Сүүлийн мэдээ</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Сайт дээрх хамгийн сүүлийн мэдээллүүд
            </p>
          </div>
          <button
            onClick={() => onNavigate("news")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Бүгдийг харах
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          {news.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Одоогоор мэдээ байхгүй байна.
            </p>
          )}
          {news.slice(0, 3).map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-3 border-t border-border pt-3"
            >
              {i.image ? (
                <img
                  src={i.image}
                  alt=""
                  className="size-12 shrink-0 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="size-12 shrink-0 rounded-lg bg-secondary" />
              )}
              <p className="truncate text-sm font-medium">{i.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
