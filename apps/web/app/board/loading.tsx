import { Skeleton } from "../../_components/ui/skeleton";

function LeadCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center">
      <Skeleton className="size-20 shrink-0 rounded-full md:size-24" />
      <div className="w-full space-y-2">
        <Skeleton className="mx-auto h-5 w-1/2 md:mx-0" />
        <Skeleton className="mx-auto h-4 w-1/3 md:mx-0" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

function MemberCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center">
      <Skeleton className="size-14 shrink-0 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="mx-auto h-4 w-2/3 md:mx-0" />
        <Skeleton className="mx-auto h-3 w-1/3 md:mx-0" />
      </div>
    </div>
  );
}

export default function BoardLoading() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-5 pt-4 pb-10 sm:pb-14 md:pt-6 lg:px-8 lg:pb-16">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-3 h-9 w-64" />

        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
          <LeadCardSkeleton />
          <LeadCardSkeleton />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
        </div>
      </div>
    </section>
  );
}
