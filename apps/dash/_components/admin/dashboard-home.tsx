"use client";
import { CalendarDays, FilePenLine, Globe2, Pencil, Plus } from "lucide-react";
import type { ContentItem, Section } from "../../lib/admin/types";
export function DashboardHome({
  news,
  onCreate,
  onNavigate,
}: {
  news: ContentItem[];
  onCreate: () => void;
  onNavigate: (s: Section) => void;
}) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">2024 оны 6-р сар</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Сайн байна уу, Бат-Эрдэнэ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            БСОН-ийн цахим орчныг эндээс хялбар удирдана.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Plus size={18} />
          Шинэ контент үүсгэх
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Нийт контент", "128", Globe2],
          ["Нийтлэгдсэн", "96", FilePenLine],
          ["Ноорог", "32", Pencil],
          ["Энэ сарын мэдээ", "18", CalendarDays],
        ].map(([label, value, Icon]) => (
          <div
            key={label as string}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{label as string}</p>
              <Icon size={18} className="text-primary" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{value as string}</p>
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
          {news.slice(0, 3).map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-3 border-t border-border pt-3"
            >
              <img
                src={i.image}
                alt=""
                className="size-12 rounded-lg object-cover"
              />
              <p className="truncate text-sm font-medium">{i.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
