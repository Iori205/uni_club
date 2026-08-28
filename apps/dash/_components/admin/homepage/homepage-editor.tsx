"use client";
import { useEffect, useState } from "react";
import type { HomepageContent } from "../../../lib/admin/types";

export function HomepageEditor({
  content,
  onSave,
}: {
  content: HomepageContent;
  onSave: (content: HomepageContent) => void;
}) {
  const [form, setForm] = useState(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content);
  }, [content]);

  const update = (key: keyof HomepageContent, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const submit = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(form);
      setSaving(false);
      setSaved(true);
    }, 300);
  };

  return (
    <section>
      <p className="text-sm font-medium text-primary">Вэб сайт тохиргоо</p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight">
        Нүүр хуудас
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Нүүр хуудасны агуулгаа эндээс шинэчилнэ.
      </p>
      <div className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-6">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Нүүр хуудасны гарчиг
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Товч танилцуулга
            <textarea
              value={form.intro}
              onChange={(e) => update("intro", e.target.value)}
              className="min-h-28 rounded-lg border border-input bg-background p-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <button
            onClick={submit}
            disabled={saving}
            className="w-fit rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving
              ? "Хадгалж байна..."
              : saved
                ? "Хадгалагдлаа"
                : "Өөрчлөлт хадгалах"}
          </button>
        </div>
      </div>
    </section>
  );
}
export default HomepageEditor;
