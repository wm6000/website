# API

> Status: planned. Reflects the design in [`roadmap.md`](./roadmap.md) Phase 6; not yet implemented.

## Request flow

```
website
   ↓
FastAPI services (fitness-platform, ski-advisor-platform)
   ↓
data-platform
   ↓
PostgreSQL
```

`website` is the only client-facing surface. It never talks to the database directly — each platform application exposes its own FastAPI service, which is the sole reader/writer of its schema in `data-platform` (see [`database.md`](./database.md)).

## Planned components (Phase 6)

- REST APIs, one FastAPI service per platform application (`fitness-platform`, `ski-advisor-platform`)
- Authentication, shared across `website` and the platform services
- API documentation (FastAPI's built-in OpenAPI/Swagger docs)
- Consistent error handling
- Request/response logging, feeding the `analytics.ai_requests` table for AI-backed endpoints

## Per-application APIs (indicative, from roadmap feature lists)

### fitness-platform

- Import/sync workout history (Strava)
- Retrieve training trend analysis
- Retrieve daily workout recommendations

### ski-advisor-platform

- Submit trip preferences (location, alpine/backcountry, skill level, travel distance)
- Retrieve precomputed recommendations for common Washington locations
- Request a live, personalized recommendation (custom trips, multi-day planning, resort comparisons)
