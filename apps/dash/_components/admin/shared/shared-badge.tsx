import type { Status } from "../../../lib/admin/types";
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status === "Нийтлэгдсэн" ? "bg-soft-blue text-primary" : "bg-secondary text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}
