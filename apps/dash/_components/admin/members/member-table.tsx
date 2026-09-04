import { Pencil, Trash2, Users } from "lucide-react";
import type { MemberItem } from "../../../lib/admin/types";
export function MemberTable({
  items,
  onEdit,
  onDelete,
}: {
  items: MemberItem[];
  onEdit: (i: MemberItem) => void;
  onDelete: (id: string, label: string) => void;
}) {
  if (!items.length)
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <Users className="mx-auto text-muted-foreground" size={30} />
        <h3 className="mt-4 font-serif text-xl font-bold">Гишүүн олдсонгүй</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Хайлтын нөхцөлөө өөрчлөх эсвэл шинэ гишүүн үүсгэнэ үү.
        </p>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-4">Гишүүн</th>
              <th className="px-5 py-4">Албан тушаал</th>
              <th className="px-5 py-4">Эрэмбэ</th>
              <th className="px-5 py-4 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((i) => (
              <tr key={i.id} className="group hover:bg-secondary/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {i.image ? (
                      <img
                        src={i.image}
                        alt=""
                        className="size-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                        <Users size={18} />
                      </div>
                    )}
                    <p className="max-w-[280px] truncate text-sm font-medium">
                      {i.name}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {i.role}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {i.sortOrder}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      aria-label={`${i.name} засах`}
                      onClick={() => onEdit(i)}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary active:scale-[0.98]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label={`${i.name} устгах`}
                      onClick={() => onDelete(i.id, i.name)}
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
          <article key={i.id} className="flex items-center gap-3 p-4">
            {i.image ? (
              <img
                src={i.image}
                alt=""
                className="size-14 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Users size={18} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium leading-5">{i.name}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {i.role}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Эрэмбэ: {i.sortOrder}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                aria-label={`${i.name} засах`}
                onClick={() => onEdit(i)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
              >
                <Pencil size={16} />
              </button>
              <button
                aria-label={`${i.name} устгах`}
                onClick={() => onDelete(i.id, i.name)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive active:scale-[0.98]"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
