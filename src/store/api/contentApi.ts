import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockMovies, mockNews, mockSocial } from "@/lib/mock-data";
import type { FeedItem, MovieItem, NewsItem, SocialPost } from "@/types/content";

const normalizeFetch = async <T>(loader: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    const data = await loader();
    return data;
  } catch {
    return fallback;
  }
};

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fakeBaseQuery<Error>(),
  endpoints: (builder) => ({
    getNews: builder.query<NewsItem[], { category?: string; page?: number }>({
      async queryFn(params = {}) {
        const category = params.category ?? "Technology";
        const fallback = mockNews.filter((item) => item.category === category || category === "All") as NewsItem[];

        const data = await normalizeFetch(async () => {
          const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
          if (!key) {
            return fallback;
          }

          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(category)}&pageSize=6&page=${params.page ?? 1}` +
              `&apiKey=${encodeURIComponent(key)}`,
            { cache: "no-store" },
          );

          if (!response.ok) {
            throw new Error("News API failed");
          }

          const payload = (await response.json()) as {
            articles?: Array<{
              title?: string;
              description?: string;
              source?: { name?: string };
              urlToImage?: string;
              publishedAt?: string;
              url?: string;
            }>;
          };

          const mapped = (payload.articles ?? []).map((article, index) => ({
            id: `${article.url ?? index}-news`,
            kind: "news" as const,
            title: article.title ?? "Untitled article",
            description: article.description ?? "No summary available.",
            source: article.source?.name ?? "News feed",
            category,
            publishedAt: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently",
            image: article.urlToImage ?? "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80",
            url: article.url ?? "#",
            tags: [category, "Latest"],
          }));

          return mapped as NewsItem[];
        }, fallback);

        return { data };
      },
    }),
    getMovies: builder.query<MovieItem[], { category?: string }>({
      async queryFn(params = {}) {
        const category = params.category ?? "Technology";
        const fallback = mockMovies.filter((item) => item.genre.toLowerCase().includes(category.toLowerCase()) || category === "All") as MovieItem[];

        const data = await normalizeFetch(async () => {
          const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
          if (!key) {
            return fallback;
          }

          const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${encodeURIComponent(key)}`,
            { cache: "no-store" },
          );

          if (!response.ok) {
            throw new Error("Movie API failed");
          }

          const payload = (await response.json()) as {
            results?: Array<{
              id?: number;
              title?: string;
              overview?: string;
              release_date?: string;
              vote_average?: number;
              poster_path?: string;
              backdrop_path?: string;
            }>;
          };

          const mapped = (payload.results ?? []).slice(0, 5).map((movie, index) => ({
            id: `movie-${movie.id ?? index}`,
            kind: "movie" as const,
            title: movie.title ?? "Untitled movie",
            overview: movie.overview ?? "No overview available.",
            releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A",
            genre: category === "All" ? "Featured" : category,
            rating: Number(movie.vote_average ?? 0),
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
            backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
            runtime: 120,
            source: "TMDB",
            releaseDate: movie.release_date ?? "N/A",
            tags: [category, "Trending"],
          }));

          return mapped as MovieItem[];
        }, fallback);

        return { data };
      },
    }),
    getSocialPosts: builder.query<SocialPost[], { category?: string }>({
      async queryFn(params = {}) {
        const category = params.category ?? "All";
        const fallback = (category === "All" ? mockSocial : mockSocial.filter((post) => post.category === category)) as SocialPost[];

        const data = await normalizeFetch(async () => {
          const response = await fetch("/api/mock-social", { cache: "no-store" });
          if (!response.ok) {
            throw new Error("Social API failed");
          }

          const payload = (await response.json()) as SocialPost[];
          return payload;
        }, fallback);

        return { data };
      },
    }),
    getCombinedFeed: builder.query<FeedItem[], { interests: string[] }>({
      async queryFn({ interests }) {
        const feed = [
          ...mockNews.filter((item) => interests.length === 0 || interests.includes(item.category)),
          ...mockMovies.filter((item) => interests.length === 0 || interests.some((interest) => item.genre.toLowerCase().includes(interest.toLowerCase()) || item.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase())))),
          ...mockSocial.filter((post) => interests.length === 0 || interests.includes(post.category)),
        ] as FeedItem[];

        return { data: feed.slice(0, 12) };
      },
    }),
  }),
});

export const { useGetNewsQuery, useGetMoviesQuery, useGetSocialPostsQuery, useGetCombinedFeedQuery } = contentApi;
