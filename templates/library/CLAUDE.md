# CLAUDE.md — Library / Package

## About This Project

_Brief description of this library._

## API Surface

_What does this library expose? Document the public API here._

## Project Structure

```
├── CLAUDE.md
├── src/
│   ├── index.ts      # Public API entry point
│   └── internal/     # Private implementation
├── tests/
│   └── *.test.ts
├── examples/         # Usage examples
├── docs/
│   └── api/          # API reference
├── package.json
└── tsconfig.json
```

## Skills

| Skill | Purpose |
|---|---|
| `find-skills` | Discover new agent skills |
| `security-review-skills` | Audit skills before installing |
| `tdd` | Strict test-driven development |
| `supply-chain-risk-auditor` | Dependency risk assessment |

## Conventions

- **Public API is sacred** — never break it without a major version bump
- **Test the contract, not the implementation** — tests call `src/index.ts`
  only, never internal files directly
- **Tree-shakeable exports** — named exports, no barrel files
- **Zero dependencies** (or document every one)
- **SemVer strictly enforced**

## Commands

```bash
# Install
npm install

# Test
npm test

# Build
npm run build

# Lint + typecheck
npm run check

# Generate API docs
npm run docs
```
