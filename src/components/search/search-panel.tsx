"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { mockNews, mockMovies, mockSocial } from "@/lib/mock-data";
import { getSearchText } from "@/lib/content-utils";
import { ContentCard } from "@/components/content/content-card";
import type { FeedItem } from "@/types/content";

const groupItems = (items: FeedItem[]) => ({
  news: items.filter((item) => item.kind === "news"),
  movies: items.filter((item) => item.kind === "movie"),
  social: items.filter((item) => item.kind === "social"),
});

export function SearchPanel() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();

  const filtered = useMemo(() => {
    if (!q) return [];
    const query = q.toLowerCase();
    const allItems: FeedItem[] = [...mockNews, ...mockMovies, ...mockSocial];
    return allItems.filter((item) => getSearchText(item).toLowerCase().includes(query));
  }, [q]);

  const groups = groupItems(filtered);

  if (!q) {
    return <div className="rounded-3xl border border-dashed border-[#302b4a] bg-[#121021] p-14 text-center"><Search className="mx-auto h-8 w-8 text-slate-600" /><h2 className="mt-4 text-2xl font-semibold text-white">Search PulseBoard</h2><p className="mt-2 text-slate-500">Search across news, movies, and community posts.</p></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-[#9d94ff]"><Sparkles className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-[0.14em]">Search</span></div>
        <h1 className="mt-2 text-2xl font-semibold text-white">Results for “{q}”</h1>
        <p className="mt-1 text-sm text-slate-500">{filtered.length} matching item{filtered.length === 1 ? "" : "s"} across your content sources.</p>
      </div>

      {[
        { key: "news", label: "News", items: groups.news },
        { key: "movies", label: "Movies", items: groups.movies },
        { key: "social", label: "Social", items: groups.social },
      ].map(({ key, label, items }) => (
        <section key={key} className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-white">{label}</h2><span className="text-xs text-slate-500">{items.length} result{items.length === 1 ? "" : "s"}</span></div>
          {items.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{items.map((item) => <ContentCard key={item.id} item={item} />)}</div> : <div className="rounded-2xl border border-[#29253d] bg-[#121021] px-5 py-4 text-sm text-slate-500">No {label.toLowerCase()} matches for “{q}”.</div>}
        </section>
      ))}

      {!filtered.length ? <div className="rounded-3xl border border-dashed border-[#302b4a] bg-[#121021] p-12 text-center"><Search className="mx-auto h-8 w-8 text-slate-600" /><h2 className="mt-4 text-lg font-semibold text-white">No results found</h2><p className="mt-2 text-sm text-slate-500">Try a title, category, source, hashtag, or keyword.</p></div> : null}
    </div>
  );
}
