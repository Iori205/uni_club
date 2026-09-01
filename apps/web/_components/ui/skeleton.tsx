export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Ачаалж байна"
      className={`animate-pulse rounded-md bg-muted ${className}`}
    />
  );
}

/** NewsCard-тэй яг ижил хэмжээ/layout — ачаалж байх үед layout shift үүсэхгүй. */
export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Skeleton className="aspect-3/2 w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-4/5" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

/** EventCard-тэй яг ижил хэмжээ/layout (horizontal, bounded image height). */
export function EventCardSkeleton() {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[minmax(0,280px)_1fr]">
      <Skeleton className="h-48 w-full rounded-none md:h-56" />
      <div className="space-y-3 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </article>
  );
}
