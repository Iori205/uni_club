import { FilePenLine, Pencil, Trash2 } from "lucide-react";
import type { ContentItem } from "../../../lib/admin/types";
import { StatusBadge } from "../shared/shared-badge";
export function NewsTable({
  items,
  onEdit,
  onDelete,
}: {
  items: ContentItem[];
  onEdit: (i: ContentItem) => void;
  onDelete: (id: string, label: string) => void;
}) {
  if (!items.length)
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <FilePenLine className="mx-auto text-muted-foreground" size={30} />
        <h3 className="mt-4 font-serif text-xl font-bold">Мэдээ олдсонгүй</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Хайлтын нөхцөлөө өөрчлөх эсвэл шинэ мэдээ үүсгэнэ үү.
        </p>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-4">Мэдээ</th>
              <th className="px-5 py-4">Ангилал</th>
              <th className="px-5 py-4">Огноо</th>
              <th className="px-5 py-4">Төлөв</th>
              <th className="px-5 py-4 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((i) => (
              <tr key={i.id} className="group hover:bg-secondary/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={i.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="max-w-[360px] truncate text-sm font-medium">
                      {i.title}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {i.category}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {i.date}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={i.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      aria-label={`${i.title} засах`}
                      onClick={() => onEdit(i)}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary active:scale-[0.98]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label={`${i.title} устгах`}
                      onClick={() => onDelete(i.id, i.title)}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive active:scale-[0.98]"
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
        {items.map((i) => (
          <article key={i.id} className="flex gap-3 p-4">
            <div className="size-16 shrink-0 overflow-hidden rounded-lg">
              <img
                src={i.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 truncate font-medium leading-5">
                  {i.title}
                </p>
                <StatusBadge status={i.status} />
              </div>
              <p className="mt-1.5 truncate text-xs text-muted-foreground">
                {i.category} · {i.date}
              </p>
              <div className="mt-2.5 flex gap-1">
                <button
                  aria-label={`${i.title} засах`}
                  onClick={() => onEdit(i)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
                >
                  <Pencil size={16} />
                </button>
                <button
                  aria-label={`${i.title} устгах`}
                  onClick={() => onDelete(i.id, i.title)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive active:scale-[0.98]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
