---
type: decision
date: 2026-04-27
last_updated: 2026-04-27
slug: spine-adoption
status: accepted
scope: management-craft-skill
tags: [spine, spine-adoption, methodology]
supersedes: []
invalidates: []
ceremony: y-statement
---

# management-craft-skill adopts spine (partial — vocabulary + decision pattern + roadmap scaffold)

In the context of the 2026-04-27 cross-project spine portability decision (`~/operating-system/8-DECISIONS/2026-04-27-spine-portability.md`) framing spine as a portable methodology, with three sibling adoptions earlier the same day (MC's wiki-engine surface, the teaching repo, bookconvert), and management-craft-skill being a thin npm-package repo (single source commit, six top-level files: CLAUDE.md, LICENSE, package.json, README.md, scripts/, skill/) currently in Alpha status with a stub install script blocked on MC-side endpoints, facing the choice between (a) deferring spine adoption since the repo has no docs surface or accumulated decisions yet, or (b) **adopting partial spine pre-emptively — vocabulary lock, decision-file pattern, roadmap scaffold — so the conventions are in place by the time real decisions and decisions-shaped artifacts start accumulating during alpha → GA**, we chose (b), to gain the rules-collapse value (one cross-repo navigation pattern; future decisions land in a spine-aligned location instead of accumulating as ad-hoc files; the install-flow design decision and the eventual GA decision both find their home immediately) — over (a) which would let the repo accumulate ad-hoc conventions and re-derive spine later when the work warrants it.

## What changed

1. **`1-ROADMAP.md` created** at repo root with `type: roadmap` frontmatter. Now / Next / Blocked / Someday structure. Currently mostly empty (alpha is gated on MC-side endpoints); becomes the load-bearing nav file as the install flow comes online.
2. **`8-DECISIONS/` directory created.** This decision file is its first inhabitant. Future decisions live here following spine convention (`YYYY-MM-DD-slug.md` + Y-statement / directive / full ceremony).
3. **`CLAUDE.md` updated.** Notes that the repo is partially spined; points at the spine portability decision for vocabulary.

## Explicit divergences from OS reference

These are intentional, not drift:

- **No `0-STRATEGY.md`.** Strategic context lives upstream in MC's `docs/0-STRATEGY.md`. The Three-repo architecture section in CLAUDE.md is the canonical pointer.
- **No `2-PROJECTS/`.** This is an npm package repo, not a multi-bet docs repo. The "project" IS the package; future major versions land as semver bumps on the package, not as `v2/` folders. (Per the 2026-04-27 feature-level-semver feedback memory, semver-bumps-as-the-versioning-axis already covers this case.)
- **No `3-RULES/`.** Skill-side rules live in `skill/voice/the-craftsman.md` and `skill/advisors/*.md` — that's the skill's internal contract, not a meta-rules surface.
- **No `7-RUNBOOKS/`.** Workflow lives in CLAUDE.md (three-repo architecture, install flow). When a recurring publish/release ritual emerges, file then.
- **No B+C-lite validator + pre-commit hook.** Repo is too small for the scaffolding to earn its keep. Revisit if decision count grows past ~5 or runbooks land.
- **No `_archive/` convention yet.** Establishes itself when the first artifact warrants archive (e.g., the alpha install-stub script when the real install flow lands and the stub is decommissioned).

## What's NOT changing

- `skill/` directory (SKILL.md, voice/the-craftsman.md, advisors/delegation.md) untouched — this is the skill's deployable payload.
- `scripts/install.js` untouched — alpha stub stays as-is until the real install flow lands.
- `package.json`, `README.md`, `LICENSE` unchanged.

## Re-eval triggers

- Real install flow lands (MC-side `/api/install` + `/api/skill-payload` endpoints) and the Craftsman moves from alpha to GA → expect a flurry of decisions; consider B+C-lite enforcement.
- Multi-advisor architecture grows past 3 advisors → consider whether `2-PROJECTS/` per-advisor structure earns its keep.
- Strategic divergence from MC emerges (skill repo sprouts independent direction) → file `0-STRATEGY.md`.

## Related

- `~/operating-system/8-DECISIONS/2026-04-27-spine-portability.md` — cross-project spine portability decision; this is the fourth sibling instance.
- `~/conductor/repos/management-craft/docs/8-DECISIONS/2026-04-27-wiki-engine-spine-adoption.md` — first per-surface adoption (MC wiki-engine).
- `~/teaching/8-DECISIONS/2026-04-27-spine-adoption.md` — second adoption (teaching).
- `~/documents/claude/projects/bookconvert/8-DECISIONS/2026-04-27-spine-adoption.md` — third adoption (bookconvert).
- `~/operating-system/3-RULES/session-memory/feedback_feature_level_semver.md` — feature-level semver discipline (relevant to package-version cadence).
