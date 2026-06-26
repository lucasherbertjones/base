# CLAUDE.md

## About This Project

This is a **reusable base** for bootstrapping new projects with agent-first
conventions. Clone or copy it into any new project to inherit:

- A curated set of agent skills
- Security-conscious defaults
- Standard project structure and conventions

## Skills

This project includes two **core skills** shipped directly in `skills/`. They
are loaded automatically by Claude Code and other compatible agents.

| Skill | Category | Purpose |
|---|---|---|
| `find-skills` | Meta | Discover agent skills from the open ecosystem (skills.sh, npx skills CLI) |
| `security-review-skills` | Security | Security audit for agent skills before installation or activation |

### Recommended Skills

These ecosystem skills complement the core set and are **strongly recommended**
for new projects bootstrapped from this base. Install them with
`npx skills add <source> -g -y` after setting up your project.

**Core workflow (install always):**

| Skill | Source | Purpose | Risk |
|---|---|---|---|
| `planning-with-files` | `OthmanAdi/planning-with-files` | Crash-proof file-based planning that survives context loss and `/clear`. Manus-style `task_plan.md` / `findings.md` / `progress.md` pattern. 23K ⭐ | 🟢 LOW |
| `grill-me` | `mattpocock/skills` | Relentlessly interviews the user about plans/designs until every decision branch is resolved. Eliminates the #1 agent failure mode: misalignment. 399K installs | 🟢 LOW |
| `write-a-prd` | `mattpocock/ai-engineer-workshop-2026-project` | Complements `grill-me`: after being interrogated, documents every decision in a durable PRD at `issues/prd.md`. 5-step process: problem exploration → codebase review → stakeholder interview → module sketching → document generation | 🟢 LOW |
| `prd-to-issues` | `mattpocock/ai-engineer-workshop-2026-project` | Decomposes the PRD into independently-grabbable issues using vertical slices (tracer bullets). Each issue cuts through all integration layers end-to-end — never horizontal slices of a single layer | 🟢 LOW |

**Code quality (install for any project with source code):**

| Skill | Source | Purpose | Risk |
|---|---|---|---|
| `tdd` | `mattpocock/skills` | Strict red-green-refactor cycle. Tests public interfaces only — no coupling to internals. Includes anti-pattern reference. 310K installs | 🟢 LOW |
| `improve-codebase-architecture` | `mattpocock/skills` | Scans codebase for architectural deepening opportunities, generates visual HTML report. Anti-entropy for agent-accelerated projects. 328K installs | 🟢 LOW |

**Security (install for security-conscious projects):**

| Skill | Source | Purpose | Risk |
|---|---|---|---|
| `supply-chain-risk-auditor` | `trailofbits/skills` | Dependency risk assessment from industry-leading security firm. Checks for known vulnerabilities, supply chain attacks, and risky patterns | 🟢 LOW |
| `differential-review` | `trailofbits/skills` | Security-focused PR/diff analysis. Finds vulnerabilities that traditional code review misses | 🟢 LOW |
| `sharp-edges` | `trailofbits/skills` | Lighter complement to `differential-review`. Evaluates whether APIs, configs, and interfaces are resistant to developer misuse — identifies designs where the "easy path" leads to insecurity. 3.9K installs | 🟢 LOW |

**Optional — domain-specific:**

| Skill | Source | Purpose | When to Use |
|---|---|---|---|
| `frontend-design` | `anthropics/skills` | Production-grade frontend interfaces. Distinctive, non-generic AI aesthetics. 595K installs | Projects with UI |
| `superpowers` | `obra/superpowers` | Complete 7-stage engineering methodology with hard gates (brainstorming → plan → TDD → verify → review). 204K ⭐, 680K+ installs | Teams wanting maximum discipline |

### Installing Recommended Skills

```bash
# Core — always install
npx skills add OthmanAdi/planning-with-files -g -y
npx skills add mattpocock/skills@grill-me -g -y
npx skills add mattpocock/ai-engineer-workshop-2026-project@write-a-prd -g -y
npx skills add mattpocock/ai-engineer-workshop-2026-project@prd-to-issues -g -y

# Code quality
npx skills add mattpocock/skills@tdd -g -y
npx skills add mattpocock/skills@improve-codebase-architecture -g -y

# Security
npx skills add trailofbits/skills@supply-chain-risk-auditor -g -y
npx skills add trailofbits/skills@differential-review -g -y
npx skills add trailofbits/skills@sharp-edges -g -y

# Optional
npx skills add anthropics/skills@frontend-design -g -y
npx skills add obra/superpowers -g -y
```

After installation, run `security-review-skills` on each new skill and update
`.claude/skills-audit.json`.

### Skill Loading

Skills in `skills/` follow the [Agent Skills
spec](https://agentskills.io). Each skill is a directory containing a
`SKILL.md` with YAML frontmatter (`name`, `description`) and markdown
instructions. Skills installed via `npx skills add` are symlinked into the
agent's skills directory and loaded on demand via progressive disclosure
(YAML frontmatter → SKILL.md body → references/).

## Workflow: Discover → Audit → Install

When a skill is needed or requested, follow this sequence:

```
1. find-skills     →  Search the ecosystem, identify candidates
2. security-review-skills  →  Audit each candidate for safety
3. Install         →  Only install skills that pass review (LOW or INFO risk)
```

**Never skip the security review.** A skill has access to the agent's full
context and tool permissions. Treat installing a skill like running third-party
code.

## Security Posture

- **Default deny**: No skill is trusted by default — even skills shipped with
  this base were reviewed at time of writing and should be re-reviewed on
  update.
- **Review on install**: Every `npx skills add` must be followed by
  `security-review-skills`.
- **Review on update**: Every `npx skills update` must re-trigger a security
  review.
- **Audit trail**: Maintain a `.claude/skills-audit.json` recording which
  skills have been reviewed, when, and the verdict.
- **Principle of least privilege**: When a skill declares `allowed-tools`,
  scope them to the minimum necessary. Prefer path-scoped `Write` over
  unrestricted access.

## Conventions

### Project Structure

```
├── CLAUDE.md              # This file — agent instructions
├── README.md              # Human-readable project docs
├── skills/                # Agent skills (SKILL.md files)
│   ├── find-skills/
│   │   └── SKILL.md
│   └── security-review-skills/
│       └── SKILL.md
├── .claude/               # Claude Code configuration
│   ├── settings.json      # Permissions and hooks
│   └── skills-audit.json  # Skill security audit trail
├── scripts/               # Convenience scripts
│   ├── install-recommended-skills.sh   # Install recommended skills (Unix)
│   └── install-recommended-skills.ps1  # Install recommended skills (Windows)
├── src/                   # Source code (when applicable)
├── tests/                 # Test suite (when applicable)
└── docs/                  # Documentation (when applicable)
```

### File Naming

- `CLAUDE.md` — Agent instructions (Claude Code convention)
- `SKILL.md` — Skill definition files
- `*.md` — All documentation in Markdown

### Skill Authoring

When creating new skills for this project:
1. Follow the [Agent Skills spec](https://agentskills.io)
2. Include YAML frontmatter with `name` and `description`
3. Keep instructions focused — one skill, one domain
4. Declare `allowed-tools` explicitly; never use `["*"]`
5. Run `security-review-skills` on the skill before committing

## For New Projects

To use this base in a new project:

```bash
# Option A: Clone as starting point
git clone <this-repo> my-new-project
cd my-new-project
rm -rf .git && git init

# Option B: Copy the structure
cp -r skills/ CLAUDE.md README.md .claude/ <target-project>/
```

Then customize `CLAUDE.md` with project-specific instructions and add
domain-specific skills via `find-skills`.
