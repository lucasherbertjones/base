# ADR 005 — Estratégia de Validação

**Status**: Aceito
**Data**: 2026-06-27
**Decisores**: Lucas Jones

## Contexto

Antes de investir 2-3 meses no desenvolvimento do MVP completo, precisamos
validar se incorporadoras pequenas/médias realmente pagariam por um relatório
automatizado de due diligence territorial. O risco é construir algo que o
mercado não quer.

## Decisão

**Validação em 3 fases progressivas, com critérios de go/no-go entre cada uma.**

### Fase 0 — Smoke Test (3–5 dias)

Landing page + 3 relatórios fake para terrenos reais em SP + anúncio para
incorporadoras. **Objetivo**: medir intenção de compra antes de escrever
código.

- Critério de sucesso: conversão > 3% no formulário, CPL < R$ 30
- Go/no-go: pelo menos 5 incorporadoras demonstram interesse real

### Fase 1 — Protótipo Funcional (2–4 semanas)

2-3 camadas com dados reais, processo semi-manual, interface mínima de desenho
no mapa. **Objetivo**: validar que o produto funciona tecnicamente e entrega
valor.

- Critério de sucesso: 2-3 incorporadoras usam e pagam pelo protótipo
- Go/no-go: feedback positivo + disposição a pagar confirmada

### Fase 2 — MVP Completo (2–3 meses)

5 camadas automatizadas, PDF + dashboard, múltiplas cidades.
**Objetivo**: produto pronto para escala.

### Alternativas consideradas

- **Construir MVP direto (skip Fase 0)**: mais rápido tecnicamente, mas alto
  risco de mercado. Se ninguém comprar, desperdiçamos 2-3 meses.
- **Fase 0 com produto fake interativo**: mais convincente que landing page,
  mas 2-3x mais esforço. Landing page é suficiente para medir intenção real.

## Consequências

- ✅ Validação de mercado antes do investimento pesado em engenharia
- ✅ Critérios quantitativos de go/no-go evitam viés de otimismo
- ⚠️ Fase 0 adiciona 3-5 dias ao cronograma total
- ⚠️ Risco de falsos positivos na Fase 0 (interesse ≠ compra)
