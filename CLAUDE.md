# Management Craft Skill

This repo is the npm package for The Craftsman, Management Craft's management advisor delivered as a Claude Code skill. Users run `npx management-craft install` to install it.

## Three-repo architecture

- **`management-craft`** — Next.js website + Layer 2a publishable content (topic/framework/reference pages) + editorial pipeline. Source of truth for everything users read at managementcraft.co.
- **`mc-wiki`** — private research vault. Layer 1 raw (copyrighted source material) + internal research docs (syntheses, tensions, gaps, reactions) + research pipeline tools.
- **`management-craft-skill`** — this repo. npm package + Layer 2b Advisors + install flow. Published to npm as `management-craft` for `npx management-craft install`.

**Source-of-truth rule:** Layer 2a content lives in `management-craft` and is pulled at install time via managementcraft.co/api/skill-payload. This repo does NOT duplicate publishable content. Advisors and voice spec ARE the source-of-truth artifacts here.

## Repo structure

- `skill/` — files copied to `~/.claude/skills/management-craft/` when a user runs `npx management-craft install`
  - `SKILL.md` — skill entry point with frontmatter
  - `voice/the-craftsman.md` — Craftsman voice spec (tonal register, relational stance, prohibitions, citation architecture)
  - `advisors/delegation.md` — Delegation Topic Advisor (diagnosis flow, framework index, relational stance)
- `scripts/install.js` — the install script for `npx management-craft install` (alpha stub, full flow pending auth endpoint)
- `package.json` — npm package metadata. Package name: `management-craft`.

## Status

Alpha. The install script is currently a stub that prints alpha-access instructions. Real install flow is pending the `/api/install` and `/api/skill-payload` endpoints on managementcraft.co. See the Craftsman Alpha punch list in `management-craft/docs/TASKS.md` for current status.

## Rules

- **Never put Layer 2a content here.** Publishable wiki content lives in management-craft and is fetched at install time. Don't duplicate.
- **Every Advisor ships with citation discipline.** Every claim in the Advisor output must trace to a source. Cited or cut.
- **Voice is load-bearing.** Changes to `skill/voice/the-craftsman.md` are reviewed as carefully as user-facing copy. The voice is the product.
- **The skill is the paid product.** Per management-craft/docs/STRATEGY.md, the skill is auth-gated at runtime. Alpha uses a hardcoded whitelist; beta uses real Stripe subscription checks. Keep auth flow token-based so the swap is a one-function change.

### Boil the ocean

The marginal cost of completeness is near zero with AI. Do the whole thing. Do it right. Do it with tests. Do it with documentation. Do it so well that Andy is genuinely impressed - not politely satisfied, actually impressed. Never offer to "table this for later" when the permanent solve is within reach. Never leave a dangling thread when tying it off takes five more minutes. Never present a workaround when the real fix exists. The standard isn't "good enough" - it's "holy shit, that's done." Search before building. Test before shipping. Ship the complete thing. When Andy asks for something, the answer is the finished product, not a plan to build it. Time is not an excuse. Fatigue is not an excuse. Complexity is not an excuse. Boil the ocean.
