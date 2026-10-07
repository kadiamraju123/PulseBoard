"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, Share2, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import type { FeedItem, MovieItem, NewsItem, SocialPost } from "@/types/content";

const isFavorite = (item: FeedItem, favorites: Array<{ id: string; kind: string }>) =>
  favorites.some((favorite) => favorite.id === item.id && favorite.kind === item.kind);

const cardMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function ContentCard({ item }: { item: FeedItem }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const isSaved = isFavorite(item, favorites);
  const [shareMessage, setShareMessage] = useState("");

  const shareItem = async () => {
    const title = item.kind === "social" ? `${item.user} on PulseBoard` : item.title;
    const url = item.kind === "news" ? item.url : `${window.location.origin}/search?q=${encodeURIComponent(title)}`;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text: `Check out ${title} on PulseBoard`, url });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setShareMessage("Link copied");
      window.setTimeout(() => setShareMessage(""), 1800);
    } catch {
      setShareMessage("Could not share");
      window.setTimeout(() => setShareMessage(""), 1800);
    }
  };

  const saveItem = () => {
    if (isSaved) {
      dispatch(removeFavorite({ id: item.id, kind: item.kind }));
      return;
    }

    const title = item.kind === "news" ? item.title : item.kind === "movie" ? item.title : item.user;
    const category = item.kind === "news" ? item.category : item.kind === "movie" ? item.genre : item.category;

    dispatch(
      addFavorite({
        id: item.id,
        kind: item.kind,
        title,
        category,
      }),
    );
  };

  if (item.kind === "news") {
    const news = item as NewsItem;
    return (
      <motion.article
        initial={cardMotion.initial}
        animate={cardMotion.animate}
        transition={{ duration: 0.25 }}
        className="group overflow-hidden rounded-2xl border border-[#2a2641] bg-[#151225] shadow-[0_14px_40px_rgba(0,0,0,.12)] transition hover:-translate-y-1 hover:border-[#40395e]"
      >
        <div className="relative h-52 overflow-hidden">
          <Image src={news.image} alt={news.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800">
            {news.kind}
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
            <span>{news.category}</span>
            <span>{news.publishedAt}</span>
          </div>

          <div>
            <h3 className="text-[16px] font-semibold leading-6 text-white">{news.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-400">{news.description}</p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{news.source}</span>
            <div className="flex items-center gap-2">
              <button type="button" aria-label={`Favorite ${news.title}`} onClick={saveItem} className={`rounded-full border p-2 ${isSaved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <Link href={news.url} className="rounded-lg bg-[#8b82ee] px-3 py-2 font-medium text-white transition hover:bg-[#786ee0]">
                Read More
              </Link>
              <button type="button" aria-label={`Share ${news.title}`} onClick={shareItem} className="rounded-lg border border-[#393451] p-2 text-slate-400 transition hover:text-white">
                {shareMessage ? <span className="mr-1 text-[10px] text-emerald-400">{shareMessage}</span> : null}
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  if (item.kind === "movie") {
    const movie = item as MovieItem;
    return (
      <motion.article
        initial={cardMotion.initial}
        animate={cardMotion.animate}
        transition={{ duration: 0.25 }}
        className="group overflow-hidden rounded-2xl border border-[#2a2641] bg-[#151225] shadow-[0_14px_40px_rgba(0,0,0,.12)] transition hover:-translate-y-1 hover:border-[#40395e]"
      >
        <div className="relative h-64 overflow-hidden">
          <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
          <div className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-white">{movie.kind}</div>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[16px] font-semibold leading-6 text-white">{movie.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{movie.releaseYear}</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating.toFixed(1)}
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-5 text-slate-400">{movie.overview}</p>

          <div className="flex items-center justify-between gap-2 pt-2">
            <button type="button" aria-label={`Favorite ${movie.title}`} onClick={saveItem} className={`rounded-full border p-2 ${isSaved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <Link href={`/search?q=${encodeURIComponent(movie.title)}`} className="rounded-lg bg-[#8b82ee] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#786ee0]">
              Details
            </Link>
            <button type="button" aria-label={`Share ${movie.title}`} onClick={shareItem} className="rounded-lg border border-[#393451] p-2 text-slate-400 transition hover:text-white">
              {shareMessage ? <span className="text-[10px] text-emerald-400">{shareMessage}</span> : <Share2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.article>
    );
  }

  const social = item as SocialPost;
  return (
    <motion.article
      initial={cardMotion.initial}
      animate={cardMotion.animate}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-[#2a2641] bg-[#151225] p-4 shadow-[0_14px_40px_rgba(0,0,0,.12)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={social.avatar} alt={social.user} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{social.user}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{social.handle} · {social.createdAt}</p>
          </div>
        </div>
        <button type="button" aria-label={`Favorite ${social.user} post`} onClick={saveItem} className={`rounded-full border p-2 ${isSaved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{social.text}</p>

      {social.image ? (
        <div className="relative mt-4 h-48 overflow-hidden rounded-2xl">
          <Image src={social.image} alt={social.text} fill className="object-cover" />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#9d94ff]">
        {social.hashtags.map((hashtag) => (
          <span key={hashtag} className="rounded-full bg-[#28215f] px-2 py-1">
            {hashtag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> {social.likes}</span>
          <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {social.comments}</span>
        </div>
        <button type="button" aria-label={`Share ${social.user} post`} onClick={shareItem} className="inline-flex items-center gap-1 rounded-lg border border-[#393451] px-2 py-1 text-slate-400 transition hover:text-white">
          {shareMessage ? shareMessage : <><Share2 className="h-3.5 w-3.5" /> Share</>}
        </button>
      </div>
    </motion.article>
  );
}
