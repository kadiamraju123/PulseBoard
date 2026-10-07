# PulseBoard

PulseBoard is a personalized content intelligence dashboard built with Next.js, React, TypeScript, and Redux Toolkit. It surfaces a tailored mix of news, movies, and social conversations based on the user’s selected interests, with a polished dashboard UI for discovery, favorites, trending, and saved preferences.

## Features

- Personalized dashboard feed with interest-based curation
- Search across content categories with debounced query handling
- Favorites management with local persistence
- Trending overview and topic-based browsing
- Responsive app shell and dark mode support
- Mock content API and fallback data for demo scenarios
- App Router setup with a portfolio-quality UI

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Framer Motion
- Zod + React Hook Form

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` — run the app locally
- `npm run build` — create a production build
- `npm run start` — start the built app
- `npm run lint` — run ESLint checks

## Environment Notes

The project includes mock content data and does not require external API keys for local demo usage. If you want to extend it with live sources, copy the example values in `.env.example` into a local `.env.local` file and fill in your credentials.

## Project Structure

- `src/app` — route-level pages and app shell
- `src/components` — reusable UI and dashboard modules
- `src/lib` — mock content and helper logic
- `src/store` — Redux slices and state configuration
- `src/types` — shared TypeScript content models

## Production Build

After installing dependencies, create a production build with:

```bash
npm run build
```
