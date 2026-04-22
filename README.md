# Chefalio Frontend

Modern frontend for Chefalio — a marketplace where chefs publish recipes and sell cookbooks.

Built with Next.js (App Router), TypeScript, React Query, Axios, and Framer Motion.

---

## Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Framework    | Next.js (App Router)               |
| Language     | TypeScript                         |
| Styling      | Tailwind CSS                       |
| State / Data | React Query (TanStack Query)       |
| API Client   | Axios                              |
| Animations   | Framer Motion                      |
| Auth         | JWT (httpOnly cookies via backend) |

---

## Features

- Authentication (login / register / logout with cookies)
- Chef dashboard for creating recipes & cookbooks
- Browse & search recipes with filters
- Save / like recipes
- Purchase cookbooks (Stripe integration)
- Role-based UI (user / chef / admin)
- Smooth UI animations via Framer Motion
- Optimized data fetching with React Query

---

## Getting Started

**1. Clone & install**

```bash
git clone https://github.com/Irfanulamin/chefalio-client.git
cd chefalio-client
pnpm install
```

**2. Configure environment**

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**3. Run dev server**

```bash
pnpm dev
```

App runs at `http://localhost:3000`

---

## Project Structure

```
app/
├── (admin)/            # Admin dashboard routes
├── (authenticated)/    # Protected user routes
├── (chef)/             # Chef dashboard
├── (guest)/            # Public pages (landing, auth)
├── (user)/             # User dashboard
├── page.tsx
├── layout.tsx
└── globals.css

components/
├── ui/                 # Reusable UI components
└── common/             # Navbar, Footer, etc.

hooks/
├── useAuth.ts
├── useRecipes.ts
└── useCookbooks.ts

lib/
├── axios.ts            # Axios instance
└── react-query.ts      # Query client setup

types/
public/
```

---

## API Integration

All requests use the Axios instance pointed at `NEXT_PUBLIC_API_URL`.

React Query handles caching, background refetches, loading states, and mutations (create recipe, purchase, etc.).

---

## Roles & Access

| Role  | Access                                     |
| ----- | ------------------------------------------ |
| user  | Browse, save, purchase cookbooks           |
| chef  | Create recipes & cookbooks, manage content |
| admin | Full system control & analytics            |

---

## Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # ESLint check
```
