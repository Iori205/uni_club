"use client";
import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { EventItem, Status } from "../../../lib/admin/types";
import { ImageUploadField } from "../shared/image-upload-field";
export function EventFormModal({
  item,
  onClose,
  onSave,
}: {
  item: EventItem | null;
  onClose: () => void;
  onSave: (data: Omit<EventItem, "id">) => Promise<void>;
}) {
  const [form, setForm] = useState<Omit<EventItem, "id">>({
    image: item?.image ?? "",
    alt: item?.alt ?? "",
    date: item?.date ?? "",
    time: item?.time ?? "",
    startTime: item?.startTime ?? "",
    endTime: item?.endTime ?? "",
    location: item?.location ?? "",
    title: item?.title ?? "",
    body: item?.body ?? "",
    status: item?.status ?? "Ноорог",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setForm({
      image: item?.image ?? "",
      alt: item?.alt ?? "",
      date: item?.date ?? "",
      time: item?.time ?? "",
      startTime: item?.startTime ?? "",
      endTime: item?.endTime ?? "",
      location: item?.location ?? "",
      title: item?.title ?? "",
      body: item?.body ?? "",
      status: item?.status ?? "Ноорог",
    });
  }, [item]);
  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({
      ...f,
      [key]: value,
      time:
        key === "startTime" || key === "endTime"
          ? `${key === "startTime" ? value : f.startTime} – ${key === "endTime" ? value : f.endTime}`
          : f.time,
    }));
  const submit = async () => {
    if (
      !form.title.trim() ||
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      !form.location.trim() ||
      !form.body.trim()
    ) {
      setError("Гарчиг, огноо, цаг, байршил, тайлбар талбаруудыг бөглөнө үү.");
      return;
    }
    if (form.endTime < form.startTime) {
      setError("Дуусах цаг эхлэх цагаас хойш байх ёстой.");
      return;
    }
    setSaving(true);
    await onSave({ ...form, time: `${form.startTime} – ${form.endTime}` });
    setSaving(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        className="scrollbar-hide max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-form-title"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Арга хэмжээ удирдлага
            </p>
            <h2
              id="event-form-title"
              className="mt-2 font-serif text-2xl font-bold"
            >
              {item ? "Арга хэмжээ засах" : "Шинэ арга хэмжээ"}
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
              alt={form.alt || "Арга хэмжээний зураг"}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Зургийн тайлбар
            <input
              value={form.alt}
              onChange={(e) => update("alt", e.target.value)}
              placeholder="Зургийн тайлбар"
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Огноо
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
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
          <label className="grid gap-2 text-sm font-medium">
            Эхлэх цаг
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => update("startTime", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Дуусах цаг
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => update("endTime", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Байршил
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="МУИС, ..."
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Гарчиг
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Арга хэмжээний нэр"
              className="h-11 w-full rounded-lg border border-input bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Тайлбар
            <textarea
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              rows={4}
              placeholder="Арга хэмжээний тухай..."
              className="w-full rounded-lg border border-input bg-background px-3 py-3"
            />
          </label>
        </div>
        {error && (
          <p
            className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold"
          >
            Болих
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EventFormModal;
