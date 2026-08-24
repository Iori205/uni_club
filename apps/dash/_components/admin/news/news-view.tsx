"use client";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import type { ContentItem, Status } from "../../../lib/admin/types";
import { NewsTable } from "./news-table";
export function NewsView({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: ContentItem[];
  onCreate: () => void;
  onEdit: (i: ContentItem) => void;
  onDelete: (id: number) => void;
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"Бүгд" | Status>("Бүгд");
  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(q.toLowerCase()) &&
      (status === "Бүгд" || i.status === status),
  );
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Контент удирдлага</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Мэдээ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Сургуулийн шинэ мэдээ, мэдээллээ нэг дороос удирдана.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Plus size={18} />
          Шинэ мэдээ
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 text-muted-foreground">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Мэдээ хайх..."
            aria-label="Мэдээ хайх"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Бүгд" | Status)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none"
        >
          <option>Бүгд</option>
          <option>Нийтлэгдсэн</option>
          <option>Ноорог</option>
        </select>
      </div>
      <p className="my-5 text-sm text-muted-foreground">
        Нийт{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        мэдээ
      </p>
      <NewsTable items={filtered} onEdit={onEdit} onDelete={onDelete} />
    </section>
  );
}
