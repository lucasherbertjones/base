# Security Policy

## Reporting a Vulnerability

If you discover a vulnerability in this base project or in a skill it
recommends, please **do not open a public issue**.

Email: `TODO — add your security contact`

Expect a response within 72 hours. Confirmed vulnerabilities will be
addressed within 30 days.

## Scope

This security policy covers:

| In scope | Out of scope |
|---|---|
| Malicious patterns in skills shipped with this base | Vulnerabilities in your project's own code |
| Security flaws in `.claude/settings.json` permissions | Vulnerabilities in third-party dependency libraries |
| Gaps in the `security-review-skills` audit framework | Social engineering attacks |
| Vulnerable install scripts (`scripts/`) | Compromised developer machines |

## Supported Versions

| Version | Supported |
|---|---|
| `0.1.x` (latest) | ✅ |

## Skill Supply Chain

This base ships two locally-audited core skills and **recommends** ecosystem
skills from trusted sources. Every recommended skill has been reviewed with
`security-review-skills` and recorded in `.claude/skills-audit.json`.

**You are responsible for:**
- Re-running `security-review-skills` on each `npx skills update`
- Auditing skills you install beyond the recommended set
- Verifying skill sources haven't been compromised since audit

## Safe Harbor

Security research conducted in good faith on this project is protected under
the project's MIT license. We will not pursue legal action against researchers
who follow responsible disclosure practices.
