import { ContentCard } from "@/components/content/content-card";
import { getPersonalizedFeed } from "@/lib/content-utils";

export default function DiscoverPage() {
  const feed = getPersonalizedFeed();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-500">Discover</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Personalized content for you</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {feed.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
