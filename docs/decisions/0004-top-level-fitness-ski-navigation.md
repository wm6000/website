# 0004. Fitness Advisor and Ski Advisor as top-level navigation

Status: Accepted

## Context

Phase 2 of the roadmap (`docs/roadmap.md`) originally planned Fitness Advisor and Ski Advisor as two of five "Project Showcase Pages" living under `/projects`, each with Overview, Architecture, Technology stack, Screenshots, GitHub link, and Lessons learned sections — grouped alongside Data Platform, Disaster Response Pipeline, and Whale Blog (issues #21–#25).

When building the initial site navigation, Fitness Advisor and Ski Advisor were promoted to dedicated top-level nav tabs instead. Unlike the other three, they are live product experiences described in `docs/architecture.md` (Tier 3 application logic backed by `platform-hub`), not standalone portfolio writeups — they're core to what the platform does, not just something it showcases.

## Decision

Top-level navigation, left to right: Home, Fitness Advisor, Ski Advisor, Projects.

* `/fitness-advisor` and `/ski-advisor` are dedicated top-level pages for the live product experience.
* `/projects` showcases the remaining portfolio-style work: Data Platform, Disaster Response Pipeline, Whale Blog.

## Consequences

* Issues #21 and #22 (originally "Project showcase page: Fitness Platform / Ski Advisor Platform", since renamed to "Fitness Advisor" / "Ski Advisor") are superseded in placement — the content scope they describe (Overview, Architecture, Technology stack, Screenshots, GitHub link, Lessons learned) still applies, but renders at `/fitness-advisor` and `/ski-advisor` rather than as `/projects` subpages.
* Data Platform is shared infrastructure (Tier 4 in `docs/architecture.md`), not a standalone portfolio project — `architecture.md` explicitly names only `disaster-response-pipeline` and `whale-blog` as the "standalone portfolio projects... showcased from website." It does not get a `/projects` card. Issue #23 ("Project showcase page: Data Platform") is dropped from Phase 2 scope.
* The `/projects` list (`src/lib/projects.ts`) now tracks 2 items (Disaster Response Pipeline, Whale Blog) instead of the originally planned 5.
