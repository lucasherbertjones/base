---
name: find-skills
description: >-
  Meta-skill for discovering agent skills from the open ecosystem (skills.sh,
  npx skills CLI, GitHub). Use when users ask "how do I do X", "is there a
  skill for Y", or want to find and install reusable agent capabilities.
---

# find-skills

Meta-skill that teaches an agent how to help users discover, evaluate, and
install skills from the open agent skills ecosystem. Skills extend agent
capabilities with specialized knowledge, workflows, and tools.

## When to Use This Skill

Activate when:
- The user asks "how do I do X" or "is there a skill for Y"
- The user wants to find tools or workflows for a specific domain
- The user asks to browse, search, or discover new capabilities
- A task could benefit from domain-specific expertise not in the current context
- The user says "find skills for...", "search skills...", or "what skills exist for..."

## What is the Skills Ecosystem?

Skills are modular, reusable instruction sets — directories containing a
`SKILL.md` file with YAML frontmatter (`name`, `description`) and markdown
instructions. They extend coding agents (Claude Code, Codex, Cursor, OpenCode,
and 70+ others) with specialized knowledge.

The ecosystem has two discovery surfaces:

| Surface | Purpose |
|---|---|
| **[skills.sh](https://skills.sh)** | Web leaderboard — 275+ ranked skills with categories, install counts, and trending data |
| **`npx skills` CLI** | Command-line package manager — `find`, `add`, `list`, `update`, `remove` |

### Key CLI Commands

```bash
npx skills find [query]     # Search the ecosystem interactively or by keyword
npx skills add <source> -g  # Install from GitHub, GitLab, or local path (global)
npx skills list             # List installed skills
npx skills update           # Update installed skills
npx skills remove <name>    # Uninstall a skill
```

## How to Help Users Find Skills

### Step 1: Understand the Domain

Clarify what the user is trying to accomplish. Ask yourself:
- What domain? (testing, DevOps, frontend, design, security, etc.)
- What stack? (React, Python, Rust, Kubernetes, etc.)
- What task? (generate, review, deploy, monitor, document, etc.)

### Step 2: Check the Leaderboard

Visit **[skills.sh](https://skills.sh)** and browse categories relevant to the
user's domain. Note top skills by install count — popularity is a signal.

### Step 3: Search via CLI

Run `npx skills find <query>` with specific keywords. Examples:
```bash
npx skills find react component generator
npx skills find database migration
npx skills find ci cd deploy
```

### Step 4: Evaluate Quality

For each candidate skill, check:

| Signal | What to look for |
|---|---|
| **Install count** | Higher is better (top skills have 100K+ installs) |
| **Source reputation** | Prefer `vercel-labs/agent-skills`, `xixu-me/skills`, established orgs |
| **GitHub stars** | More stars = more community trust |
| **Recent updates** | Actively maintained repos |
| **SKILL.md quality** | Clear name, description, well-structured instructions |

### Step 5: Present Options

Show the user their top 2–3 options with:
- Skill name and description
- Source repository
- Install count (if available)
- The exact install command

### Step 6: Offer to Install

```bash
npx skills add <owner/repo@skill-name> -g -y
```

After installation, remind the user to review the skill with
`security-review-skills` before active use.

## Common Skill Categories

| Domain | Example Queries |
|---|---|
| **Web Development** | `react`, `next.js`, `tailwind`, `vue`, `svelte` |
| **Testing** | `unit tests`, `e2e`, `playwright`, `cypress`, `coverage` |
| **DevOps** | `docker`, `kubernetes`, `CI/CD`, `terraform`, `deploy` |
| **Data** | `sql`, `migration`, `ETL`, `analytics`, `visualization` |
| **Security** | `audit`, `vulnerability`, `pentest`, `compliance` |
| **Design** | `UI`, `components`, `accessibility`, `design system` |
| **Documentation** | `README`, `API docs`, `changelog`, `diagrams` |
| **Mobile** | `React Native`, `Flutter`, `SwiftUI`, `iOS`, `Android` |

## Tips for Effective Searches

- **Be specific**: `react form validation` > `react`
- **Try synonyms**: `container` ↔ `docker`, `lint` ↔ `static analysis`
- **Check skills.sh first** — the leaderboard is faster than CLI search
- **Filter by agent**: some skills target specific agents with `-a claude-code`
- **Prefer symlinks**: the default install creates symlinks (single source of truth)

## When No Skills Are Found

- Broaden the query (fewer, more general keywords)
- Suggest creating a custom skill with `npx skills init`
- Check [agentskills.io](https://agentskills.io) for the spec and write one
- Offer to help the user author their own `SKILL.md` for the task

## After Installation

**Always recommend** running `security-review-skills` on newly installed skills.
A skill has access to the agent's context and tool permissions — treat it like
running third-party code.
