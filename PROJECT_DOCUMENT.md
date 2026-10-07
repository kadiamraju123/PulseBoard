# PulseBoard — Personalized Content Intelligence Dashboard

## 1. Project Overview

PulseBoard is a personalized content intelligence dashboard built with Next.js, React, TypeScript, and Redux Toolkit.

The application provides users with a centralized dashboard for discovering personalized news, movies, and social content based on their selected interests.

## 2. Problem Statement

Users often need to visit multiple platforms to discover news, movies, and social content relevant to their interests.

PulseBoard brings these content types together into a single personalized dashboard and provides relevance scoring, filtering, search, and favorites functionality.

## 3. Key Features

- Personalized content feed
- News, Movies, and Social content
- Interest-based personalization
- Match Score for content relevance
- Category filtering
- Search functionality
- Favorites / saved content
- Trending content
- Responsive dashboard UI
- Dark theme
- Loading and empty states
- Error handling
- Share functionality
- Settings and interest management
- Redux Toolkit state management
- Local storage persistence

## 4. Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### State Management
- Redux Toolkit
- React Redux

### APIs and Data
- News content API integration
- Movie content integration
- Mock social content API

### Development Tools
- Git
- GitHub
- npm
- VS Code

## 5. Personalization

Users can select their preferred interests from the Settings page.

The dashboard uses these interests to determine which content is most relevant to the user.

The Match Score displays the relevance of the currently displayed content based on the selected interests.

## 6. Match Score

The Match Score represents content relevance.

The score changes when the displayed feed changes, such as when the user selects different categories.

When there is no content available for a selected category, the dashboard displays "—" instead of generating an artificial score.

## 7. Main Dashboard Sections

### Dashboard
Displays:
- Match Score
- Saved content count
- Selected interests
- Current feed count
- Personalized content feed
- Category filters

### Trending
Displays trending content and discovery options.

### Favorites
Displays content saved by the user.

### Settings
Allows users to manage their interests and application preferences.

### Search
Allows users to search across available content.

## 8. Content Categories

The dashboard supports:

- All
- News
- Movies
- Social
- Technology
- Artificial Intelligence
- Entertainment
- Science
- Gaming

## 9. Application Architecture

The project follows a component-based Next.js architecture.

Major areas include:

- `src/app` — application routes and pages
- `src/components` — reusable UI components
- `src/lib` — utility and content logic
- `public` — static assets

Redux Toolkit is used for application state such as preferences and favorites.

## 10. User Flow

1. User opens PulseBoard.
2. User selects interests in Settings.
3. Personalized content is loaded.
4. User can filter content by category.
5. Match Score updates based on the displayed content.
6. User can save content to Favorites.
7. User can search and share content.
8. User can explore Trending content.

## 11. Responsive Design

The dashboard is designed to work across desktop and smaller screen sizes with responsive navigation, content cards, filters, and layouts.

## 12. Running the Project

Install dependencies:

```bash
npm install
