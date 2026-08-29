"use client";
import { CalendarDays, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ContentItem, Status } from "../../../lib/admin/types";
import { StatusBadge } from "../shared/shared-badge";
export function ActivityView({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: ContentItem[];
  onCreate: () => void;
  onEdit: (i: ContentItem) => void;
  onDelete: (id: string, label: string) => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Бүгд");
  const [status, setStatus] = useState<"Бүгд" | Status>("Бүгд");
  const cats = ["Бүгд", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(q.toLowerCase()) &&
      (cat === "Бүгд" || i.category === cat) &&
      (status === "Бүгд" || i.status === status),
  );
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Контент удирдлага</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Үйл ажиллагаа
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Сургуулийн үйл ажиллагаа, арга хэмжээг нэг дороос удирдана.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Plus size={18} />
          Шинэ үйл ажиллагаа
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 text-muted-foreground">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Үйл ажиллагаа хайх..."
            aria-label="Үйл ажиллагаа хайх"
          />
        </label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
        >
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Бүгд" | Status)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option>Бүгд</option>
          <option>Нийтлэгдсэн</option>
          <option>Ноорог</option>
        </select>
      </div>
      <p className="my-5 text-sm text-muted-foreground">
        Нийт{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        үйл ажиллагаа
      </p>
      {filtered.length ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-border bg-secondary/50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-4">Үйл ажиллагаа</th>
                  <th className="px-5 py-4">Огноо</th>
                  <th className="px-5 py-4">Байршил</th>
                  <th className="px-5 py-4">Ангилал</th>
                  <th className="px-5 py-4">Төлөв</th>
                  <th className="px-5 py-4 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((i) => (
                  <tr key={i.id} className="hover:bg-secondary/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={i.image}
                          alt=""
                          className="size-12 rounded-lg object-cover"
                        />
                        <span className="max-w-[260px] truncate text-sm font-medium">
                          {i.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {i.date}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {i.location ?? "МУИС, төв байр"}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {i.category}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={i.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          aria-label={`${i.title} засах`}
                          onClick={() => onEdit(i)}
                          className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          aria-label={`${i.title} устгах`}
                          onClick={() => onDelete(i.id, i.title)}
                          className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <CalendarDays className="mx-auto text-muted-foreground" size={30} />
          <h3 className="mt-4 font-serif text-xl font-bold">
            Үйл ажиллагаа олдсонгүй
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Хайлтын нөхцөлөө өөрчлөх эсвэл шинэ үйл ажиллагаа үүсгэнэ үү.
          </p>
        </div>
      )}
    </section>
  );
}
export default ActivityView;
