# 0003. Coding standards

Status: Accepted

## Context

Phase 0 needs a coding standards decision before Phase 2 (Website Foundation) implementation starts, and before any GitHub Actions-driven agent work begins (see roadmap Phase 0) — both need a concrete, written definition of "good code" for this repo rather than tribal knowledge. [ADR 0001](0001-initial-technology-stack.md) already fixed the stack (Next.js, React, TypeScript, Tailwind, shadcn/ui for `website`; Python/FastAPI for the platform repos). [ADR 0002](0002-branching-strategy.md) fixed how branches/PRs move code into `main`. This ADR fixes what the code inside those PRs should look like.

The standards below are recorded as decisions here, and operationalized in `CLAUDE.md` at the repo root, which is what both interactive sessions and the future GitHub Actions workflow actually read at runtime. The ADR is the "why," `CLAUDE.md` is the enforced "what" — keep them in sync if either changes.

## Decision

- **Formatting & linting** (`website`): Prettier for formatting, ESLint via `eslint-config-next` for linting, TypeScript `strict: true` with no implicit `any`. These are the de facto defaults for a Next.js app and don't need bespoke justification.
- **Component conventions**: functional components and hooks only; Server Components by default, `"use client"` only when interactivity requires it (the App Router's stated model).
- **Naming**: kebab-case filenames, PascalCase component names/exports, camelCase variables and functions.
- **Styling**: Tailwind utility classes plus shadcn/ui primitives; avoid standalone CSS files unless Tailwind genuinely can't express something.
- **Comments**: only when the *why* isn't obvious from the code itself (a hidden constraint, a workaround, a non-obvious invariant) — never to restate what the code does.
- **Testing**: write tests for logic and behavior that could silently break; skip low-value coverage-for-its-own-sake tests. The specific framework (e.g. Vitest, Playwright) is deferred to Phase 2, when there's an actual app to test against.
- **Commit/PR messages**: PR titles follow Conventional Commits (`type: imperative summary`, lowercase), using the same `type` vocabulary as ADR 0002's branch prefixes (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`). Because ADR 0002 configured squash-merge with the PR title as the commit title, this is what actually lands in `main`'s history.
- **Scope**: this decision, and the practice of encoding it in a per-repo `CLAUDE.md`, applies across the ecosystem. `website`'s specifics are TypeScript-flavored; `data-platform`, `fitness-platform`, and `ski-advisor-platform` need their own `CLAUDE.md` with Python-appropriate equivalents (e.g. Black/Ruff/mypy) written when those repos are actively touched, not speculatively here.

## Consequences

- Human- and agent-authored code are held to the same written bar, checked into the repo instead of living only in the maintainer's head — this is what makes unattended agent PRs reviewable without re-explaining conventions every time.
- `main`'s commit history reads as a changelog (`feat: ...`, `fix: ...`) rather than free-form prose, at the cost of a small amount of PR-title discipline.
- Deferring the test framework choice means this ADR doesn't fully answer "how is code tested" yet; that gap closes in Phase 2, not before, since picking a framework with no app to run it against would be speculative.
- Sibling repos are not yet brought in line with this decision; agent work should not begin there until each has an equivalent `CLAUDE.md`.
