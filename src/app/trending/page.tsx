import { TrendingUp } from "lucide-react";
import { mockTrending } from "@/lib/mock-data";
import { ContentCard } from "@/components/content/content-card";

export default function TrendingPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-500">Trending</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">What’s hot right now</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-violet-500" />
            Trending News
          </div>
          <div className="space-y-4">
            {mockTrending.news.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="text-xs font-semibold uppercase text-violet-500">#{index + 1}</div>
                <h3 className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-violet-500" />
            Trending Movies
          </div>
          <div className="space-y-4">
            {mockTrending.movies.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="text-xs font-semibold uppercase text-violet-500">#{index + 1}</div>
                <h3 className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-violet-500" />
            Community Posts
          </div>
          <div className="space-y-4">
            {mockTrending.social.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="text-xs font-semibold uppercase text-violet-500">#{index + 1}</div>
                <h3 className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{item.text}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...mockTrending.news, ...mockTrending.movies, ...mockTrending.social].slice(0, 6).map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
