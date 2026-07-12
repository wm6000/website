# Deployment

> Status: planned. Reflects the design in [`roadmap.md`](./roadmap.md) Phases 7-8; not yet implemented.

## Platform

Google Cloud.

## Infrastructure (Phase 7)

- **Cloud Run** — containerized application hosting (`website`, and each platform app's FastAPI service)
- **Cloud SQL** — managed PostgreSQL for `data-platform`
- **Cloud Scheduler** — scheduled jobs (e.g. daily precomputed ski recommendations, data ingestion runs)
- **Secret Manager** — API keys and credentials (Strava, weather/NOAA/NWAC, AI providers, database)
- **Cloud Storage** — static/blob storage

## Containerization

- Docker images per application
- Docker Compose for local multi-service development
- Container-based deployment to Cloud Run

## CI/CD (Phase 8)

```
GitHub Push
   ↓
GitHub Actions
   ↓
Lint
   ↓
Tests
   ↓
Build
   ↓
Deploy
```

Planned pipeline responsibilities:

- Automated testing on every PR (required before merge — see branch protection on `main`)
- Deployment workflows per environment
- Environment/config management (via Secret Manager)
- Database migrations run as part of deploy

No GitHub Actions workflows exist yet (`.github/workflows/` is empty) — this is upcoming work, not yet started.
