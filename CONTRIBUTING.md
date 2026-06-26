# Contributing to base

## What This Project Is

`base` is a reusable foundation for bootstrapping new projects with
agent-first conventions. Contributions should make it **easier, safer, or
faster** to start a new project that uses coding agents.

## Ways to Contribute

### Suggest a Recommended Skill

Found a skill that should be in the recommended set? Open an issue with:

- Skill name and source (`owner/repo@skill`)
- Why it belongs (what gap it fills)
- Security review summary (ran `security-review-skills`? results?)
- GitHub stars, install count, license

### Improve Core Skills

The two core skills (`find-skills`, `security-review-skills`) live in
`skills/`. To improve one:

1. Read the current `SKILL.md`
2. Make your changes — follow the [Agent Skills spec](https://agentskills.io)
3. Run `security-review-skills` on the modified skill
4. Open a PR with before/after comparison

### Add Templates

The `templates/` directory holds project-type skeletons. To add one:

1. Create `templates/<type>/` with at minimum a `CLAUDE.md`
2. Include any files a new project of that type needs
3. Document the template in the PR

### Fix Bugs or Improve Structure

- `.gitignore` missing a common pattern? Add it.
- Install scripts broken? Fix them.
- Security posture weakened? Strengthen it.
- Documentation unclear? Clarify it.

## Conventions

| Area | Rule |
|---|---|
| **Formatting** | 2-space indent, LF line endings, UTF-8 — see `.editorconfig` |
| **Markdown** | All docs in `.md`, fenced code blocks with language |
| **JSON** | 2-space indent, no trailing commas — validated by CI |
| **Security** | Every skill addition must have an audit entry in `.claude/skills-audit.json` |
| **Versioning** | Follow [SemVer](https://semver.org). Update `VERSION` and `CHANGELOG.md` |

## PR Checklist

- [ ] `VERSION` bumped if this changes behavior
- [ ] `CHANGELOG.md` updated
- [ ] New skills have audit entries in `.claude/skills-audit.json`
- [ ] Install scripts updated if skills changed
- [ ] `.claude/skills-audit.json` validates against `skills-audit.schema.json`
- [ ] All links in Markdown files are valid

## Setup

```bash
git clone <this-repo>
cd base
# No build step — this is a template repository
```
