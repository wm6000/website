# Architecture

> Status: planned/target architecture. Reflects the design in [`roadmap.md`](./roadmap.md); implementation has not started (see roadmap Phase 0/1). This document will be updated as each phase is actually built.

## Overall System Architecture

`website` is the primary user-facing entry point for a small ecosystem of independent applications that share one data platform, alongside a planned future client (e.g. a mobile app). Every client talks to a single shared access-layer API rather than to `data-platform` directly, and rather than each platform app running its own API — the access layer is the one place that reads and writes `data-platform`.

```
                    User

              ┌───────┴───────┐

           website      app (planned)

              └───────┬───────┘

                       |

              access-layer API
          (fitness + ski-advisor domains)

                       |

                data-platform

                       |

       PostgreSQL • dbt • Databricks

                       |

          Pipelines • AI Services
```

`disaster-response-pipeline` and `whale-blog` are standalone portfolio projects — they are showcased from `website` but do not integrate with `data-platform` or the access layer.

## Repository Structure

| Repository | Role | Depends on |
|---|---|---|
| `website` | Portfolio, project showcase, navigation, auth, integration point | `data-platform` (indirectly, via the access-layer API) |
| `data-platform` | Shared PostgreSQL database, schemas, ingestion, dbt models, analytics layer, AI usage tracking | — |
| `fitness-platform` | AI fitness assistant: Strava ingestion, training analysis, workout recommendations | `data-platform` |
| `ski-advisor-platform` | AI ski/snow-conditions recommendation engine (Pacific Northwest) | `data-platform` |
| `disaster-response-pipeline` | Standalone NLP/ML portfolio project (message classification, Flask) | — |
| `whale-blog` | Standalone content/research blog | — |

## Technology Stack

- **website** — Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **data-platform** — Python, PostgreSQL, dbt, Docker, Google Cloud
- **fitness-platform** — Python, FastAPI, AI APIs, `data-platform` integration
- **ski-advisor-platform** — Python, FastAPI, data pipelines, AI APIs
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

Prompt management, AI request logging, token tracking, cost monitoring, rate limiting, and per-user quotas, shared across `fitness-platform` and `ski-advisor-platform`.

## Data Flow

### Request path (Phase 6)

```
website / app → access-layer API (fitness + ski-advisor domains) → data-platform → PostgreSQL
```

No client talks to `data-platform` or PostgreSQL directly — every client goes through the shared access-layer API, which reads/writes through `data-platform`. This is what lets multiple front-ends (the `website`, and any future client such as a mobile app) reuse the same data access and business logic instead of each platform app duplicating it.

### Ingestion / analytics path (Phase 9)

```
External APIs (Strava, weather, NOAA, NWAC, resort reports, ...)
        → Raw data landing in PostgreSQL
        → dbt models (transformations)
        → Analytics layer
        → Applications + AI features
```

Raw ingested data is never queried directly by applications — dbt transforms it into modeled analytics tables that both the applications and the AI recommendation logic read from.
