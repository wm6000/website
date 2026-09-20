# website — retired

> **This repo is retired as of 2026-09-20. Nothing here is deployed and nothing here
> should be built on.**
>
> Its two jobs were taken over by two repos that ship:
>
> - **[willmuehlhausen](https://github.com/wm6000/willmuehlhausen)** — the portfolio, live
>   at [willmuehlhausen.com](https://willmuehlhausen.com). Vite, React Router, plain CSS on
>   design tokens.
> - **recadvisor** — the RecAdvisor client, against the FastAPI backend in `data-platform`.
>
> Neither is a fork of this. Both were written fresh, and the conventions differ — file
> naming, styling, and the framework itself. **Do not copy patterns from here into
> either.** This repo's existence is what once sent a spec after the wrong codebase.
>
> Kept read-only for its history and its docs (`docs/architecture.md`,
> `docs/roadmap.md`, `docs/decisions/`), several of which still describe the ecosystem
> accurately even though this implementation of it does not.

## What it was

The Next.js portfolio application, and the first home of the fitness and ski advisor
dashboards. Never deployed to the live domain.

Status: retired. Formerly "in progress — Phase 2 (Website Foundation)". See
[`docs/roadmap.md`](docs/roadmap.md).

## Overview

`website` showcases personal engineering, data engineering, cloud architecture, and AI projects (fitness and ski recommendation platforms, plus standalone ML/data projects), and is the single presentation-tier entry point into the platform. It never talks to the data platform directly — all requests go through `platform-hub`, the shared API gateway. See [`docs/architecture.md`](docs/architecture.md) for the full system picture.

## Tech stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other scripts:

* `npm run build` — production build
* `npm run start` — run the production build
* `npm run lint` — ESLint

## Documentation

* [`docs/architecture.md`](docs/architecture.md) — system architecture, repository structure, data flow
* [`docs/roadmap.md`](docs/roadmap.md) — phased build plan for the whole ecosystem
* [`docs/api.md`](docs/api.md), [`docs/database.md`](docs/database.md), [`docs/deployment.md`](docs/deployment.md)
* [`docs/diagrams/`](docs/diagrams/) — Mermaid architecture diagrams
* [`docs/decisions/`](docs/decisions/) — Architecture Decision Records (ADRs)

## Contributing

Trunk-based development, one issue per branch per PR, squash merge only — see [ADR 0002](docs/decisions/0002-branching-strategy.md). Applies to every repo in the ecosystem, not just this one.
