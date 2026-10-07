import { Suspense } from "react";
import { SearchPanel } from "@/components/search/search-panel";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">Loading search…</div>}>
      <SearchPanel />
    </Suspense>
  );
}
