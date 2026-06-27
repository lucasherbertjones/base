# Recommended MCP Servers

This project recommends two [MCP (Model Context Protocol)](https://modelcontextprotocol.io)
servers that are **universally useful** across virtually any project type.

MCP servers give Claude Code access to external tools and data sources. Each
server below requires a one-time setup per project.

## Quick Setup

```bash
# Context7 — up-to-date library documentation
claude mcp add context7 -- npx -y @upstash/context7-mcp

# GitHub — PRs, issues, and repo operations
claude mcp add github -- npx -y @anthropic/mcp-github
```

After adding, restart Claude Code or run `/mcp` to verify the servers are
connected.

---

## 1. Context7 — Library Documentation

**Why**: LLMs are trained on snapshots of documentation that are often months
out of date. Context7 gives Claude real-time access to the latest docs for any
library your project uses. This prevents the agent from hallucinating APIs that
don't exist, using deprecated patterns, or missing new features.

**Works with**: React, Next.js, Express, PyTorch, Tailwind, Prisma, Supabase,
and [thousands more](https://context7.com/libraries).

### Setup

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp
```

No API key required for public libraries. For private/enterprise docs, get a key
at [context7.com](https://context7.com).

### Usage

Once connected, Claude automatically queries Context7 when it needs library
documentation. You can also ask explicitly:

> "Check the latest React Server Components docs via Context7 before implementing"

### Configuration

By default, Context7 resolves libraries automatically from your project's
`package.json`, `requirements.txt`, or equivalent. To pin specific libraries,
configure the server in `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_LIBRARIES": "react,next.js,tailwindcss,prisma"
      }
    }
  }
}
```

---

## 2. GitHub MCP — Repo Operations

**Why**: Managing PRs, issues, releases, and CI directly from Claude eliminates
context-switching. The agent can create branches, open PRs, check CI status, and
respond to issues without leaving the conversation.

**Works with**: github.com (GitHub Enterprise Server supported via `GITHUB_HOST`
env var).

### Setup

```bash
claude mcp add github -- npx -y @anthropic/mcp-github
```

Requires a [GitHub Personal Access Token](https://github.com/settings/tokens)
with appropriate scopes:

| Scope | Needed For |
|---|---|
| `repo` | Private repos, pushing branches, creating PRs |
| `read:org` | Organization-level operations |
| `workflow` | Triggering/checking CI workflows |

Set the token as an environment variable:

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_..."
```

Or configure it in `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Usage Examples

- "Create a PR for this branch with a summary of changes"
- "Check if CI is green on main"
- "Find open issues labeled 'bug' and prioritize them"
- "Review PR #42 and post inline comments"

---

## Optional: Playwright MCP

For **web projects**, the Playwright MCP enables browser automation directly
from Claude — screenshots, end-to-end tests, visual verification.

```bash
claude mcp add playwright -- npx -y @anthropic/mcp-playwright
```

Not recommended as a default for all projects, but strongly recommended for any
project with a UI.

---

## Verifying MCPs

After setup, verify your MCP servers are connected:

```bash
claude mcp list
```

Or in Claude Code, run `/mcp` to see the status panel.

## Security Note

MCP servers run with the same permissions as Claude Code. Each server is a
third-party process — apply the same scrutiny as you would to a skill:

1. Prefer official or widely-trusted MCPs (Anthropic, Upstash, etc.)
2. Review what each MCP can access (filesystem, network, etc.)
3. Scope GitHub tokens to the minimum necessary permissions
4. Never commit tokens or `.claude/mcp.json` with embedded secrets
