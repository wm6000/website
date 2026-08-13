# WillMuehlhausen.com Engineering Roadmap

## Vision

Build a personal engineering platform that showcases software engineering, data engineering, cloud architecture, and AI applications through projects focused on fitness, skiing, and data-driven tools.

The platform will consist of multiple independent applications connected through a shared data platform.

---

# Product Ecosystem

## website

The central portfolio application and user-facing entry point.

Responsibilities:

* Personal portfolio
* Project showcase
* Application navigation
* User interface
* Authentication
* Integration point for platform applications

Technology:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

---

## platform-hub

Shared API gateway and application-logic tier. The only backend `website` (and any future client) talks to.

Responsibilities:

* API gateway (single entry point for every client)
* Orchestrates fitness + ski-advisor domain logic
* AI infrastructure (prompt management, rate limiting, quotas, usage logging)
* Reads/writes `data-platform`

Technology:

* Python
* FastAPI
* Imports `fitness-platform` + `ski-advisor-platform`
* Data platform integration

---

## data-platform

Shared data engineering foundation supporting multiple applications.

Responsibilities:

* PostgreSQL database
* Database schemas
* Data ingestion pipelines
* Data transformations
* dbt models
* Analytics layer
* AI usage tracking
* Future Databricks integration

Technology:

* Python
* PostgreSQL
* dbt
* Docker
* Google Cloud

---

## fitness-platform

AI-powered personal fitness domain logic. A library imported by `platform-hub` — not independently deployed or exposed.

Responsibilities:

* Fitness data ingestion
* Workout recommendations
* Training analysis
* Strava integration
* AI coaching features

Technology:

* Python
* AI APIs
* Data platform integration (via `platform-hub`)

---

## ski-advisor-platform

AI-powered ski recommendation domain logic, focused initially on the Pacific Northwest. A library imported by `platform-hub` — not independently deployed or exposed.

Responsibilities:

* Ski destination recommendations
* Weather analysis
* Snow condition analysis
* Resort comparisons
* Backcountry recommendations
* AI trip planning

Technology:

* Python
* Data pipelines
* AI APIs

---

## disaster-response-pipeline

Machine learning portfolio project.

Responsibilities:

* Natural language processing pipeline
* Disaster message classification
* Machine learning model development
* Flask application

---

## whale-blog

Personal research/blog project.

Responsibilities:

* Content management
* Data visualization
* Research communication

---

# Phase 0 — Engineering Foundation

## Goal

Establish a professional software development workflow.

## Completed

* [x] Create GitHub repositories
* [x] Connect repositories to GitHub Project
* [x] Define repository structure

## Remaining

* [x] Define architecture documentation
* [x] Create Mermaid architecture diagrams
* [x] Establish coding standards
* [x] Create README templates
* [x] Define branching strategy

---

# Phase 1 — Architecture Documentation

## Goal

Document the system design before implementation.

## Documentation

Create:

```
docs/

architecture.md

roadmap.md

database.md

api.md

deployment.md

decisions/
```

## Architecture Diagrams

Create Mermaid diagrams:

* System architecture
* Repository relationships
* Data platform architecture
* Fitness data flow
* Ski advisor data flow
* Cloud deployment architecture

---

# Phase 2 — Website Foundation

Repository:

`website`

## Goal

Create the portfolio application that connects all projects.

## Navigation

Top-level nav, left to right: Home, Fitness Platform, Ski Advisor, Projects. Fitness Platform and Ski Advisor are dedicated top-level pages rather than `/projects` subpages — see [ADR 0004](decisions/0004-top-level-fitness-ski-navigation.md).

## Features

Initial:

* [x] Next.js application setup
* [x] TypeScript configuration
* [x] Tailwind CSS setup
* [x] shadcn/ui setup
* [ ] Homepage — placeholder implemented (#17 open for full content)
* [ ] About page
* [ ] Projects page — implemented, lists Disaster Response Pipeline and Whale Blog (#19 open for full content)
* [ ] Contact page
* [ ] Fitness Platform (top-level page) — placeholder implemented (#21 open for full showcase content)
* [ ] Ski Advisor (top-level page) — placeholder implemented (#22 open for full showcase content)
* [ ] User authentication — Google OAuth (#39); email login (#42) deferred pending data-platform's `core.users` (Phase 3)

## Project Showcase Pages

Create pages for:

* Disaster Response Pipeline
* Whale Blog

Each project page should include:

* Overview
* Architecture
* Technology stack
* Screenshots
* GitHub link
* Lessons learned

Fitness Platform and Ski Advisor use the same content structure, but live at their own top-level routes (`/fitness-platform`, `/ski-advisor`) instead of under `/projects` — see [ADR 0004](decisions/0004-top-level-fitness-ski-navigation.md).

Data Platform is shared infrastructure (Tier 4 — see `docs/architecture.md`), not a standalone portfolio project, so it does not get a showcase page here — see [ADR 0004](decisions/0004-top-level-fitness-ski-navigation.md).

---

# Phase 3 — Data Platform Foundation

Repository:

`data-platform`

## Goal

Build the shared data infrastructure used by multiple applications.

## Database

Primary database:

* PostgreSQL

Initial schemas:

```
core

users
preferences


fitness

activities
workouts
training_metrics


ski

resorts
weather
snow_conditions


analytics

ai_requests
recommendations
```

## Initial Features

* [ ] PostgreSQL setup
* [ ] Database migrations
* [ ] Schema management
* [ ] Local Docker environment
* [ ] Data ingestion framework
* [ ] Logging framework

---

# Phase 4 — Fitness Platform MVP

Repository:

`fitness-platform`

## Goal

Build a personalized AI fitness assistant.

## Data Sources

Initial:

* Strava API
* Weather API

Future:

* Garmin
* Training platforms
* Calendar integrations

## Features

### MVP

* [ ] Import workout history
* [ ] Store fitness activities
* [ ] Analyze training trends
* [ ] Generate daily workout recommendations
* [ ] Display recommendations through website

### Future

* Training load analysis
* Injury-aware recommendations
* Race preparation
* Adaptive training plans
* AI coaching conversations

---

# Phase 5 — Ski Advisor Platform MVP

Repository:

`ski-advisor-platform`

## Goal

Build a Washington-focused ski recommendation engine.

## User Inputs

Users provide:

* Starting location
* Alpine or backcountry preference
* Skill level
* Travel distance
* Ski preferences

## Recommendations

System provides:

* Best ski destination
* Conditions summary
* Snow quality assessment
* Weather forecast
* Reasoning behind recommendation

---

## Data Sources

Initial:

* NOAA weather data
* NWAC avalanche forecasts
* Resort snow reports

Future:

* Road conditions
* Webcams
* Social media
* Community reports
* Historical snowfall data

---

## AI Strategy

Use a hybrid recommendation model.

### Precomputed Recommendations

Generate daily recommendations for common locations:

* Seattle
* Bellevue
* Everett
* Bellingham
* Leavenworth
* Wenatchee
* Tacoma
* Spokane

### Personalized Recommendations

Use live AI generation for:

* Custom ski trips
* Multi-day planning
* Preference-based recommendations
* Resort comparisons

---

# Phase 6 — API and Backend Architecture

## Goal

Create consistent communication between applications.

Architecture:

```
website / app

↓

platform-hub (API gateway + application logic)

↓

data-platform

↓

PostgreSQL
```

Implement:

* REST APIs
* Authentication
* API documentation
* Error handling
* Logging

---

# Phase 7 — Cloud Deployment

## Goal

Deploy applications using modern cloud infrastructure.

Platform:

Google Cloud

## Infrastructure

Implement:

* Cloud Run
* Cloud SQL
* Cloud Scheduler
* Secret Manager
* Cloud Storage

## Containerization

Implement:

* Docker
* Docker Compose
* Container-based deployment

---

# Phase 8 — CI/CD

## Goal

Automate testing and deployment.

Pipeline:

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

Implement:

* Automated testing
* Deployment workflows
* Environment management
* Database migrations

---

# Phase 9 — Data Engineering Expansion

## Goal

Demonstrate modern data engineering practices.

Implement:

* dbt transformations
* Data documentation
* Data lineage
* Data quality checks
* Analytics models

Future:

* Databricks integration
* Data warehouse architecture
* Advanced analytics

Architecture:

```
External APIs

↓

Raw Data

↓

PostgreSQL

↓

dbt Models

↓

Analytics Layer

↓

Applications + AI
```

---

# Phase 10 — AI Platform Expansion

## Goal

Build production-style AI applications.

## AI Infrastructure

Implement:

* Prompt management
* AI request logging
* Token tracking
* Cost monitoring
* Rate limiting
* User quotas

---

## Fitness AI

Features:

* Weekly training summaries
* Personalized workout adjustments
* Training recommendations
* Progress analysis

---

## Ski AI

Features:

* Conversational ski planner
* Resort comparisons
* Trip recommendations
* Personalized decision support

---

# Phase 11 — Portfolio Improvements

## Goal

Create strong engineering examples.

For each repository:

Add:

* Architecture diagrams
* Technical documentation
* Screenshots
* Demo videos
* Design decisions
* Lessons learned

---

# Long-Term Architecture

```
                         User

              ┌───────────┼───────────┐

          website    app (planned)   Projects
                                    (standalone showcase,
                                     no backend calls)

           └───────────┘

                    |

               platform-hub
   (API gateway + fitness/ski domain logic + AI infrastructure)

                    |

                data-platform

                    |

              dbt • PostgreSQL
                    ↑
         Ingestion Pipeline (scheduled ETL)
```

## Long-Term Goal

Build a modern software platform demonstrating:

* Full-stack development
* Data engineering
* Cloud architecture
* AI application development
* CI/CD practices
* Production software design

