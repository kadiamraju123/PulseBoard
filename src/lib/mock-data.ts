import type { Interest, MovieItem, NewsItem, SocialPost } from "@/types/content";

export const INTEREST_OPTIONS: Interest[] = [
  "Technology",
  "Artificial Intelligence",
  "Business",
  "Finance",
  "Sports",
  "Entertainment",
  "Science",
  "Gaming",
  "Travel",
  "Health",
];

export const defaultInterests: Interest[] = [
  "Technology",
  "Artificial Intelligence",
  "Business",
  "Finance",
];

export const mockNews: NewsItem[] = [
  {
    id: "news-1",
    kind: "news",
    title: "OpenAI unveils a sharper multimodal research assistant for enterprise teams",
    description:
      "The new workflow helps teams synthesize reports, dashboards, and meeting summaries with less manual work.",
    source: "TechWire",
    category: "Technology",
    publishedAt: "2h ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["AI", "Productivity", "Enterprise"],
  },
  {
    id: "news-2",
    kind: "news",
    title: "Global markets rally as investors rotate into resilient growth stocks",
    description:
      "Analysts say steady earnings and better consumer spending are helping drive a broad rebound.",
    source: "MarketDaily",
    category: "Finance",
    publishedAt: "4h ago",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["Markets", "Growth", "Economy"],
  },
  {
    id: "news-3",
    kind: "news",
    title: "Researchers publish breakthrough in battery longevity for electric vehicles",
    description:
      "The study points to lower degradation rates and faster charging cycles across several candidate chemistries.",
    source: "SciencePost",
    category: "Science",
    publishedAt: "6h ago",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["EV", "Research", "Climate"],
  },
  {
    id: "news-4",
    kind: "news",
    title: "Championship contenders reshape training strategies for a faster season",
    description:
      "Teams are leaning into analytics, recovery science, and smarter rotation planning to improve consistency.",
    source: "SportsWatch",
    category: "Sports",
    publishedAt: "1d ago",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["Training", "Analytics", "Playoffs"],
  },
  {
    id: "news-5",
    kind: "news",
    title: "Travel demand rebounds as boutique destinations gain major traction",
    description:
      "Boutique and lesser-known destinations are now driving higher booking satisfaction across younger travelers.",
    source: "Nomad Globe",
    category: "Travel",
    publishedAt: "1d ago",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["Travel", "Destinations", "Lifestyle"],
  },
  {
    id: "news-6",
    kind: "news",
    title: "Healthcare startups focus on predictive care and preventative tooling",
    description:
      "Investors are backing platforms that reduce hospital load and improve patient outcomes through earlier intervention.",
    source: "HealthLens",
    category: "Health",
    publishedAt: "2d ago",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
    url: "#",
    tags: ["HealthTech", "Care", "Wellness"],
  },
];

export const mockMovies: MovieItem[] = [
  {
    id: "movie-1",
    kind: "movie",
    title: "Dune: Part Two",
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    releaseYear: "2024",
    genre: "Sci-Fi",
    rating: 8.7,
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    runtime: 166,
    trailerUrl: "#",
    source: "TMDB",
    releaseDate: "2024-03-15",
    tags: ["Epic", "Adventure", "Sci-Fi"],
  },
  {
    id: "movie-2",
    kind: "movie",
    title: "The Social Network",
    overview:
      "A driven entrepreneur builds Facebook and follows the legal battles and personal betrayals that reshape his life.",
    releaseYear: "2010",
    genre: "Drama",
    rating: 8.0,
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    runtime: 120,
    trailerUrl: "#",
    source: "TMDB",
    releaseDate: "2010-10-01",
    tags: ["Tech", "Drama", "Business"],
  },
  {
    id: "movie-3",
    kind: "movie",
    title: "Oppenheimer",
    overview:
      "The story of J. Robert Oppenheimer and the creation of the atomic bomb during World War II.",
    releaseYear: "2023",
    genre: "Biography",
    rating: 8.6,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    runtime: 180,
    trailerUrl: "#",
    source: "TMDB",
    releaseDate: "2023-07-21",
    tags: ["History", "Drama", "Science"],
  },
  {
    id: "movie-4",
    kind: "movie",
    title: "Inside Out 2",
    overview:
      "Riley's emotions face new challenges as she grows into adolescence and navigates more complex feelings.",
    releaseYear: "2024",
    genre: "Animation",
    rating: 7.8,
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    runtime: 96,
    trailerUrl: "#",
    source: "TMDB",
    releaseDate: "2024-06-14",
    tags: ["Family", "Comedy", "Emotion"],
  },
  {
    id: "movie-5",
    kind: "movie",
    title: "Wicked",
    overview:
      "The untold story of the witches of Oz before Dorothy arrives, blending music, magic, and ambition.",
    releaseYear: "2024",
    genre: "Musical",
    rating: 7.6,
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    runtime: 160,
    trailerUrl: "#",
    source: "TMDB",
    releaseDate: "2024-11-22",
    tags: ["Fantasy", "Musical", "Adventure"],
  },
];

export const mockSocial: SocialPost[] = [
  {
    id: "social-1",
    kind: "social",
    user: "Ava Stone",
    handle: "@avastone",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    text:
      "Just launched a community-driven AI newsletter and the response has been incredible. Who else is building in public?",
    hashtags: ["#AI", "#BuildInPublic", "#Community"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    likes: 1842,
    comments: 122,
    createdAt: "12m ago",
    category: "Artificial Intelligence",
  },
  {
    id: "social-2",
    kind: "social",
    user: "Leo Ramos",
    handle: "@leoramos",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    text:
      "Late-night startup sprint turned into a powerful new forecasting template for SaaS teams. Saved this for future launches.",
    hashtags: ["#Business", "#SaaS", "#Growth"],
    likes: 960,
    comments: 42,
    createdAt: "36m ago",
    category: "Business",
  },
  {
    id: "social-3",
    kind: "social",
    user: "Maya Chen",
    handle: "@mayac",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    text:
      "Weekend trip idea: a slow scenic route through Kyoto with hidden design studios and food markets.",
    hashtags: ["#Travel", "#Design", "#Weekend"],
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
    likes: 531,
    comments: 71,
    createdAt: "1h ago",
    category: "Travel",
  },
  {
    id: "social-4",
    kind: "social",
    user: "Nina Patel",
    handle: "@npatel",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    text:
      "The best sports analytics dashboard I’ve seen this month turns injury risk into a clear operational warning system.",
    hashtags: ["#Sports", "#Data", "#Analytics"],
    likes: 1400,
    comments: 64,
    createdAt: "2h ago",
    category: "Sports",
  },
];

export const mockTrending = {
  news: mockNews.slice(0, 3),
  movies: mockMovies.slice(0, 3),
  social: mockSocial.slice(0, 3),
};
