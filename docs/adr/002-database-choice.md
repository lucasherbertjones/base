# ADR 002 — Banco de Dados

**Status**: Aceito
**Data**: 2026-06-27
**Decisores**: Lucas Jones

## Contexto

Precisamos armazenar e consultar dados geoespaciais (vetoriais e raster)
resultantes do cruzamento de polígonos do usuário com fontes federais (SICAR,
ANA, SRTM). O volume inicial é baixo (< 100 análises/dia), mas crescerá com a
base de usuários.

## Decisão

**DuckDB + spatial extension no MVP → PostgreSQL + PostGIS em produção.**

### Alternativas consideradas

- **PostGIS desde o início**: robusto e escalável, mas adiciona complexidade de
  infraestrutura (servidor, backups, migrations) que atrasa o protótipo em 1-2
  semanas.
- **SQLite + SpatiaLite**: viável, mas o ecossistema Python é menos maduro que
  DuckDB para GeoParquet e queries analíticas.
- **MongoDB**: sem suporte nativo a operações espaciais complexas (interseção,
  área, buffer).

### Justificativa

- **DuckDB**: zero infraestrutura (single binary, embedded), lê GeoParquet
  nativamente, queries espaciais com performance comparável a PostGIS para
  datasets < 10 GB. Ideal para validação rápida.
- **PostGIS**: índices GIST, suporte a múltiplos usuários concorrentes,
  connection pooling, e ecossistema maduro de ferramentas (pgAdmin, pg_tileserv).
  Necessário quando o produto escalar.

## Consequências

- ✅ Prototipagem sem provisionar servidor de banco
- ✅ DuckDB lê dados direto do SICAR em GeoParquet sem ETL
- ⚠️ Migração DuckDB → PostGIS exigirá rewrite das queries espaciais
- ⚠️ Schema inicial deve ser projetado pensando na migração futura
