# website

The central portfolio application and user-facing entry point for the willmuehlhausen.com ecosystem — the only client end users interact with directly.

Status: planned — Phase 0 (engineering foundation) wrapping up, Phase 2 (Next.js application setup) not yet started. See [`docs/roadmap.md`](docs/roadmap.md).

## Overview

`website` showcases personal engineering, data engineering, cloud architecture, and AI projects (fitness and ski recommendation platforms, plus standalone ML/data projects), and is the single presentation-tier entry point into the platform. It never talks to the data platform directly — all requests go through `platform-hub`, the shared API gateway. See [`docs/architecture.md`](docs/architecture.md) for the full system picture.

## Tech stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## Getting started

Not yet scaffolded — see [`docs/roadmap.md`](docs/roadmap.md#phase-2--website-foundation) (Phase 2) for the planned setup steps. This section will be filled in once the Next.js application exists.

## Documentation

* [`docs/architecture.md`](docs/architecture.md) — system architecture, repository structure, data flow
* [`docs/roadmap.md`](docs/roadmap.md) — phased build plan for the whole ecosystem
* [`docs/api.md`](docs/api.md), [`docs/database.md`](docs/database.md), [`docs/deployment.md`](docs/deployment.md)
* [`docs/diagrams/`](docs/diagrams/) — Mermaid architecture diagrams
* [`docs/decisions/`](docs/decisions/) — Architecture Decision Records (ADRs)

## Contributing

Trunk-based development, one issue per branch per PR, squash merge only — see [ADR 0002](docs/decisions/0002-branching-strategy.md). Applies to every repo in the ecosystem, not just this one.
