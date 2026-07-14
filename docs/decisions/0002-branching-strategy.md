# 0002. Branching strategy

Status: Accepted

## Context

The ecosystem (see [`roadmap.md`](../roadmap.md)) spans multiple repositories maintained by a single developer, increasingly assisted by an AI pair programmer working both interactively and, eventually, unattended in the cloud against GitHub issues. A branching model was needed before Phase 2+ implementation work ramps up, and before any autonomous agent work begins, so that `main` stays safe regardless of who or what is producing commits.

`main` on this repo already has branch protection enabled (PR required, no force-push, no deletion, enforced for admins too), and PR #9 already merged using an informal `docs/4-architecture-documentation` branch name. This ADR formalizes that precedent as the standard for all repos in the ecosystem, rather than inventing a new model.

GitFlow (long-lived `develop`/`release` branches) was considered and rejected: it adds coordination overhead meant for multi-team release trains, which doesn't apply to a single-maintainer portfolio project.

## Decision

**Model: trunk-based development.**

- `main` is always deployable. There are no long-lived `develop`, `release`, or `staging` branches.
- All work happens on short-lived branches created from an up-to-date `main`, merged back via PR, then deleted.
- One GitHub issue drives one branch drives one PR. If work doesn't fit that shape, split the issue.

**Branch naming: `<type>/<issue-number>-<kebab-case-summary>`**

Types:

| Type | Use |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Tooling, dependencies, config, repo housekeeping |
| `refactor` | Code change with no behavior change |
| `test` | Test-only changes |

Example: `docs/8-branching-strategy`.

**Merge strategy: squash merge only.**

Every PR collapses to a single commit on `main`, titled from the PR title. This keeps `main`'s history readable as one commit per issue regardless of how many intermediate commits accumulate on the branch — which matters most for agent-driven branches, where incremental/exploratory commits are expected and shouldn't leak into `main`'s history. The repo's merge button is configured to only allow squash merge (merge commits and rebase merge are disabled), and branches are deleted automatically on merge.

**Pull requests are required for every change, including agent-driven ones.**

Branch protection already blocks direct pushes to `main`, including for admins. This is intentional and extends to cloud/autonomous agent work: an agent works one issue on its own branch and opens a PR — it never pushes to `main` directly, and a human reviews and merges. This is the main safety mechanism for unattended agent work; it doesn't change as agent autonomy increases.

**Scope: applies to every repository in the ecosystem** (`website`, `data-platform`, `fitness-platform`, `ski-advisor-platform`, and future repos), not just `website`. Each repo's merge-button settings and branch protection should be brought in line with this decision as they're touched.

## Consequences

- `main`'s log stays a clean, linear list of one commit per issue, at the cost of losing per-commit granularity and finer-grained `git bisect`/`git blame` within a PR's changes — an acceptable tradeoff given branches are expected to be small.
- Every change, including future autonomous agent work, is forced through the same PR gate as manual work; there's no separate, looser path for agents to merge faster.
- Branch names double as a traceability link back to the originating issue, which matters more once multiple branches (human- and agent-driven) can be in flight at once.
- This decision was only mechanically enforced (branch protection + merge button settings) on `website` so far; other repos need the same settings applied before agent work starts there.
