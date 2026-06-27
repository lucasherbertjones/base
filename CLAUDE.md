# CLAUDE.md

## About This Project

**Geodata** (working name: TerraScan) — plataforma de due diligence territorial
para incorporadoras brasileiras.

### Value Proposition

Relatório de viabilidade ambiental e urbanística para qualquer terreno no Brasil
em menos de 30 minutos, usando fontes oficiais federais (SICAR, ANA, IBGE/SRTM),
substituindo semanas de trabalho manual de consultores.

### Target User

Gerentes de aquisição de incorporadoras de pequeno/médio porte que avaliam
10–30 terrenos por mês antes de decidir qual comprar.

### Job To Be Done

"Quero saber se esse terreno tem algum impedimento crítico antes de gastar
dinheiro com visita técnica, advogado e engenheiro."

## Product Definition

### MVP Layers (5, by priority)

| # | Layer | Data Source | Status |
|---|---|---|---|
| 1 | APP / Reserva Legal | SICAR/CAR (GeoServer WFS) | Federal, national coverage |
| 2 | Risco de inundação | ANA / CEMADEN WMS | Federal, national coverage |
| 3 | Declividade | SRTM 30m via Google Earth Engine | Global, 30m resolution |
| 4 | Zoneamento municipal | GeoSampa (SP), IPPUC (Curitiba), open data where available | Municipal, partial coverage |
| 5 | Valor do m² | ITBI open data (POA), real estate listings (Zap/VivaReal) | Regional, growing coverage |

### Output Format

PDF export + interactive web dashboard. **PDF is the priority** — it's what
the director shares with partners and lawyers via WhatsApp.

### Competitive Landscape

**OSPA Place** — strong on financial feasibility and 3D volumetry, weak on
environmental/territorial constraints. Coverage: ~4 cities. **Our advantage:**
national coverage from day 1 via federal data sources (SICAR, ANA, SRTM).

### Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + TypeScript + Mapbox GL JS + `@mapbox/mapbox-gl-draw` |
| **Backend** | Python + FastAPI + GeoPandas + Shapely |
| **Database (MVP)** | DuckDB + spatial extension |
| **Database (Production)** | PostgreSQL + PostGIS |
| **Geo processing** | Google Earth Engine (SRTM, vegetation) + Brazilian federal APIs (SICAR, ANA) |
| **PDF generation** | Jinja2 + WeasyPrint (or Playwright headless) |

### Current Phase

**Prototype C** — market validation: landing page + 3 real terrain reports
before starting data layer implementation. See [.claude/task_plan.md](.claude/task_plan.md)
for the full roadmap.

### Key Documents

- [CONTEXT.md](CONTEXT.md) — all project decisions (survives `/clear`)
- [issues/prd.md](issues/prd.md) — full Product Requirements Document
- [issues/vertical-slices.md](issues/vertical-slices.md) — 8 vertical slices (tracer bullets)
- [docs/adr/001-stack-choices.md](docs/adr/001-stack-choices.md) — architecture decision record
- [docs/research-findings.md](docs/research-findings.md) — market research & Brazilian data sources
- [.claude/task_plan.md](.claude/task_plan.md) — crash-proof task plan

---

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
| `grill-with-docs` | `mattpocock/skills` | Same relentless interview as `grill-me`, but maintains a living `CONTEXT.md` and Architecture Decision Records (ADRs) so decisions survive context loss and `/clear`. Pairs with `planning-with-files` | 🟢 LOW |
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
| `spatial` | `duckdb/duckdb-skills` | DuckDB spatial extension patterns. Overture Maps integration for global geodata. Use for spatial queries in prototyping phase | During MVP with DuckDB |
| `mapbox-mcp-runtime-patterns` | `mapbox/mapbox-agent-skills` | Mapbox MCP Server integration patterns for geospatial AI applications. Covers distance, area, isochrones, routing tools | When integrating Mapbox MCP |

### Installing Recommended Skills

```bash
# Core — always install
npx skills add OthmanAdi/planning-with-files -g -y
npx skills add mattpocock/skills@grill-me -g -y
npx skills add mattpocock/skills@grill-with-docs -g -y
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

# Domain (Geodata project)
npx skills add duckdb/duckdb-skills@spatial -g -y
npx skills add mapbox/mapbox-agent-skills@mapbox-mcp-runtime-patterns -g -y
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

## Spec-Driven Development

This project uses a **built-in pipeline** for defining what to build before
writing code: `grill-me` → `write-a-prd` → `prd-to-issues`. For the Geodata
project, this pipeline produced:

- [CONTEXT.md](CONTEXT.md) — project decisions and scope
- [issues/prd.md](issues/prd.md) — full PRD with 5 layers, personas, journey
- [issues/vertical-slices.md](issues/vertical-slices.md) — 8 independent tracer bullets

For teams wanting more formal specification workflows, see
[docs/spec-driven-development.md](docs/spec-driven-development.md) — it covers
OpenSpec (~55K ⭐), Spec-Kit (~40K ⭐), and product discovery tooling.

## MCP Servers

This project recommends two [MCP (Model Context Protocol)](https://modelcontextprotocol.io)
servers that are universally useful across project types. See
[docs/mcp-recommendations.md](docs/mcp-recommendations.md) for detailed setup
instructions.

| MCP Server | Purpose | Universal? |
|---|---|---|
| **Context7** | Up-to-date library documentation — prevents the agent from hallucinating stale APIs or deprecated patterns | ✅ Yes |
| **GitHub MCP** | PRs, issues, releases, and repo operations without leaving the agent | ✅ Yes |

> **Note**: MCP servers often require API keys or authentication. These are
> recommendations, not pre-configured defaults. Set them up per-project with
> `claude mcp add`.

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

## Sub-agents

This project ships with two **specialized sub-agents** in `.claude/agents/`. They
are loaded automatically by Claude Code and can be invoked via the Agent tool
when deep, focused analysis is needed.

| Agent | Purpose | Tools |
|---|---|---|
| `security-reviewer` | Deep security audit: supply chain → diff review → sharp edges → consolidated report | Read, Grep, Glob, Bash, WebFetch |
| `code-reviewer` | Thorough code review across correctness, security, performance, and maintainability | Read, Grep, Glob, Bash |

### When to Use

- **`security-reviewer`**: Before merging PRs with auth, crypto, or data-handling
  changes. Before adding new dependencies. Weekly security sweep.
- **`code-reviewer`**: On every PR. Before refactoring critical paths. When
  onboarding new team members to the codebase.

Both agents are **read-only by design** — they produce structured findings but
never modify code. The main agent decides what to act on.

## Security Posture

- **Default deny**: No skill is trusted by default — even skills shipped with
  this project were reviewed at time of writing and should be re-reviewed on
  update.
- **Review on install**: Every `npx skills add` must be followed by
  `security-review-skills`.
- **Review on update**: Every `npx skills update` must re-trigger a security
  review.
- **Audit trail**: Maintain a `.claude/skills-audit.json` recording which
  skills have been reviewed, when, and the verdict. Currently 13 skills audited.
- **Principle of least privilege**: When a skill declares `allowed-tools`,
  scope them to the minimum necessary. Prefer path-scoped `Write` over
  unrestricted access.

## Conventions

### Project Structure

```
├── CLAUDE.md                    # Agent instructions
├── CONTEXT.md                   # Project decisions (survives /clear)
├── README.md
├── .env.example                 # Environment variable template
├── skills/                      # Agent skills (SKILL.md files)
│   ├── find-skills/
│   └── security-review-skills/
├── .claude/                     # Claude Code configuration
│   ├── settings.json
│   ├── skills-audit.json        # 13 skills audited
│   ├── task_plan.md             # Crash-proof task plan
│   └── agents/
│       ├── security-reviewer/
│       └── code-reviewer/
├── src/
│   ├── backend/
│   │   ├── main.py              # FastAPI — GeoJSON validation + /api/analyze
│   │   └── requirements.txt
│   └── frontend/
│       ├── package.json
│       ├── vite.config.ts
│       └── src/
│           ├── App.tsx           # Map + polygon drawing + analysis flow
│           ├── AnalysisPanel.tsx # Results dashboard with traffic lights
│           ├── api.ts            # HTTP client for backend
│           ├── types.ts          # TypeScript types
│           └── index.css         # Professional theme (green accent)
├── issues/
│   ├── prd.md                   # Product Requirements Document
│   └── vertical-slices.md       # 8 vertical slices (tracer bullets)
├── docs/
│   ├── adr/001-stack-choices.md
│   ├── research-findings.md
│   ├── mcp-recommendations.md
│   └── spec-driven-development.md
├── scripts/
└── tests/
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
