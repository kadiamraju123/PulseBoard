"use client";

import { ContentCard } from "@/components/content/content-card";
import { EmptyState } from "@/components/content/empty-state";
import { useAppSelector } from "@/store/hooks";
import { getAllContent } from "@/lib/content-utils";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites);
  const allContent = getAllContent();

  const favoriteItems = allContent.filter((item) => favorites.some((favorite) => favorite.id === item.id && favorite.kind === item.kind));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-500">Favorites</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Saved for later</h1>
      </div>

      {favoriteItems.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favoriteItems.map((item) => (
            <ContentCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorites yet"
          description="Save articles, movies, and posts you want to come back to later."
          actionLabel="Explore Content"
          href="/discover"
        />
      )}
    </div>
  );
}
