export type ContentKind = "news" | "movie" | "social";
export type Interest =
  | "Technology"
  | "Artificial Intelligence"
  | "Business"
  | "Finance"
  | "Sports"
  | "Entertainment"
  | "Science"
  | "Gaming"
  | "Travel"
  | "Health";

export interface NewsItem {
  id: string;
  kind: "news";
  title: string;
  description: string;
  source: string;
  category: string;
  publishedAt: string;
  image: string;
  url: string;
  tags: string[];
}

export interface MovieItem {
  id: string;
  kind: "movie";
  title: string;
  overview: string;
  releaseYear: string;
  genre: string;
  rating: number;
  poster: string;
  backdrop: string;
  runtime?: number;
  trailerUrl?: string;
  source: string;
  releaseDate?: string;
  tags: string[];
}

export interface SocialPost {
  id: string;
  kind: "social";
  user: string;
  handle: string;
  avatar: string;
  text: string;
  hashtags: string[];
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
  category: string;
}

export type FeedItem = NewsItem | MovieItem | SocialPost;

export interface FavoriteEntry {
  id: string;
  kind: ContentKind;
  title: string;
  category: string;
}

export interface ThemeState {
  mode: "light" | "dark" | "system";
}
