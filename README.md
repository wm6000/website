# website

The central portfolio application and user-facing entry point for the willmuehlhausen.com ecosystem — the only client end users interact with directly.

Status: in progress — Phase 2 (Website Foundation) underway. See [`docs/roadmap.md`](docs/roadmap.md).

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
