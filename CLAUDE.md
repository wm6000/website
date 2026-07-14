# website

Operational conventions for this repo. Decisions and rationale live in `docs/decisions/`; this file is the enforced summary that both interactive sessions and automated (GitHub Actions) agent runs should follow.

## Stack

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui. See [ADR 0001](docs/decisions/0001-initial-technology-stack.md).

## Formatting & linting

- Prettier for formatting, ESLint (`eslint-config-next`) for linting. Run both before committing.
- TypeScript `strict: true`. No implicit `any`.

## Naming

- Files: kebab-case (`user-profile.tsx`)
- Components: PascalCase (`UserProfile`)
- Variables/functions: camelCase

## React / Next.js

- Functional components and hooks only.
- Server Components by default; add `"use client"` only when the component needs interactivity/state.

## Styling

- Tailwind utility classes and shadcn/ui primitives. Avoid standalone CSS files unless Tailwind can't express what's needed.

## Comments

- Default to no comments. Add one only when the *why* is non-obvious — a hidden constraint, a workaround, a subtle invariant — never to restate what the code already says.

## Testing

- Write tests for logic and behavior that could silently break. Skip tests that only restate the implementation.
- Test framework TBD — decide in Phase 2 once the app exists to test.

## Commits & branching

- Branch naming, PR requirements, and squash-merge policy: [ADR 0002](docs/decisions/0002-branching-strategy.md).
- PR titles follow Conventional Commits: `type: imperative summary` (lowercase), using `feat` / `fix` / `docs` / `chore` / `refactor` / `test`. The PR title becomes the commit message on `main`, so it needs to stand alone.

## Full rationale

See [ADR 0003](docs/decisions/0003-coding-standards.md).
