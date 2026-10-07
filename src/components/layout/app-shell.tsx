"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Menu,
  Monitor,
  Search,
  Settings,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSidebarOpen,
  setTheme,
  toggleSidebar,
} from "@/store/slices/uiSlice";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Grid2X2,
  },
  {
    href: "/trending",
    label: "Trending",
    icon: TrendingUp,
    badge: "8",
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: Star,
    badgeFromFavorites: true,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

function useDebouncedValue(value: string, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.ui.theme);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const favorites = useAppSelector((state) => state.favorites);

  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // Hydration protection
  const [mounted, setMounted] = useState(false);

  // Header dropdown states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply selected theme
  useEffect(() => {
    const root = document.documentElement;

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark =
      theme === "dark" || (theme === "system" && systemDark);

    root.classList.toggle("dark", shouldUseDark);
  }, [theme]);

  // Load search query from URL
  useEffect(() => {
    const current =
      new URLSearchParams(window.location.search).get("q") ?? "";

    if (pathname === "/search") {
      setQuery(current);
    } else if (!current) {
      setQuery("");
    }
  }, [pathname]);

  // Debounced search navigation
  useEffect(() => {
    if (debouncedQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(debouncedQuery.trim())}`
      );
    } else if (pathname === "/search") {
      router.push("/dashboard");
    }
  }, [debouncedQuery, pathname, router]);

  // Close header menus when route changes
  useEffect(() => {
    setNotificationsOpen(false);
    setDisplayOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const closeHeaderMenus = () => {
    setNotificationsOpen(false);
    setDisplayOpen(false);
    setProfileOpen(false);
  };

  const handleNotifications = () => {
    setNotificationsOpen((value) => !value);
    setDisplayOpen(false);
    setProfileOpen(false);
  };

  const handleDisplay = () => {
    setDisplayOpen((value) => !value);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const handleProfile = () => {
    setProfileOpen((value) => !value);
    setNotificationsOpen(false);
    setDisplayOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0b18] text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen ? (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`fixed inset-y-0 left-0 z-40 w-[225px] border-r border-[#29253d] bg-[#0d0b18] lg:static lg:flex ${
                collapsed ? "lg:w-[76px]" : "lg:w-[225px]"
              }`}
            >
              <div className="flex h-full w-full flex-col">
                {/* Sidebar header */}
                <div
                  className={`flex h-[76px] items-center border-b border-[#29253d] ${
                    collapsed ? "justify-center px-2" : "px-5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
                      ▥
                    </div>

                    {!collapsed && (
                      <span className="text-[18px] font-semibold tracking-tight">
                        PulseBoard
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
                    aria-label="Close sidebar"
                    onClick={() => dispatch(setSidebarOpen(false))}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation */}
                <div
                  className={`px-3 pt-5 ${
                    collapsed ? "px-2" : ""
                  }`}
                >
                  {!collapsed && (
                    <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Menu
                    </p>
                  )}

                  <nav className="space-y-1.5">
                    {navItems.map(
                      ({
                        href,
                        label,
                        icon: Icon,
                        badge,
                        badgeFromFavorites,
                      }) => {
                        const active =
                          pathname === href ||
                          (href === "/dashboard" && pathname === "/");

                        const count = badgeFromFavorites
                          ? mounted
                            ? favorites.length
                            : 0
                          : badge;

                        return (
                          <Link
                            key={href}
                            href={href}
                            title={collapsed ? label : undefined}
                            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                              active
                                ? "bg-[#28215f] text-[#a8a0ff] shadow-[inset_0_0_0_1px_rgba(139,92,246,.16)]"
                                : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                            } ${collapsed ? "justify-center" : ""}`}
                            onClick={() =>
                              dispatch(setSidebarOpen(false))
                            }
                          >
                            <Icon className="h-[18px] w-[18px] shrink-0" />

                            {!collapsed && (
                              <span className="flex-1">{label}</span>
                            )}

                            {!collapsed && count ? (
                              <span className="min-w-5 rounded-full bg-[#24203b] px-1.5 text-center text-[11px] text-slate-400">
                                {count}
                              </span>
                            ) : null}
                          </Link>
                        );
                      }
                    )}
                  </nav>
                </div>

                {/* Sidebar bottom */}
                <div className="mt-auto px-3 pb-3">
                  {!collapsed && (
                    <div className="mb-5 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#26205e] to-[#19163c] p-4">
                      <div className="flex items-center gap-2 text-[#9d94ff]">
                        <span className="text-lg">✦</span>

                        <span className="text-xs font-semibold">
                          Personalized
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Feed tailored to your interests
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setCollapsed((value) => !value)
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white ${
                      collapsed ? "justify-center" : ""
                    }`}
                  >
                    {collapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <>
                        <ChevronLeft className="h-4 w-4" />
                        <span>Collapse</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.aside>
          ) : null}
        </AnimatePresence>

        {/* Main area */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-[#29253d] bg-[#0d0b18]/95 px-4 py-4 backdrop-blur-xl sm:px-6">
            <div className="relative flex items-center gap-3">
              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => dispatch(toggleSidebar())}
                className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search */}
              <div className="relative max-w-[610px] flex-1 lg:ml-0">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />

                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search news, movies, posts..."
                  aria-label="Search PulseBoard"
                  className="h-12 w-full rounded-2xl border border-[#38325a] bg-[#201b47] py-2.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-[#6f63d9] focus:ring-2 focus:ring-violet-500/10"
                />

                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              {/* Header actions */}
              <div className="ml-auto flex items-center gap-2">
                {/* Favorites */}
                <button
                  type="button"
                  aria-label="Saved items"
                  onClick={() => {
                    closeHeaderMenus();
                    router.push("/favorites");
                  }}
                  className="relative hidden rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white sm:block"
                >
                  <Bookmark className="h-5 w-5" />

                  {mounted && favorites.length > 0 ? (
                    <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#7468e8] px-1 text-[9px] font-bold text-white">
                      {favorites.length}
                    </span>
                  ) : null}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Notifications"
                    onClick={handleNotifications}
                    className="relative rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <Bell className="h-5 w-5" />

                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-400" />
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-[#38325a] bg-[#17142a] p-4 shadow-2xl">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">
                          Notifications
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            setNotificationsOpen(false)
                          }
                          className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                          aria-label="Close notifications"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="rounded-xl bg-[#201b47] p-3">
                        <p className="text-sm font-medium text-white">
                          Your personalized feed is ready
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          New content has been added based on your
                          selected interests.
                        </p>
                      </div>

                      <div className="mt-2 rounded-xl bg-[#201b47] p-3">
                        <p className="text-sm font-medium text-white">
                          PulseBoard is up to date
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          Your dashboard has been refreshed.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Display options */}
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    aria-label="Display options"
                    onClick={handleDisplay}
                    className="rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <Monitor className="h-5 w-5" />
                  </button>

                  {displayOpen && (
                    <div className="absolute right-0 top-14 z-50 w-48 rounded-2xl border border-[#38325a] bg-[#17142a] p-2 shadow-2xl">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Appearance
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(setTheme("light"));
                          setDisplayOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          theme === "light"
                            ? "bg-[#28215f] text-[#a8a0ff]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Light mode
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(setTheme("dark"));
                          setDisplayOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          theme === "dark"
                            ? "bg-[#28215f] text-[#a8a0ff]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Dark mode
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(setTheme("system"));
                          setDisplayOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          theme === "system"
                            ? "bg-[#28215f] text-[#a8a0ff]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        System
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    onClick={handleProfile}
                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/5"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-[#8b82ee] text-sm font-semibold text-white">
                      R
                    </div>

                    <span className="text-sm font-medium text-white">
                      Raju
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-14 z-50 w-48 rounded-2xl border border-[#38325a] bg-[#17142a] p-2 shadow-2xl">
                      <div className="mb-2 border-b border-[#29253d] px-3 py-2">
                        <p className="text-sm font-semibold text-white">
                          Raju
                        </p>

                        <p className="text-xs text-slate-500">
                          PulseBoard user
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          router.push("/settings");
                        }}
                        className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                      >
                        Settings
                      </button>

                      <button
                        type="button"
                        onClick={() => setProfileOpen(false)}
                        className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                      >
                        Close menu
                      </button>
                    </div>
                  )}
                </div>

                {/* Theme selector */}
                <select
                  aria-label="Theme mode"
                  value={theme}
                  onChange={(event) =>
                    dispatch(
                      setTheme(
                        event.target.value as
                          | "light"
                          | "dark"
                          | "system"
                      )
                    )
                  }
                  className="hidden rounded-xl border border-[#393451] bg-[#17142a] px-2.5 py-2 text-sm text-slate-300 outline-none sm:block"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-5 py-8 sm:px-8 lg:px-14 lg:py-10">
            <div className="mx-auto max-w-[1450px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}