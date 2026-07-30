# Architecture

> Status: planned/target architecture. Reflects the design in [`roadmap.md`](./roadmap.md); implementation has not started (see roadmap Phase 0/1). This document will be updated as each phase is actually built.

## Overall System Architecture

The system follows a four-tier architecture: presentation (clients), API gateway (single entry point for every client), application (business logic), and data (`data-platform`). Each tier only talks to the tier directly below it — no client talks to the application or data tiers directly, and the API gateway is the only way in.

```
                         User

              ┌───────────┼───────────┐

          website    app (planned)   Projects
                                    (standalone showcase,
                                     no backend calls)

           └───────────┘
      Tier 1 — Presentation

                    |

                API Service
      Tier 2 — API Gateway

                    |

            Logic ──uses──> AI Infrastructure
      (fitness + ski-advisor domains)   (prompt mgmt, rate limits,
                                          quotas, usage logging)
      Tier 3 — Application

                    |

              dbt • PostgreSQL
      Tier 4 — Data
                    ↑
       external data (scheduled ETL)
```

`disaster-response-pipeline` and `whale-blog` are standalone portfolio projects — they are showcased from `website` but do not integrate with `data-platform` or the access layer.

## Repository Structure

| Repository | Role | Depends on |
|---|---|---|
| `website` | Portfolio, project showcase, navigation, auth, integration point | `platform-hub` (the only backend it calls) |
| `platform-hub` | Tiers 2+3: API gateway + application logic. Routes every client request, hosts AI infrastructure (prompt management, rate limiting, quotas, usage logging), orchestrates the fitness/ski domain logic | `data-platform`, `fitness-platform`, `ski-advisor-platform` |
| `data-platform` | Shared PostgreSQL database, schemas, ingestion, dbt models, analytics layer, AI usage tracking | — |
| `fitness-platform` | Fitness domain logic library: Strava ingestion, training analysis, workout recommendations. Imported by `platform-hub`; not independently deployed or exposed | `data-platform` (via `platform-hub`) |
| `ski-advisor-platform` | Ski/snow-conditions domain logic library (Pacific Northwest recommendation engine). Imported by `platform-hub`; not independently deployed or exposed | `data-platform` (via `platform-hub`) |
| `disaster-response-pipeline` | Standalone NLP/ML portfolio project (message classification, Flask) | — |
| `whale-blog` | Standalone content/research blog | — |

## Technology Stack

- **website** — Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **platform-hub** — Python, FastAPI, imports `fitness-platform` + `ski-advisor-platform`, `data-platform` integration
- **data-platform** — Python, PostgreSQL, dbt, Docker, Google Cloud
- **fitness-platform** — Python, AI APIs (domain logic library, no HTTP layer of its own)
- **ski-advisor-platform** — Python, data pipelines, AI APIs (domain logic library, no HTTP layer of its own)
- **disaster-response-pipeline** — Python, Flask, NLP/ML
- **Cloud/infra (platform-wide, Phase 7+)** — Google Cloud Run, Cloud SQL, Cloud Scheduler, Secret Manager, Cloud Storage, Docker/Docker Compose
- **CI/CD (platform-wide, Phase 8+)** — GitHub Actions (lint → test → build → deploy)

## AI Architecture

AI usage is tracked centrally through `data-platform`'s `analytics` schema (`ai_requests`, `recommendations`), so cost, token usage, and rate limits can eventually be managed in one place across both AI-driven apps.

### Ski advisor — hybrid recommendation model

- **Precomputed recommendations** — generated daily for common Washington-area locations (Seattle, Bellevue, Everett, Bellingham, Leavenworth, Wenatchee, Tacoma, Spokane) to avoid live AI calls for the common case.
- **Personalized recommendations** — live AI generation reserved for custom trips, multi-day planning, preference-based recommendations, and resort comparisons.

### Fitness AI

Weekly training summaries, personalized workout adjustments, training recommendations, progress analysis — generated from ingested Strava/weather data plus training-metric history in `data-platform`.

### Planned AI infrastructure (Phase 10)

Prompt management, AI request logging, token tracking, cost monitoring, rate limiting, and per-user quotas — called out as its own "AI Infrastructure" node in Tier 3 (Application), used by the fitness and ski-advisor domain logic rather than duplicated by each.

## Data Flow

### Request path (Phase 6)

```
Tier 1 (website / app) → Tier 2 (API gateway) → Tier 3 (application logic: fitness + ski-advisor domains) → Tier 4 (data-platform: dbt / PostgreSQL)
```

No client talks to the application or data tiers directly — every client goes through the API gateway, which routes to the shared application logic, which reads/writes through `data-platform`. This is what lets multiple front-ends (the `website`, and any future client such as a mobile app) reuse the same gateway, business logic, and data access instead of each platform app duplicating it.

### Ingestion / analytics path (Phase 9)

```
External APIs (Strava, weather, NOAA, NWAC, resort reports, ...)
        → scheduled ETL
        → Raw data landing in PostgreSQL (Tier 4 — Data)
        → dbt models (transformations)
        → Analytics layer
        → Applications + AI features
```

Scheduled ETL writes straight into the data tier, bypassing the API gateway and application tiers entirely. Raw ingested data is never queried directly by applications — dbt transforms it into modeled analytics tables that both the applications and the AI recommendation logic read from.
