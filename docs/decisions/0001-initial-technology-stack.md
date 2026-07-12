# 0001. Initial technology stack

Status: Accepted

## Context

The platform spans a user-facing site plus multiple independent AI-driven applications sharing one data layer (see [`roadmap.md`](../roadmap.md)). A stack needed to be picked before Phase 2 (Website Foundation) implementation could start.

## Decision

- `website`: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- `data-platform`, `fitness-platform`, `ski-advisor-platform`: Python, with FastAPI for the platform apps' services
- Shared database: PostgreSQL, transformed with dbt
- Cloud provider: Google Cloud (Cloud Run, Cloud SQL, Cloud Scheduler, Secret Manager, Cloud Storage)
- Containerization: Docker / Docker Compose

## Consequences

- A single language (TypeScript) on the frontend and a single language (Python) across backend/data services keeps the ecosystem approachable for one developer.
- FastAPI + PostgreSQL + dbt is a common, well-documented combination for demonstrating data engineering practices, which matches the roadmap's stated portfolio goal.
- Committing to Google Cloud early means infra decisions (Phase 7) inherit GCP-specific services rather than staying cloud-agnostic; acceptable tradeoff for a single-maintainer portfolio project prioritizing shipping over portability.
