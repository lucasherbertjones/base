# Spec-Driven Development (SDD)

> **Define o que construir — e o que NÃO construir — antes de escrever uma
> linha de código.**

Spec-Driven Development é um paradigma que inverte o fluxo tradicional: em vez
de começar pelo código e descobrir os requisitos no caminho, você começa pelas
perguntas difíceis. A especificação vira o artefato central, e o agente de IA
executa a implementação guiado por ela.

---

## O fluxo que este projeto já cobre

O base já recomenda um pipeline completo de definição de escopo via skills.
Nenhum código deveria ser escrito antes de passar por ele:

```
grill-me          →  write-a-prd    →  prd-to-issues   →  implementar
(entrevista          (documenta no     (decompõe em        (codifica guiado
implacável)          issues/prd.md)    fatias verticais)    pela spec)
```

| Etapa | Skill | O que produz |
|-------|-------|-------------|
| **1. Interrogação** | `grill-me` + `grill-with-docs` | Decisões de design resolvidas, `CONTEXT.md`, ADRs |
| **2. Documentação** | `write-a-prd` | PRD completo em `issues/prd.md` com escopo, riscos, e critérios de aceitação |
| **3. Decomposição** | `prd-to-issues` | Issues independentes (fatias verticais), cada uma cortando todas as camadas |

Esse fluxo é **suficiente para a maioria dos projetos**. As ferramentas abaixo
são para quem quer ir além.

---

## Ferramentas SDD (opcionais)

Quando o projeto cresce ou o time precisa de mais estrutura, duas ferramentas
se destacam no ecossistema:

### OpenSpec ([Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec))

| Atributo | Valor |
|----------|-------|
| ⭐ Stars | ~55,000 |
| 🎯 Foco | **Brownfield-first** — modificar sistemas existentes |
| 📦 Instalação | `npx @fission-ai/openspec init` |
| 🔑 API Keys | **Não precisa** |
| 📁 Estrutura | `openspec/specs/` + `openspec/changes/` (Markdown) |
| 🔌 Integração | 25+ agentes (Claude Code, Cursor, Copilot, etc.) |

**Ideal quando:**
- O projeto já tem código e você quer documentá-lo como especificação viva
- Várias features tocam as mesmas specs e você precisa rastrear o impacto
- Você quer specs versionadas no Git como fonte da verdade

**Fluxo:** `/opsx:propose` → `/opsx:apply` → `/opsx:archive`

### Spec-Kit ([github/spec-kit](https://github.com/github/spec-kit))

| Atributo | Valor |
|----------|-------|
| ⭐ Stars | ~40,000 |
| 🎯 Foco | **Greenfield-first** — projetos novos (0→1) |
| 📦 Instalação | `npx spec-kit init` |
| 🔑 API Keys | Depende do agente |
| 📁 Estrutura | `.github/specs/` com 4 fases |
| 🔌 Integração | Copilot, Claude Code, Gemini CLI, +15 agentes |

**Ideal quando:**
- Projeto greenfield com stack técnica já definida
- Você quer um workflow opinativo e estruturado (Specify → Plan → Tasks → Implement)
- O time usa GitHub Actions e quer integração nativa com o ecossistema GitHub

**Fluxo:** `/specify` → `/plan` → `/tasks` → `/implement`

### Comparativo rápido

| Critério | OpenSpec | Spec-Kit |
|----------|----------|----------|
| Melhor para | Sistemas existentes | Projetos novos |
| Peso | Leve (só Markdown) | Médio (CLI + templates) |
| API Keys | Não | Depende |
| Filosofia | Spec como documento vivo | Spec como contrato antes do código |
| Curva de aprendizado | Baixa | Média |

---

## Product Discovery (pré-especificação)

Antes mesmo de escrever uma spec, às vezes você precisa **descobrir** o que
construir. O [claude-code-discover](https://github.com/shinpr/claude-code-discover)
(plugin para Claude Code) cobre essa etapa:

```
Vision & Personas → Oportunidades → Blueprint → Hipóteses → Validação → PRD
```

Cada etapa é um comando slash (`/discover:recipe-vision`, etc.) que faz
perguntas estruturadas. O PRD final inclui:

- Histórias de usuário com tabela de confiança (4 riscos cada)
- Premissas **não validadas** (o que ainda é incerto)
- Decisões **rejeitadas e por quê** (tão importante quanto o que foi escolhido)

> **Nota**: O plugin tem 6 ⭐ — é jovem. Seu companion
> [claude-code-workflows](https://github.com/shinpr/claude-code-workflows)
> (318 ⭐) é mais maduro e cobre a fase de implementação.

---

## Como escolher

```
Precisa descobrir O QUE construir?
  └─ Sim → grill-me + write-a-prd (já recomendados)
            Opcional: claude-code-discover para discovery estruturado

Já sabe o que construir, quer estrutura formal?
  └─ Projeto novo (0→1) → Spec-Kit
     Projeto existente (1→n) → OpenSpec
     Ambos → OpenSpec (mais flexível, funciona nos dois cenários)

Time grande, precisa de rastreabilidade?
  └─ OpenSpec (specs versionadas no Git, revisão por PR)
```

---

## Instalação rápida

```bash
# OpenSpec
npx @fission-ai/openspec init

# Spec-Kit
npx spec-kit init

# Claude Code Discover (plugin)
git clone https://github.com/shinpr/claude-code-discover.git .claude/plugins/discover
```

> **Princípio**: Instale **uma** dessas ferramentas, não todas. O pipeline de
> skills do base (grill-me → write-a-prd → prd-to-issues) já resolve 80% dos
> casos. Adicione OpenSpec ou Spec-Kit só quando o projeto exigir o nível de
> formalidade que elas oferecem.

---

## Leitura adicional

- [Awesome SDD](https://github.com/aabs/awesome-specification-driven-development) — lista curada de recursos
- [GitHub Blog: Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [OpenSpec: YC Launch](https://www.ycombinator.com/launches/Pdc-openspec-the-spec-framework-for-coding-agents)
- [Kiro (Amazon) — Requirements → Design → Tasks](https://github.com/jasonkneen/kiro) (685 ⭐)
