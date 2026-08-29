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
      <div className="overflow-x-auto">
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
                    <img
                      src={i.image}
                      alt=""
                      className="size-12 rounded-lg object-cover"
                    />
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
                      className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label={`${i.title} устгах`}
                      onClick={() => onDelete(i.id, i.title)}
                      className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive"
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
  );
}
