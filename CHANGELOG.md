# Changelog

All notable changes to the base project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versioning follows [SemVer](https://semver.org/).

## [0.1.0] — 2026-06-26

### Added

- **Core skills**: `find-skills` (skill discovery) and `security-review-skills`
  (6-dimension security audit for agent skills)
- **CLAUDE.md** with agent instructions, security posture, and conventions
- **Recommended ecosystem skills** curated set:
  - Core workflow: `planning-with-files`, `grill-me`, `write-a-prd`, `prd-to-issues`
  - Code quality: `tdd`, `improve-codebase-architecture`
  - Security: `supply-chain-risk-auditor`, `differential-review`, `sharp-edges`
  - Optional: `frontend-design`, `superpowers`
- **`.claude/settings.json`** with permissions, hooks, and skill auto-loading
- **`.claude/skills-audit.json`** with security review trail for all skills
- **`.claude/skills-audit.schema.json`** JSON Schema for audit file validation
- **Install scripts** for Unix (`install-recommended-skills.sh`) and Windows
  (`install-recommended-skills.ps1`)
- **`.gitignore`** covering Node, Python, OS files, secrets, and Claude Code
  runtime artifacts
- **`.editorconfig`** with universal formatting rules
- **`SECURITY.md`** with vulnerability reporting and scope
- **`CONTRIBUTING.md`** with contribution guidelines
- **`.vscode/`** workspace settings and recommended extensions
- **`templates/`** directory with project-type skeletons
- **`.github/workflows/ci.yml`** validating JSON, Markdown links, and audit file
- **LICENSE** (MIT)
