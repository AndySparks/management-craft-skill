# Management Craft Skill

The Craftsman, delivered as an installable Claude Code skill.

## Install

```bash
npx management-craft install
```

This downloads the skill files to `~/.claude/skills/management-craft/` and activates The Craftsman inside Claude Code. The Craftsman is a management advisor built from a cited synthesis of canonical management research.

## What you get

- **The Craftsman voice** — a wise, direct, Gandalf-like management advisor grounded in cited research. Not therapy. Not generic advice.
- **Delegation Advisor** — built on 82 primary sources covering delegation from Drucker to Kegan.
- **Citation discipline** — every claim traces to a real book or paper with inline references.

## Requirements

- [Claude Code](https://claude.com/claude-code) (CLI or desktop)
- A Management Craft subscription. See [managementcraft.co](https://managementcraft.co).

## Repo structure

- `skill/` — the Claude Code skill files that get installed to `~/.claude/skills/management-craft/`
  - `SKILL.md` — skill entry point
  - `voice/the-craftsman.md` — Craftsman voice spec
  - `advisors/delegation.md` — Delegation Advisor
- `scripts/install.js` — install script invoked by `npx management-craft install`
- `package.json` — npm package metadata

## About

Management Craft is a cited synthesis wiki of canonical management research, delivered through The Craftsman. The wiki is free and public at [managementcraft.co](https://managementcraft.co). The Craftsman is the paid product.

Questions: hello@managementcraft.co

## License

MIT. See [LICENSE](LICENSE).
