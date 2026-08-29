"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { ContentItem, Status } from "../../../lib/admin/types";
import { ImageUploadField } from "../shared/image-upload-field";

type Props = {
  item: ContentItem | null;
  onClose: () => void;
  onSave: (data: Partial<ContentItem>) => Promise<void>;
};
const tags = ["Зарлал", "Хөтөлбөр", "Эрдэм шинжилгээ", "Мэдээ"];

export function NewsFormModal({ item, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    image: item?.image ?? "",
    alt: item?.alt ?? "",
    category: item?.category ?? "Мэдээ",
    date: item?.date ?? "",
    title: item?.title ?? "",
    body: item?.body ?? "",
    status: item?.status ?? ("Ноорог" as Status),
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setForm({
      image: item?.image ?? "",
      alt: item?.alt ?? "",
      category: item?.category ?? "Мэдээ",
      date: item?.date ?? "",
      title: item?.title ?? "",
      body: item?.body ?? "",
      status: item?.status ?? ("Ноорог" as Status),
    });
  }, [item]);
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = async () => {
    if (!form.title.trim() || !form.date.trim() || !form.body.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        className="scrollbar-hide max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-form-title"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Мэдээ удирдлага
            </p>
            <h2
              id="news-form-title"
              className="mt-2 font-serif text-2xl font-bold"
            >
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Зургийн URL
            <ImageUploadField
              value={form.image}
              onChange={(value) => update("image", value)}
              alt="Мэдээний зурагны урьдчилсан харагдац"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Зургийн тайлбар
            <input
              value={form.alt}
              onChange={(e) => update("alt", e.target.value)}
              placeholder="Зургийн тайлбар"
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Таг / ангилал
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9"
              >
                {tags.map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Огноо
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Гарчиг
            <input
              required
              autoFocus
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Агуулга
            <textarea
              required
              rows={4}
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Төлөв
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value as Status)}
                className="h-11 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9"
              >
                <option>Нийтлэгдсэн</option>
                <option>Ноорог</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
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
            disabled={
              saving ||
              !form.title.trim() ||
              !form.date.trim() ||
              !form.body.trim()
            }
            onClick={submit}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewsFormModal;
