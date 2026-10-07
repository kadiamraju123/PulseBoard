"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Layers3,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useAppSelector } from "@/store/hooks";
import { getPersonalizedFeed } from "@/lib/content-utils";
import { ContentCard } from "@/components/content/content-card";
import {
  CardSkeleton,
  DashboardStatSkeleton,
} from "@/components/content/loading-skeletons";
import { useGetCombinedFeedQuery } from "@/store/api/contentApi";

const filters = [
  "All",
  "News",
  "Movies",
  "Social",
  "Technology",
  "Artificial Intelligence",
  "Entertainment",
  "Science",
  "Gaming",
];

export function DashboardHome() {
  const interests = useAppSelector((state) => state.preferences);
  const favorites = useAppSelector((state) => state.favorites);

  const {
    data: combined,
    isLoading,
    isError,
  } = useGetCombinedFeedQuery({ interests });

  const [activeFilter, setActiveFilter] = useState("All");

  /*
   * ============================================================
   * BASE FEED
   * ============================================================
   */
  const sourceFeed = useMemo(() => {
    if (combined && combined.length > 0) {
      return combined;
    }

    return getPersonalizedFeed(interests);
  }, [combined, interests]);

  /*
   * ============================================================
   * FILTERED FEED
   * ============================================================
   */
  const feed = useMemo(() => {
    if (activeFilter === "All") {
      return sourceFeed;
    }

    const normalizedFilter = activeFilter
      .toLowerCase()
      .replace(/[\s_-]+/g, "");

    return sourceFeed.filter((item) => {
      /*
       * Content type filters
       */
      if (activeFilter === "News") {
        return item.kind === "news";
      }

      if (activeFilter === "Movies") {
        return item.kind === "movie";
      }

      if (activeFilter === "Social") {
        return item.kind === "social";
      }

      /*
       * FeedItem is a union type.
       * Safely read optional properties.
       */
      const safeItem = item as {
        category?: unknown;
        genre?: unknown;
        tags?: unknown;
      };

      const category =
        typeof safeItem.category === "string"
          ? safeItem.category
              .toLowerCase()
              .replace(/[\s_-]+/g, "")
          : "";

      const genre =
        typeof safeItem.genre === "string"
          ? safeItem.genre
              .toLowerCase()
              .replace(/[\s_-]+/g, "")
          : "";

      const tags = Array.isArray(safeItem.tags)
        ? safeItem.tags.filter(
            (tag): tag is string =>
              typeof tag === "string"
          )
        : [];

      /*
       * Category match
       */
      if (
        category &&
        (category.includes(normalizedFilter) ||
          normalizedFilter.includes(category))
      ) {
        return true;
      }

      /*
       * Genre match
       */
      if (
        genre &&
        (genre.includes(normalizedFilter) ||
          normalizedFilter.includes(genre))
      ) {
        return true;
      }

      /*
       * Tags match
       */
      if (
        tags.some((tag) =>
          tag
            .toLowerCase()
            .replace(/[\s_-]+/g, "")
            .includes(normalizedFilter)
        )
      ) {
        return true;
      }

      return false;
    });
  }, [sourceFeed, activeFilter]);

  /*
   * ============================================================
   * MATCH SCORE
   * ============================================================
   *
   * Definition:
   *
   * Match Score measures how relevant the CURRENTLY DISPLAYED
   * feed is to the user's selected interests.
   *
   * Each content item receives a relevance score:
   *
   *   0 matched interests  -> 30%
   *   1 matched interest    -> 45%
   *   2 matched interests   -> 60%
   *   3 matched interests   -> 75%
   *   4 matched interests   -> 90%
   *
   * The final Match Score is the average of all displayed
   * content items.
   *
   * If there is no content:
   *
   *   Match Score = —
   *
   * This prevents fake 35% / 95% values.
   * ============================================================
   */
  const matchScore = useMemo(() => {
    /*
     * No feed means there is nothing to calculate.
     */
    if (feed.length === 0) {
      return null;
    }

    /*
     * No interests means neutral relevance.
     */
    if (interests.length === 0) {
      return 50;
    }

    /*
     * Normalize user interests.
     */
    const normalizedInterests = interests.map((interest) =>
      interest
        .toLowerCase()
        .replace(/[\s_-]+/g, "")
    );

    /*
     * Calculate score for every visible item.
     */
    const itemScores = feed.map((item) => {
      /*
       * Safely read optional FeedItem fields.
       */
      const safeItem = item as {
        title?: unknown;
        description?: unknown;
        category?: unknown;
        genre?: unknown;
        tags?: unknown;
      };

      const title =
        typeof safeItem.title === "string"
          ? safeItem.title
          : "";

      const description =
        typeof safeItem.description === "string"
          ? safeItem.description
          : "";

      const category =
        typeof safeItem.category === "string"
          ? safeItem.category
          : "";

      const genre =
        typeof safeItem.genre === "string"
          ? safeItem.genre
          : "";

      const tags = Array.isArray(safeItem.tags)
        ? safeItem.tags.filter(
            (tag): tag is string =>
              typeof tag === "string"
          )
        : [];

      /*
       * Build searchable text.
       */
      const searchableText = [
        title,
        description,
        category,
        genre,
        ...tags,
      ]
        .join(" ")
        .toLowerCase()
        .replace(/[\s_-]+/g, "");

      /*
       * Count how many USER INTERESTS match
       * this particular content item.
       */
      let matchedInterests = 0;

      normalizedInterests.forEach((interest) => {
        let matched = false;

        /*
         * Direct content match.
         */
        if (searchableText.includes(interest)) {
          matched = true;
        }

        /*
         * Artificial Intelligence / AI.
         */
        if (
          interest === "artificialintelligence" &&
          (searchableText.includes("artificialintelligence") ||
            searchableText.includes("ai"))
        ) {
          matched = true;
        }

        /*
         * Technology / Tech.
         */
        if (
          interest === "technology" &&
          (searchableText.includes("technology") ||
            searchableText.includes("tech"))
        ) {
          matched = true;
        }

        /*
         * Entertainment.
         */
        if (
          interest === "entertainment" &&
          (searchableText.includes("entertainment") ||
            searchableText.includes("movie") ||
            searchableText.includes("film"))
        ) {
          matched = true;
        }

        /*
         * Science.
         */
        if (
          interest === "science" &&
          searchableText.includes("science")
        ) {
          matched = true;
        }

        /*
         * Gaming.
         */
        if (
          interest === "gaming" &&
          (searchableText.includes("gaming") ||
            searchableText.includes("game"))
        ) {
          matched = true;
        }

        /*
         * Count each interest only once.
         */
        if (matched) {
          matchedInterests += 1;
        }
      });

      /*
       * Convert matched interests into a score.
       *
       * Minimum relevance = 30
       * Maximum relevance = 90
       *
       * This gives us:
       *
       * 0/4 = 30
       * 1/4 = 45
       * 2/4 = 60
       * 3/4 = 75
       * 4/4 = 90
       */
      const itemScore =
        30 +
        (matchedInterests /
          normalizedInterests.length) *
          60;

      return itemScore;
    });

    /*
     * Average all visible content.
     */
    const totalScore = itemScores.reduce(
      (total, score) => total + score,
      0
    );

    const averageScore =
      totalScore / itemScores.length;

    return Math.round(averageScore);
  }, [feed, interests]);

  /*
   * ============================================================
   * DASHBOARD STATS
   * ============================================================
   */
  const stats = [
    {
      label: "MATCH SCORE",
      value:
        matchScore === null
          ? "—"
          : `${matchScore}%`,
      sub:
        matchScore === null
          ? "No content available"
          : "Content relevance",
      icon: Sparkles,
      iconClass:
        "bg-[#1f1a4d] text-[#9e95ff]",
    },
    {
      label: "SAVED",
      value: `${favorites.length}`,
      sub: "Favorites saved",
      icon: Heart,
      iconClass:
        "bg-[#4b1018] text-[#ff6868]",
    },
    {
      label: "INTERESTS",
      value: `${interests.length}`,
      sub: "Topics selected",
      icon: Layers3,
      iconClass:
        "bg-[#063e2d] text-[#31d79b]",
    },
    {
      label: "TODAY",
      value: `${feed.length}`,
      sub: "Items in feed",
      icon: Zap,
      iconClass:
        "bg-[#142f58] text-[#4ea0ff]",
    },
  ];

  /*
   * ============================================================
   * UI
   * ============================================================
   */
  return (
    <div className="space-y-7">
      {/* Header */}
      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[34px]">
            Good evening, Raju 👋
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Your personalized content, refreshed for today.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-[#201a50] px-4 py-2.5 text-sm font-medium text-[#9d94ff]">
          <Sparkles className="h-4 w-4" />
          Personalized Feed Active
        </div>
      </motion.section>

      {/* Statistics */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map(
              (_, index) => (
                <DashboardStatSkeleton
                  key={index}
                />
              )
            )
          : stats.map(
              ({
                label,
                value,
                sub,
                icon: Icon,
                iconClass,
              }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#2a2641] bg-[#151225] p-5 shadow-[0_12px_40px_rgba(0,0,0,.12)]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-[0.08em] text-slate-400">
                      {label}
                    </p>

                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full ${iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-4 text-4xl font-semibold tracking-tight text-white">
                    {value}
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {sub}
                  </p>
                </div>
              )
            )}
      </section>

      {/* Category Filters */}
      <section className="relative">
        <button
          type="button"
          aria-label="Previous categories"
          className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#0d0b18] p-1 text-slate-500 hover:text-white xl:block"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setActiveFilter(filter)
              }
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "border-transparent bg-[#8b82ee] text-white"
                  : "border-[#302b4a] bg-[#121021] text-slate-400 hover:border-[#514b70] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next categories"
          className="absolute -right-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#0d0b18] p-1 text-slate-500 hover:text-white xl:block"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Personalized Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Personalized Feed
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Curated from your interests and latest signals
            </p>
          </div>

          {isError ? (
            <span className="text-sm text-amber-400">
              Showing saved demo content
            </span>
          ) : null}
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <CardSkeleton key={index} />
              )
            )}
          </div>
        ) : feed.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {feed.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#302b4a] bg-[#121021] p-14 text-center">
            <Bookmark className="mx-auto h-8 w-8 text-slate-600" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No content in this category
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another filter or update your
              interests in Settings.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}