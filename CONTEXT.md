# CONTEXT.md — Projeto Geodata

> Gerado via grill session em 2026-06-27.
> Este documento sobrevive a `/clear` e mantém o estado das decisões do projeto.

## Visão Geral

**Produto**: Plataforma de due diligence territorial para incorporadoras brasileiras. O usuário seleciona uma área (< 1 km²) em um mapa interativo e recebe, em menos de 30 minutos, um "semáforo de viabilidade" com PDF + dashboard interativo.

**JTBD principal**:
> "Quero saber, em menos de 30 minutos, se esse terreno tem algum impedimento crítico antes de gastar dinheiro com visita técnica, advogado e engenheiro."

## Perfil do Usuário

- **Primário**: Incorporadoras pequenas/médias — gerentes de aquisição de terrenos
- **Secundário** (módulos futuros): Agrônomos, ambientais, setor público

## Escopo do MVP

### Camadas (5 imprescindíveis)

| # | Camada | Fonte Primária | Justificativa |
|---|---|---|---|
| 1 | APP / Reserva Legal | SICAR/CAR (GeoServer WFS) | Deal-breaker jurídico |
| 2 | Zoneamento municipal | Prefeituras (GeoSampa, IPPUC, etc.) + scraping | Define potencial construtivo |
| 3 | Risco de inundação | ANA (WMS manchas) + CEMADEN | Inviabiliza financiamento |
| 4 | Declividade / Topografia | SRTM via GEE (30m) | Restrição legal >30% |
| 5 | Valor do m² na região | GeoSampa, ITBI/IPTU aberto, Zap Imóveis | Viabilidade financeira |

### Fora do MVP (módulos futuros)
- Tipo de solo / resistência (Embrapa, ISRIC SoilGrids)
- Cobertura vegetal detalhada (MapBiomas)
- Hidrografia detalhada (ANA BHO)
- Vias de acesso (OpenStreetMap)
- Rede elétrica (ANEEL BDGD)
- Precipitação histórica (INPE MERGE)
- Áreas contaminadas (CETESB/órgãos estaduais)

## Cobertura Geográfica

**Estratégia**: Fontes federais (cobertura nacional desde o dia 1) + aprofundamento automático onde existirem dados municipais abertos.

- **Cobertura total**: APP, declividade, inundação (fontes federais)
- **Cobertura aprofundada**: Zoneamento e valor do m² onde houver dados abertos (SP, POA, Curitiba, etc.)
- **Fallback**: Onde não houver dado aberto, o relatório indica "dado não disponível para este município" e sugere contato com a prefeitura

## Stack Técnica

| Camada | Protótipo | Produção |
|---|---|---|
| **Frontend** | React + Mapbox GL JS | React + Mapbox GL JS |
| **Backend** | Python FastAPI + GeoPandas | FastAPI + Celery (filas) |
| **Banco** | DuckDB + extensão spatial | PostgreSQL + PostGIS |
| **Geo processing** | GEE (global) + APIs BR (local) | Mesmo + cache de tiles |
| **PDF** | Jinja2 → WeasyPrint | Mesmo |
| **Mapa base** | Mapbox GL JS | Mapbox GL JS |

## Estratégia de Validação (3 fases)

1. **Fase 0** (3–5 dias): Landing page + relatório fake para 3 terrenos reais + anúncio para incorporadoras → medir conversão
2. **Fase 1** (2–4 semanas): Protótipo funcional — 2-3 camadas com dados reais, processo semi-manual, interface mínima de desenho no mapa
3. **Fase 2** (2–3 meses): MVP completo — 5 camadas automatizadas, PDF + dashboard, múltiplas cidades

## Decisões-Chave Registradas

Ver `docs/adr/` para registro detalhado de cada decisão de arquitetura.

| ADR | Decisão | Data |
|---|---|---|
| 001 | Stack: Python/FastAPI/GeoPandas + React/Mapbox | 2026-06-27 |
| 002 | Banco: DuckDB protótipo → PostGIS produção | 2026-06-27 |
| 003 | Geo processing: GEE híbrido + APIs brasileiras | 2026-06-27 |
| 004 | MVP: 5 camadas priorizadas | 2026-06-27 |
| 005 | Estratégia de validação em 3 fases | 2026-06-27 |

## Referências

- [PRD completo](issues/prd.md)
- [ADR 001 — Stack](docs/adr/001-stack-choices.md)
- [Plano de tarefas](.claude/task_plan.md)
- [Pesquisa de mercado e concorrentes](docs/research-findings.md)
