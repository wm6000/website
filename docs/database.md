# Database

> Status: planned schema. Reflects the design in [`roadmap.md`](./roadmap.md) Phase 3; not yet implemented. The database itself lives in the `data-platform` repository — this document describes the shared schema at a portfolio/reference level.

## Engine

PostgreSQL, run locally via Docker for development. Cloud SQL for Postgres in production (see [`deployment.md`](./deployment.md)).

## Schemas

### `core`

Shared, cross-application entities.

- `users`
- `preferences`

### `fitness`

Owned by `fitness-platform`.

- `activities`
- `workouts`
- `training_metrics`

### `ski`

Owned by `ski-advisor-platform`.

- `resorts`
- `weather`
- `snow_conditions`

### `analytics`

Cross-application analytics and AI usage tracking, fed by dbt models over the schemas above.

- `ai_requests`
- `recommendations`

## Planned foundational work (Phase 3)

- [ ] PostgreSQL setup
- [ ] Database migrations
- [ ] Schema management
- [ ] Local Docker environment
- [ ] Data ingestion framework
- [ ] Logging framework

## Access pattern

Applications (`fitness-platform`, `ski-advisor-platform`) do not query PostgreSQL directly from `website`; they own their schema and expose it through their own FastAPI service, per [`api.md`](./api.md). The `analytics` schema is populated by dbt transformations over `fitness` and `ski` data, not written to directly by applications.
