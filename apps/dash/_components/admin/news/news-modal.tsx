"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { ContentItem, Status } from "../../../lib/admin/types";
export function NewsFormModal({
  item,
  onClose,
  onSave,
}: {
  item: ContentItem | null;
  onClose: () => void;
  onSave: (data: Partial<ContentItem>) => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "Мэдээ");
  const [status, setStatus] = useState<Status>(item?.status ?? "Ноорог");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Мэдээ удирдлага
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold">
              {item ? "Мэдээ засах" : "Шинэ мэдээ"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Хаах"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Гарчиг
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Ангилал
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Төлөв
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="h-11 rounded-lg border border-input bg-background px-3"
            >
              <option>Нийтлэгдсэн</option>
              <option>Ноорог</option>
            </select>
          </label>
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
          >
            Цуцлах
          </button>
          <button
            disabled={!title.trim()}
            onClick={() => onSave({ title: title.trim(), category, status })}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewsFormModal;
