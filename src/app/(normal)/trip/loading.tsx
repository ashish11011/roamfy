import { Skeleton } from "@/components/ui/skeleton";

export default function TripPageSkeleton() {
  return (
    <div aria-label="Loading trip" role="status">
      <Skeleton className="h-[280px] md:h-[360px] w-full rounded-none" />
      <div className="site-container page-content trip-layout">
        <div className="space-y-8">
          <Skeleton className="h-44 w-full rounded-[24px]" />
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-28 w-full rounded-[24px]" />
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-44 w-full rounded-[24px]" />
        </div>
        <Skeleton className="h-[580px] w-full rounded-[24px]" />
      </div>
      <span className="sr-only">Loading trip details…</span>
    </div>
  );
}
