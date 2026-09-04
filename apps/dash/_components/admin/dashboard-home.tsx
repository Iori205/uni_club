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
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[background-color,transform] active:scale-[0.98] sm:w-auto"
        >
          <FilePenLine size={18} />
          Шинэ контент үүсгэх
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="min-w-0 rounded-xl border border-border bg-card p-3.5 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                {label}
              </p>
              <Icon className="size-4 shrink-0 text-primary sm:size-[18px]" />
            </div>
            <p className="mt-2.5 text-2xl font-semibold sm:mt-4 sm:text-3xl">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 min-w-0 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-bold">Сүүлийн мэдээ</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Сайт дээрх хамгийн сүүлийн мэдээллүүд
            </p>
          </div>
          <button
            onClick={() => onNavigate("news")}
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:underline active:scale-[0.98]"
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
              className="flex min-w-0 items-center gap-3 border-t border-border pt-3"
            >
              {i.image ? (
                <div className="size-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={i.image}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
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
