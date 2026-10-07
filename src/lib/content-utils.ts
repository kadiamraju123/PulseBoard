import { defaultInterests, mockMovies, mockNews, mockSocial } from "@/lib/mock-data";
import type { FeedItem, Interest, MovieItem, NewsItem, SocialPost } from "@/types/content";

export function normalizeCategory(value: string): string {
  return value.toLowerCase();
}

export function getSearchText(item: FeedItem): string {
  if (item.kind === "news") {
    return [
      "news",
      "article",
      item.title,
      item.description,
      item.category,
      item.source,
      item.publishedAt,
      item.tags.join(" "),
    ].join(" ").toLowerCase();
  }

  if (item.kind === "movie") {
    return [
      "movie",
      "movies",
      "film",
      item.title,
      item.overview,
      item.genre,
      item.releaseYear,
      item.source,
      item.tags.join(" "),
    ].join(" ").toLowerCase();
  }

  return [
    "social",
    "post",
    "posts",
    item.user,
    item.handle,
    item.text,
    item.hashtags.join(" "),
    item.category,
  ].join(" ").toLowerCase();
}

export function matchesInterest(item: FeedItem, interests: Interest[]): boolean {
  if (interests.length === 0) {
    return true;
  }

  const category = item.kind === "news" ? item.category : item.kind === "movie" ? item.genre : item.category;
  if (!category) {
    return true;
  }

  return interests.some((interest) => interest.toLowerCase() === category.toLowerCase());
}

export function getPersonalizedFeed(interests: Interest[] = defaultInterests): FeedItem[] {
  const items: FeedItem[] = [
    ...mockNews.filter((news) => matchesInterest(news, interests)),
    ...mockMovies.filter((movie) => matchesInterest(movie, interests)),
    ...mockSocial.filter((post) => matchesInterest(post, interests)),
  ];

  return items.slice(0, 9);
}

export function filterContentByQuery(items: FeedItem[], query: string): FeedItem[] {
  const value = query.trim().toLowerCase();

  if (!value) {
    return items;
  }

  return items.filter((item) => getSearchText(item).includes(value));
}

export function getContentStats(interests: Interest[]) {
  return {
    score: Math.min(98, 72 + interests.length * 4),
    favorites: 0,
    interestsSelected: interests.length,
    contentCount: getPersonalizedFeed(interests).length,
  };
}

export function getAllContent(): FeedItem[] {
  return [...mockNews, ...mockMovies, ...mockSocial];
}

export function formatMovieYear(movie: MovieItem): string {
  return movie.releaseYear || "N/A";
}

export function isFavoriteMatch(item: FeedItem, favorites: Array<{ id: string; kind: string }>): boolean {
  return favorites.some((favorite) => favorite.id === item.id && favorite.kind === item.kind);
}

export function formatRelativeTime(dateText?: string): string {
  if (!dateText) {
    return "Recently";
  }

  return dateText;
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));
}

export function getContentByType(type: string): FeedItem[] {
  if (type === "news") {
    return mockNews as NewsItem[];
  }

  if (type === "movie") {
    return mockMovies as MovieItem[];
  }

  if (type === "social") {
    return mockSocial as SocialPost[];
  }

  return getAllContent();
}
