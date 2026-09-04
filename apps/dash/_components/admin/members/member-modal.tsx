"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { MemberItem } from "../../../lib/admin/types";
import { ImageUploadField } from "../shared/image-upload-field";

type Props = {
  item: MemberItem | null;
  onClose: () => void;
  onSave: (data: Partial<MemberItem>) => Promise<void>;
};

export function MemberFormModal({ item, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    image: item?.image ?? "",
    name: item?.name ?? "",
    role: item?.role ?? "",
    bio: item?.bio ?? "",
    sortOrder: item?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setForm({
      image: item?.image ?? "",
      name: item?.name ?? "",
      role: item?.role ?? "",
      bio: item?.bio ?? "",
      sortOrder: item?.sortOrder ?? 0,
    });
  }, [item]);
  const update = (key: keyof typeof form, value: string | number) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
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
        aria-labelledby="member-form-title"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Удирдах зөвлөл
            </p>
            <h2
              id="member-form-title"
              className="mt-2 font-serif text-2xl font-bold"
            >
              {item ? "Гишүүн засах" : "Шинэ гишүүн"}
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
            Зураг
            <ImageUploadField
              value={form.image}
              onChange={(value) => update("image", value)}
              alt="Гишүүний зурагны урьдчилсан харагдац"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Нэр
            <input
              required
              autoFocus
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Албан тушаал
            <input
              required
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Товч танилцуулга
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Эрэмбэ
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => update("sortOrder", Number(e.target.value))}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
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
            disabled={saving || !form.name.trim() || !form.role.trim()}
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
export default MemberFormModal;
