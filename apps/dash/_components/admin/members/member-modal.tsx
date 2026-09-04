"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { MemberItem } from "../../../lib/admin/types";
import { ImageUploadField } from "../shared/image-upload-field";
import { Modal } from "../../ui/modal";

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
  const [open, setOpen] = useState(true);
  const requestClose = () => setOpen(false);
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
    <Modal
      open={open}
      onClose={requestClose}
      onExited={onClose}
      labelledBy="member-form-title"
    >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
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
            onClick={requestClose}
            aria-label="Хаах"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
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
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={requestClose}
            className="min-h-11 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98] sm:w-auto"
          >
            Цуцлах
          </button>
          <button
            disabled={saving || !form.name.trim() || !form.role.trim()}
            onClick={submit}
            className="min-h-11 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-[background-color,transform] active:scale-[0.98] disabled:opacity-50 sm:w-auto"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
    </Modal>
  );
}
export default MemberFormModal;
