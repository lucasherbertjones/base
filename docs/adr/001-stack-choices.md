# ADR 001 — Stack Técnica

**Status**: Aceito
**Data**: 2026-06-27
**Decisores**: Lucas Jones

## Contexto

Precisamos de uma stack técnica para construir uma plataforma de due diligence territorial. O sistema recebe um polígono desenhado pelo usuário no mapa, processa múltiplas camadas geoespaciais (vetoriais e raster), cruza com dados de fontes brasileiras (SICAR, ANA, ANEEL, prefeituras) e gera um relatório PDF + dashboard interativo em < 30 minutos.

## Decisão

### Frontend: React + Mapbox GL JS

**Alternativas consideradas**:
- Leaflet + OpenStreetMap: 100% open source, sem custo, mas performance limitada em mobile com múltiplas camadas sobrepostas
- Google Maps: familiar, mas custo de API mais alto e menos controle sobre estilos
- Streamlit + Folium: prototipagem rápida, mas não escala para produto

**Justificativa**: Mapbox GL JS é o padrão da indústria para produtos geo profissionais. Suporte nativo a:
- Camadas vetoriais (GeoJSON, WMS, WFS)
- Desenho de polígono via `@mapbox/mapbox-gl-draw`
- Raster tiles com blend modes (crítico para declividade e manchas de inundação)
- Performance em mobile (diretores de aquisição usam no terreno)
- Custo só se torna relevante acima de 50.000 map loads/mês

### Backend: Python + FastAPI + GeoPandas

**Alternativas consideradas**:
- Node.js + Turf.js: ecossistema geoespacial imaturo, quebra com raster e arquivos pesados
- Híbrido Python + Node.js: complexidade desnecessária para MVP

**Justificativa**: O ecossistema Python geoespacial é imbatível para este domínio:
- `geopandas` + `shapely` para operações vetoriais (interseção, área, buffer)
- `rasterio` para processamento de DEM/SRTM
- `earthengine-api` para integração com Google Earth Engine
- `AgenciBr` unifica acesso a ANA, INMET, MERGE (INPE)
- FastAPI serve como API web com performance comparável a Node.js

### Banco: DuckDB (protótipo) → PostgreSQL + PostGIS (produção)

**Justificativa**:
- DuckDB + spatial: zero infra, lê GeoParquet nativamente, queries espaciais rápidas. Ideal para validação rápida
- PostGIS: índices GIST, múltiplos usuários concorrentes, connection pooling. Necessário em produção

### Google Earth Engine: Híbrido

- **GEE para camadas globais**: SRTM (declividade), MapBiomas (cobertura vegetal). Processa na infraestrutura do Google, devolve só o resultado para o polígono
- **APIs brasileiras para camadas locais**: SICAR, ANA, ANEEL, prefeituras
- **Risco**: Conta GEE comercial requer aprovação (1-2 semanas). Registrar o projeto agora.

## Consequências

- ✅ Stack unificada em Python reduz complexidade
- ✅ DuckDB permite prototipagem sem infraestrutura de banco
- ⚠️ Migração DuckDB → PostGIS exigirá rewrite das queries espaciais
- ⚠️ Mapbox requer API key; custo mensal após 50K loads
- ⚠️ GEE requer aprovação de conta comercial antes do lançamento
