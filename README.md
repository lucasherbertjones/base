# base

Reusable foundation for bootstrapping new projects with agent-first conventions.

## What's Included

### Core Skills (shipped with base)

| Skill | Description |
|---|---|
| [`find-skills`](skills/find-skills/SKILL.md) | Meta-skill for discovering agent skills from the open ecosystem — search skills.sh, `npx skills find`, evaluate quality, and install safely |
| [`security-review-skills`](skills/security-review-skills/SKILL.md) | Security audit for agent skills — 6-dimension review covering source reputation, malicious patterns, tool permissions, prompt injection, obfuscation, and dependencies |

### Recommended Ecosystem Skills

These skills complement the core set. Install them after setting up your project:

```bash
# Core workflow — install always
npx skills add OthmanAdi/planning-with-files -g -y                           # Crash-proof file-based planning
npx skills add mattpocock/skills/grill-me -g -y                              # Pre-coding clarification interviews
npx skills add mattpocock/ai-engineer-workshop-2026-project@write-a-prd -g -y  # Document decisions in a PRD
npx skills add mattpocock/ai-engineer-workshop-2026-project@prd-to-issues -g -y # Decompose PRD into vertical slice issues

# Code quality
npx skills add mattpocock/skills/tdd -g -y                          # Strict TDD cycle
npx skills add mattpocock/skills/improve-codebase-architecture -g -y # Architecture scanner

# Security
npx skills add trailofbits/skills/supply-chain-risk-auditor -g -y  # Dependency risk audit
npx skills add trailofbits/skills/differential-review -g -y        # Security PR review
npx skills add trailofbits/skills/sharp-edges -g -y               # API/config safety audit

# Optional — domain-specific
npx skills add anthropics/skills/frontend-design -g -y  # Frontend UI design
npx skills add obra/superpowers -g -y                    # Full 7-stage engineering methodology
```

See [CLAUDE.md](CLAUDE.md) for detailed descriptions and usage guidance.

### Configuration

- **[`CLAUDE.md`](CLAUDE.md)** — Agent instruction file loaded by Claude Code and compatible agents
- **`.claude/`** — Claude Code settings, permissions, and audit trails
- **[`.claude/skills-audit.json`](.claude/skills-audit.json)** — Security review trail for all skills

## Quick Start

```bash
# Clone as a starting point for a new project
git clone <this-repo> my-new-project
cd my-new-project
rm -rf .git && git init
git add -A && git commit -m "Initial commit from base"

# Install recommended agent skills (Windows PowerShell)
.\scripts\install-recommended-skills.ps1

# Or on Unix/macOS
bash scripts/install-recommended-skills.sh
```

## Workflow

```
Discover ──→ Audit ──→ Install
   │            │          │
   │    find-skills         │
   │    security-review-skills
   │                        │
   └────────────────────────┘
        All skills reviewed
        before activation
```

1. **Discover** — Use `find-skills` to search the ecosystem
2. **Audit** — Use `security-review-skills` to review safety
3. **Install** — Only install skills that pass review

## Why Security Review Matters

Agent skills are loaded into the agent's context and can:
- Instruct the agent to run arbitrary commands
- Access files, environment variables, and credentials
- Make network requests to external services
- Modify the agent's behavior through prompt injection

A malicious skill is equivalent to running untrusted code. **Always review
before installing.**

## Conventions

- Skills follow the [Agent Skills specification](https://agentskills.io)
- All agent instructions live in `CLAUDE.md`
- Security audit trail maintained in `.claude/skills-audit.json`
- Principle of least privilege for tool permissions

## License

MIT — see [LICENSE](LICENSE) for full text.
Projects derived from this base may use any license.
