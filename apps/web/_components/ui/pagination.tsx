import { cn } from "../../lib/utils";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

/** Only worth rendering once there's more than one page — callers should conditionally mount this. */
export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          "rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors",
          page <= 1
            ? "cursor-not-allowed opacity-40"
            : "hover:border-primary hover:text-primary",
        )}
      >
        Өмнөх
      </button>
      <span className="text-sm text-muted-foreground">
        {page} / {pageCount}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={cn(
          "rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors",
          page >= pageCount
            ? "cursor-not-allowed opacity-40"
            : "hover:border-primary hover:text-primary",
        )}
      >
        Дараах
      </button>
    </div>
  );
}
