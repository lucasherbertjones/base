# CLAUDE.md

## About This Project

**Geodata** (working name: TerraScan) — plataforma de due diligence territorial
para incorporadoras brasileiras.

### Value Proposition

**Goal**: deliver an environmental and urban feasibility report for any terrain
in Brazil in under 30 minutes, using official federal sources (SICAR, ANA,
IBGE/SRTM), replacing weeks of manual consultant work.

Prioritizing nationwide coverage via federal sources first, with municipal
depth added where open data is available.

### Target User

Gerentes de aquisição de incorporadoras de pequeno/médio porte que avaliam
10–30 terrenos por mês antes de decidir qual comprar.

### Job To Be Done

"Quero saber se esse terreno tem algum impedimento crítico antes de gastar
dinheiro com visita técnica, advogado e engenheiro."

---

## Current Phase

**Prototype C** — market validation: landing page + 3 real terrain reports
before starting data layer implementation. See [.claude/task_plan.md](.claude/task_plan.md)
for the full roadmap.

### Current Goal

We are in **Phase 0 — Market Validation** (3–5 days). The immediate objectives are:

1. Create a landing page with a clear value proposition
2. Generate 3 real terrain reports (manual/semi-manual process)
3. Measure interest and conversion with target users (LinkedIn + Google Ads)

**Agent guidance for this phase:**

- **Do not assume that automated nationwide analysis is already implemented.**
- **Do not expand scope to full automation unless explicitly requested.**
- The data pipeline (SICAR, ANA, SRTM/GEE) is planned but NOT yet built.
- Reports at this stage can be hand-crafted — the goal is to validate demand,
  not to demonstrate technical capability.

---

## Non-Goals (Current Phase)

The following are **explicitly out of scope** for Phase 0. Agents must not
pursue these unless the user explicitly requests a phase change:

- ❌ Do NOT build automated nationwide zoning coverage
- ❌ Do NOT integrate all 5 MVP layers with full automation
- ❌ Do NOT optimize for municipal governments or public-sector use cases
- ❌ Do NOT implement 3D volumetry or advanced financial feasibility
- ❌ Do NOT build a marketplace, multi-tenant SaaS, or multiple user profiles
- ❌ Do NOT implement authentication, payment, or subscription systems
- ❌ Do NOT build a production data pipeline (GEE, SICAR WFS, ANA WMS)

**Phase 0 is about validation, not construction.** If you are unsure whether
something is in scope, default to "no" and ask.

---

## Product Definition

### Validation Prototype Layers (Current Phase)

The Phase 0 prototype focuses on **3 of the 5 MVP layers** — the ones with
federal coverage that can demonstrate value immediately:

| # | Layer | Data Source | Coverage |
|---|---|---|---|
| 1 | APP / Reserva Legal | SICAR/CAR (GeoServer WFS) | Federal, national |
| 2 | Risco de inundação | ANA / CEMADEN WMS | Federal, national |
| 3 | Declividade | SRTM 30m via Google Earth Engine | Global, 30m resolution |

These 3 layers form the **validation triangle**: legal restrictions + natural
hazards + terrain feasibility. They are sufficient to answer the core JTBD:
"Does this terrain have any critical showstoppers?"

### Full MVP Layers (Product Vision)

The complete product vision includes 5 layers. Layers 4–5 are planned for
Phase 2 (full MVP) when municipal data integration is built:

| # | Layer | Data Source | Status |
|---|---|---|---|
| 1 | APP / Reserva Legal | SICAR/CAR (GeoServer WFS) | Federal, national coverage |
| 2 | Risco de inundação | ANA / CEMADEN WMS | Federal, national coverage |
| 3 | Declividade | SRTM 30m via Google Earth Engine | Global, 30m resolution |
| 4 | Zoneamento municipal | GeoSampa (SP), IPPUC (Curitiba), open data where available | Municipal, partial coverage |
| 5 | Valor do m² | ITBI open data (POA), real estate listings (Zap/VivaReal) | Regional, growing coverage |

---

## Output Format

PDF-first report + optional interactive web dashboard.

### Output Policy

- **PDF is the priority** — it's what the director shares with partners and
  lawyers via WhatsApp.
- **Interactive dashboard is secondary** — only build if explicitly requested
  after PDF validation succeeds.
- During Phase 0, reports can be static HTML → PDF; no backend required.
- Every report must state data sources, date of extraction, and confidence
  level per layer (see [Source Trust Policy](#source-trust-policy)).

---

## Success Criteria (Current Phase)

| Metric | Target |
|---|---|
| Real terrain reports generated | 3 |
| Landing page conversion rate | > 3% on "Quero para meu terreno" form |
| Cost per lead | < R$ 30 |
| Target-user conversations | ≥ 5 conversations with acquisition managers |
| Buying signal | ≥ 2 explicit signals of willingness to pay or pilot request |

**Go/no-go decision**: If conversion > 3% AND ≥ 5 incorporadoras express
interest AND ≥ 2 buying signals → proceed to Phase 1 (functional prototype).
Otherwise, pivot or iterate on value proposition.

---

## Competitive Landscape

**OSPA Place** — strong on municipal urban rules, 3D volumetry, and financial
feasibility. Coverage: ~4 cities (deep but narrow).

**Our positioning**:
- **Initial focus**: territorial screening for environmental/legal impediments
  using federal data, enabling broad national applicability from day 1.
- **Weakness we acknowledge**: municipal zoning and m² value have partial
  coverage and will grow over time as more cities open their data.
- **Long-term differentiator**: federal data breadth + municipal depth where
  available, at a fraction of the time and cost of manual due diligence.

We do NOT compete with OSPA on 3D volumetry or advanced financial modeling.
Our value is the **elimination filter**: ruling out non-viable terrains before
expensive formal due diligence begins.

---

## Stack

### Current Phase Stack (Phase 0)

- **Landing page**: static HTML or simple React/Vite
- **Report generation**: static HTML → PDF via Playwright (no backend required)
- **No database required** in Phase 0
- **No geospatial processing pipeline** implemented yet

### Approved Target Stack (Phase 1+)

| Layer | Technology |
|---|---|
| **Frontend** | React + TypeScript + Mapbox GL JS + `@mapbox/mapbox-gl-draw` |
| **Backend** | Python + FastAPI + GeoPandas + Shapely |
| **Database (MVP)** | DuckDB + spatial extension |
| **Database (Production)** | PostgreSQL + PostGIS |
| **Geo processing** | Google Earth Engine (SRTM, vegetation) + Brazilian federal APIs (SICAR, ANA) |
| **PDF generation** | Default: Playwright headless (HTML → PDF). Fallback: WeasyPrint for simpler server-side generation. |

> **Note**: Google Earth Engine is part of the approved target architecture,
> but commercial/operational use may require a commercial license or
> approved project setup. Do not assume free-tier eligibility for
> production use. Always check current Earth Engine terms for commercial
> projects before relying on it in production.

---

## Key Documents

- [CONTEXT.md](CONTEXT.md) — all project decisions (survives `/clear`)
- [issues/prd.md](issues/prd.md) — full Product Requirements Document
- [issues/vertical-slices.md](issues/vertical-slices.md) — 8 vertical slices (tracer bullets)
- [docs/adr/001-stack-choices.md](docs/adr/001-stack-choices.md) — architecture decision record (stack)
- [docs/adr/002-database-choice.md](docs/adr/002-database-choice.md) — DuckDB → PostGIS migration path
- [docs/adr/003-geo-processing.md](docs/adr/003-geo-processing.md) — GEE + Brazilian APIs hybrid model
- [docs/adr/004-mvp-layers.md](docs/adr/004-mvp-layers.md) — 5-layer MVP scope and rationale
- [docs/adr/005-validation-strategy.md](docs/adr/005-validation-strategy.md) — 3-phase go/no-go validation
- [docs/research-findings.md](docs/research-findings.md) — market research & Brazilian data sources
- [docs/competitive-analysis/ospa-place.md](docs/competitive-analysis/ospa-place.md) — main competitor deep-dive
- [.claude/task_plan.md](.claude/task_plan.md) — crash-proof task plan

---

## Source Trust Policy

Every data point in a report must be traceable. Agents and code MUST follow
these rules:

1. **Prefer official public sources** — SICAR, ANA, IBGE, INPE, EMBRAPA,
   municipal open data portals. These are the gold standard.
2. **Use private/commercial sources only as fallback** — when no official
   source exists for a given layer and municipality, commercial/proprietary
   data may be used but MUST be explicitly labeled as such in the report.
3. **Every report must include per-layer metadata**:
   - Data source (name + URL or API endpoint)
   - Date of extraction
   - Confidence level: 🟢 High (official, < 6 months old) / 🟡 Medium
     (official but stale, or derived with known methodology) / 🔴 Low
     (commercial, crowdsourced, or inferred)

4. **Market-price layers require extra caution**:
   - Asking prices are not transaction prices
   - Prefer official transaction data (e.g. ITBI) where available
   - When using listings (Zap, VivaReal, etc.), label them explicitly
     as asking-price proxies, not ground truth

This policy exists because the report will be shared with lawyers and
investors — an incorrect data point attributed to an official source can
damage credibility and create legal exposure.

---

## Skills

This project includes two **core skills** shipped directly in `skills/`. They
are loaded automatically by Claude Code and other compatible agents.

| Skill | Category | Purpose |
|---|---|---|
| `find-skills` | Meta | Discover agent skills from the open ecosystem (skills.sh, npx skills CLI) |
| `security-review-skills` | Security | Security audit for agent skills before installation or activation |

### Required Now (this repository, current phase)

Install these immediately — they are essential for Phase 0 execution:

| Skill | Source | Purpose | Risk |
|---|---|---|---|
| `planning-with-files` | `OthmanAdi/planning-with-files` | Crash-proof file-based planning that survives context loss and `/clear`. Manus-style `task_plan.md` / `findings.md` / `progress.md` pattern. 23K ⭐ | 🟢 LOW |
| `grill-me` | `mattpocock/skills` | Relentlessly interviews the user about plans/designs until every decision branch is resolved. Eliminates the #1 agent failure mode: misalignment. 399K installs | 🟢 LOW |
| `grill-with-docs` | `mattpocock/skills` | Same relentless interview as `grill-me`, but maintains a living `CONTEXT.md` and Architecture Decision Records (ADRs) so decisions survive context loss and `/clear`. Pairs with `planning-with-files` | 🟢 LOW |
| `write-a-prd` | `mattpocock/ai-engineer-workshop-2026-project` | Complements `grill-me`: after being interrogated, documents every decision in a durable PRD at `issues/prd.md`. 5-step process: problem exploration → codebase review → stakeholder interview → module sketching → document generation | 🟢 LOW |
| `prd-to-issues` | `mattpocock/ai-engineer-workshop-2026-project` | Decomposes the PRD into independently-grabbable issues using vertical slices (tracer bullets). Each issue cuts through all integration layers end-to-end — never horizontal slices of a single layer | 🟢 LOW |

### Recommended Later (install before Phase 1 — functional prototype)

Install these when the project enters Phase 1 (data pipeline + frontend work):

| Skill | Source | Purpose | Risk |
|---|---|---|---|
| `tdd` | `mattpocock/skills` | Strict red-green-refactor cycle. Tests public interfaces only — no coupling to internals. Includes anti-pattern reference. 310K installs | 🟢 LOW |
| `improve-codebase-architecture` | `mattpocock/skills` | Scans codebase for architectural deepening opportunities, generates visual HTML report. Anti-entropy for agent-accelerated projects. 328K installs | 🟢 LOW |
| `supply-chain-risk-auditor` | `trailofbits/skills` | Dependency risk assessment from industry-leading security firm. Checks for known vulnerabilities, supply chain attacks, and risky patterns | 🟢 LOW |
| `differential-review` | `trailofbits/skills` | Security-focused PR/diff analysis. Finds vulnerabilities that traditional code review misses | 🟢 LOW |
| `sharp-edges` | `trailofbits/skills` | Lighter complement to `differential-review`. Evaluates whether APIs, configs, and interfaces are resistant to developer misuse — identifies designs where the "easy path" leads to insecurity. 3.9K installs | 🟢 LOW |

### Optional / Domain-Specific

Install only when relevant to the current task:

| Skill | Source | Purpose | When to Use |
|---|---|---|---|
| `frontend-design` | `anthropics/skills` | Production-grade frontend interfaces. Distinctive, non-generic AI aesthetics. 595K installs | Projects with UI |
| `superpowers` | `obra/superpowers` | Complete 7-stage engineering methodology with hard gates (brainstorming → plan → TDD → verify → review). 204K ⭐, 680K+ installs | Teams wanting maximum discipline |
| `spatial` | `duckdb/duckdb-skills` | DuckDB spatial extension patterns. Overture Maps integration for global geodata. Use for spatial queries in prototyping phase | During MVP with DuckDB |
| `mapbox-mcp-runtime-patterns` | `mapbox/mapbox-agent-skills` | Mapbox MCP Server integration patterns for geospatial AI applications. Covers distance, area, isochrones, routing tools | When integrating Mapbox MCP |

### Installing Skills

```bash
# Required Now — always install
npx skills add OthmanAdi/planning-with-files -g -y
npx skills add mattpocock/skills@grill-me -g -y
npx skills add mattpocock/skills@grill-with-docs -g -y
npx skills add mattpocock/ai-engineer-workshop-2026-project@write-a-prd -g -y
npx skills add mattpocock/ai-engineer-workshop-2026-project@prd-to-issues -g -y

# Recommended Later — install before Phase 1
npx skills add mattpocock/skills@tdd -g -y
npx skills add mattpocock/skills@improve-codebase-architecture -g -y
npx skills add trailofbits/skills@supply-chain-risk-auditor -g -y
npx skills add trailofbits/skills@differential-review -g -y
npx skills add trailofbits/skills@sharp-edges -g -y

# Optional — install on demand
npx skills add anthropics/skills@frontend-design -g -y
npx skills add obra/superpowers -g -y
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

---

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

---

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

---

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

---

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

Both agents are **read-only by design** — their instructions direct them to
produce structured findings without modifying code or system state. The main
agent decides what to act on. Note: `Bash` is included for read-only operations
(installing audit dependencies, running static analyzers); agents are
instructed to never use it for destructive writes.

---

## Security Posture

- **Default deny**: No skill is trusted by default — even skills shipped with
  this project were reviewed at time of writing and should be re-reviewed on
  update.
- **Review on install**: Every `npx skills add` must be followed by
  `security-review-skills`.
- **Review on update**: Every `npx skills update` must re-trigger a security
  review.
- **Audit trail**: Maintain a `.claude/skills-audit.json` recording which
  skills have been reviewed, when, and the verdict. Currently 16 skills audited
  (1 rejected — see audit file for details).
- **Principle of least privilege**: When a skill declares `allowed-tools`,
  scope them to the minimum necessary. Prefer path-scoped `Write` over
  unrestricted access.

---

## Conventions

### Project Structure

```
├── CLAUDE.md                    # Agent instructions
├── CONTEXT.md                   # Project decisions (survives /clear)
├── README.md
├── .editorconfig
├── .env.example                 # Environment variable template
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── VERSION
├── package.json                 # Root scripts (dev, build)
├── skills/                      # Agent skills (SKILL.md files)
│   ├── find-skills/
│   └── security-review-skills/
├── .claude/                     # Claude Code configuration
│   ├── settings.json
│   ├── skills-audit.json        # 16 skills audited
│   ├── task_plan.md             # Crash-proof task plan
│   └── agents/
│       ├── security-reviewer/
│       └── code-reviewer/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── src/
│   ├── backend/
│   │   ├── main.py              # FastAPI — GeoJSON validation + /api/analyze
│   │   └── requirements.txt
│   └── frontend/
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── index.html
│       └── src/
│           ├── App.tsx           # Map + polygon drawing + analysis flow
│           ├── AnalysisPanel.tsx # Results dashboard with traffic lights
│           ├── api.ts            # HTTP client for backend
│           ├── types.ts          # TypeScript types
│           ├── main.tsx          # React entry point
│           └── index.css         # Global styles + theme
├── issues/
│   ├── prd.md                   # Product Requirements Document
│   └── vertical-slices.md       # 8 vertical slices (tracer bullets)
├── docs/
│   ├── adr/
│   │   ├── 001-stack-choices.md
│   │   ├── 002-database-choice.md
│   │   ├── 003-geo-processing.md
│   │   ├── 004-mvp-layers.md
│   │   └── 005-validation-strategy.md
│   ├── competitive-analysis/
│   │   └── ospa-place.md
│   ├── research-findings.md
│   ├── mcp-recommendations.md
│   └── spec-driven-development.md
├── scripts/
│   ├── install-recommended-skills.sh
│   └── install-recommended-skills.ps1
└── tests/
    └── .gitkeep
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
