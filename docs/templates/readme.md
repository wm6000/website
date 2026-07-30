# README template

> Standard shape for every repo's `README.md` in the willmuehlhausen.com ecosystem (`website`, `platform-hub`, `data-platform`, `fitness-platform`, `ski-advisor-platform`, `disaster-response-pipeline`, `whale-blog`). Copy the skeleton below into the repo's `README.md` and fill in each section — delete the HTML comments as you go. Rolled out per repo as each one is touched, same as [ADR 0002](../decisions/0002-branching-strategy.md)'s branch-protection rollout.

---

```markdown
# <repo-name>

<!-- One sentence: what this repo is and its role in the ecosystem. -->

Status: <!-- planned / in development / live — link to the relevant roadmap phase -->

## Overview

<!-- 2-4 sentences: what it does, who/what it serves, and how it fits into the
larger platform. Link to https://github.com/wm6000/website/blob/main/docs/architecture.md
for the full-system picture. -->

## Tech stack

<!-- Bullet list. Keep in sync with the Technology Stack entry in website's
docs/architecture.md and docs/roadmap.md. -->

## Getting started

<!-- Local setup: prerequisites, install, run, test. Keep this accurate —
it's the first thing anyone (including future you) will try. -->

## Documentation

<!-- Links to this repo's own docs/ (if any), plus the shared docs in
website: architecture.md, the relevant roadmap.md phase, and any ADRs
that shaped this repo. -->

## Contributing

See [website's branching strategy](https://github.com/wm6000/website/blob/main/docs/decisions/0002-branching-strategy.md) — trunk-based, one issue per branch per PR, squash merge only. Applies to every repo in the ecosystem.
```
