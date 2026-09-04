"use client";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type { EventItem, Status } from "../../../lib/admin/types";
import { StatusBadge } from "../shared/shared-badge";

export function EventView({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: EventItem[];
  onCreate: () => void;
  onEdit: (item: EventItem) => void;
  onDelete: (id: string, label: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"Бүгд" | Status>("Бүгд");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (i.title + i.location).toLowerCase().includes(query.toLowerCase()) &&
          (status === "Бүгд" || i.status === status),
      ),
    [items, query, status],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Контент удирдлага</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Арга хэмжээ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Вэбсайт дээр харагдах арга хэмжээнүүдийг удирдах.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[background-color,transform] active:scale-[0.98] sm:w-auto"
        >
          <Plus size={18} />
          Арга хэмжээ нэмэх
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row">
        <label className="flex h-10 w-full min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 text-muted-foreground">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full min-w-0 bg-transparent text-sm outline-none p-2"
            placeholder="Арга хэмжээ хайх..."
            aria-label="Арга хэмжээ хайх"
          />
        </label>
        <div className="relative w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as "Бүгд" | Status);
              setPage(1);
            }}
            className="h-10 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9 text-sm sm:w-auto"
          >
            <option>Бүгд</option>
            <option>Нийтлэгдсэн</option>
            <option>Ноорог</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/50 text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-medium">Зураг</th>
                <th className="px-5 py-4 font-medium">Гарчиг</th>
                <th className="px-5 py-4 font-medium">Огноо / цаг</th>
                <th className="px-5 py-4 font-medium">Байршил</th>
                <th className="px-5 py-4 font-medium">Төлөв</th>
                <th className="px-5 py-4 text-right font-medium">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/30">
                  <td className="px-5 py-4">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={56}
                      height={56}
                      className="size-14 rounded-lg object-cover"
                    />
                  </td>
                  <td className="max-w-xs truncate px-5 py-4 font-medium text-foreground">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    <div>{item.date}</div>
                    <div className="mt-1 text-xs">{item.time}</div>
                  </td>
                  <td className="max-w-[220px] px-5 py-4 text-muted-foreground">
                    <span className="flex min-w-0 gap-1.5">
                      <MapPin size={15} className="mt-0.5 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEdit(item)}
                        aria-label={`${item.title} засах`}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary active:scale-[0.98]"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id, item.title)}
                        aria-label={`${item.title} устгах`}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
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
        <div className="divide-y divide-border md:hidden">
          {visible.map((item) => (
            <article key={item.id} className="flex gap-3 p-4">
              <img
                src={item.image}
                alt={item.alt}
                width={80}
                height={80}
                className="size-20 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="min-w-0 truncate font-medium leading-5">
                    {item.title}
                  </h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-2 flex min-w-0 gap-1 text-xs text-muted-foreground">
                  <CalendarDays size={14} className="shrink-0" />
                  <span className="truncate">
                    {item.date} · {item.time}
                  </span>
                </p>
                <p className="mt-1 flex min-w-0 gap-1 text-xs text-muted-foreground">
                  <MapPin size={14} className="shrink-0" />
                  <span className="truncate">{item.location}</span>
                </p>
                <div className="mt-2 flex gap-1">
                  <button
                    onClick={() => onEdit(item)}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                    aria-label="Засах"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id, item.title)}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
                    aria-label="Устгах"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <CalendarDays className="text-muted-foreground" size={30} />
            <p className="font-medium">Одоогоор арга хэмжээ байхгүй байна.</p>
            <button
              onClick={onCreate}
              className="text-sm font-semibold text-primary hover:underline"
            >
              + Арга хэмжээ нэмэх
            </button>
          </div>
        )}
      </div>
      {filtered.length > 0 && (
        <div className="flex items-center justify-between py-5">
          <p className="text-sm text-muted-foreground">
            Нийт {filtered.length} арга хэмжээ
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm transition-[background-color,transform] active:scale-[0.98] disabled:opacity-40"
            >
              Өмнөх
            </button>
            <span className="px-2 py-2 text-sm text-muted-foreground">
              {page} / {pages}
            </span>
            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm transition-[background-color,transform] active:scale-[0.98] disabled:opacity-40"
            >
              Дараах
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
export default EventView;
