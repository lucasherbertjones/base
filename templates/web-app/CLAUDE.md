# CLAUDE.md — Web Application

## About This Project

_Brief description of this web application._

## Stack

- **Frontend**: _React / Next.js / Vue / Svelte / etc._
- **Backend**: _Node / Python / Go / etc._
- **Database**: _PostgreSQL / MySQL / SQLite / etc._
- **Deploy**: _Vercel / Railway / Fly.io / etc._

## Project Structure

```
├── CLAUDE.md
├── src/
│   ├── app/          # Application entry
│   ├── components/   # Reusable components
│   ├── lib/          # Shared utilities
│   └── styles/       # Stylesheets
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/           # Static assets
└── docs/
```

## Skills

| Skill | Purpose |
|---|---|
| `find-skills` | Discover new agent skills |
| `security-review-skills` | Audit skills before installing |
| `frontend-design` | Production-grade frontend interfaces |
| `tdd` | Strict test-driven development |

## Conventions

- Prefer vertical slices — each feature touches all layers
- Test public interfaces only (no coupling to internals)
- Accessible by default — WCAG 2.1 AA minimum
- Responsive first — mobile breakpoint at 375px

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run build
```
