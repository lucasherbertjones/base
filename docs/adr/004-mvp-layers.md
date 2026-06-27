# ADR 004 — Camadas do MVP

**Status**: Aceito
**Data**: 2026-06-27
**Decisores**: Lucas Jones

## Contexto

Mapeamos 12+ fontes de dados geoespaciais brasileiras relevantes para due
diligence territorial. Precisamos selecionar um subconjunto para o MVP que
entregue 80% do valor com 20% do esforço de integração.

## Decisão

**MVP com 5 camadas, ordenadas por prioridade:**

| # | Camada | Fonte | Justificativa |
|---|--------|-------|---------------|
| 1 | APP / Reserva Legal | SICAR/CAR (GeoServer WFS) | Deal-breaker jurídico — se >30% da área for APP, o terreno é inviável |
| 2 | Risco de inundação | ANA / CEMADEN WMS | Inviabiliza financiamento bancário |
| 3 | Declividade | SRTM 30m via GEE | Restrição legal >30% de declive |
| 4 | Zoneamento municipal | GeoSampa, IPPUC, open data | Define potencial construtivo (coeficiente, gabarito) |
| 5 | Valor do m² | ITBI, Zap/VivaReal | Viabilidade financeira do negócio |

### Fora do MVP (módulos futuros)

- Tipo de solo / resistência (Embrapa, ISRIC SoilGrids)
- Cobertura vegetal detalhada (MapBiomas)
- Hidrografia detalhada (ANA BHO)
- Vias de acesso (OpenStreetMap)
- Rede elétrica (ANEEL BDGD)
- Precipitação histórica (INPE MERGE)
- Áreas contaminadas (CETESB/órgãos estaduais)

### Critérios de seleção

1. **Cobertura nacional**: prioridade para fontes federais (SICAR, ANA, SRTM)
   sobre municipais
2. **Impacto no negócio**: camadas que podem inviabilizar o terreno > camadas
   informativas
3. **Facilidade de integração**: APIs/downloads diretos > scraping > upload
   manual

## Consequências

- ✅ Cobertura nacional desde o dia 1 (camadas 1-3)
- ✅ Aprofundamento automático onde existirem dados municipais (camadas 4-5)
- ⚠️ Zoneamento e valor do m² têm cobertura parcial — fallback: "dado não
  disponível para este município"
- ⚠️ Usuários podem esperar mais camadas (solo, vegetação) — comunicar
  claramente o escopo MVP
