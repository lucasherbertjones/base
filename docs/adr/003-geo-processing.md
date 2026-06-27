# ADR 003 — Processamento Geoespacial

**Status**: Aceito
**Data**: 2026-06-27
**Decisores**: Lucas Jones

## Contexto

O sistema precisa processar camadas geoespaciais de duas naturezas distintas:
dados raster globais (SRTM, MapBiomas) e dados vetoriais de fontes brasileiras
(SICAR, ANA, prefeituras). Cada tipo exige estratégias de processamento
diferentes.

## Decisão

**Google Earth Engine para camadas globais + APIs/downloads locais para fontes
brasileiras (modelo híbrido).**

### Alternativas consideradas

- **100% GEE**: unifica o pipeline, mas nem todas as fontes brasileiras estão
  disponíveis no catálogo do Earth Engine (SICAR, zoneamentos municipais,
  ANEEL).
- **100% local (GeoPandas + rasterio)**: controle total, mas requer download e
  armazenamento de rasters continentais (SRTM Brasil = ~20 GB).
- **100% APIs federais**: cada órgão tem seu próprio protocolo (WFS, WMS,
  ArcGIS REST, FTP), sem padronização.

### Justificativa

- **GEE** processa SRTM, MapBiomas e outros rasters globais na infraestrutura do
  Google, devolvendo apenas o resultado para o polígono do usuário. Sem
  armazenamento local de rasters.
- **APIs/downloads locais** para SICAR (WFS), ANA (WMS), ANEEL (SHP) e
  prefeituras — fontes que não estão no GEE e têm atualização frequente.
- Download de shapes estaduais do SICAR como cache local para evitar
  dependência do GeoServer em produção.

## Consequências

- ✅ Sem armazenamento de rasters continentais
- ✅ Fontes brasileiras oficiais sempre atualizadas
- ⚠️ GEE requer aprovação de conta comercial (1-2 semanas)
- ⚠️ Duas estratégias de erro e retry (GEE vs APIs federais)
- ⚠️ Fallback: baixar SRTM localmente se conta GEE não for aprovada a tempo
