"use client";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import type { MemberItem } from "../../../lib/admin/types";
import { MemberTable } from "./member-table";
export function MemberView({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: MemberItem[];
  onCreate: () => void;
  onEdit: (i: MemberItem) => void;
  onDelete: (id: string, label: string) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(q.toLowerCase()) ||
      i.role.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Контент удирдлага</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Удирдах зөвлөл
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Удирдах зөвлөлийн гишүүдийн мэдээллийг нэг дороос удирдана.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Plus size={18} />
          Шинэ гишүүн
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 text-muted-foreground">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Гишүүн хайх..."
            aria-label="Гишүүн хайх"
          />
        </label>
      </div>
      <p className="my-5 text-sm text-muted-foreground">
        Нийт{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        гишүүн
      </p>
      <MemberTable items={filtered} onEdit={onEdit} onDelete={onDelete} />
    </section>
  );
}
