export function DashboardStatSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 h-7 w-16 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="h-48 bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export function TrendingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}
