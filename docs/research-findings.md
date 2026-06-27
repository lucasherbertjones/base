# Pesquisa de Mercado e Concorrentes — Geodata

**Data**: 2026-06-27

## Concorrentes Internacionais (referência)

| Ferramenta | Tipo | Cobertura | Diferencial | Limitação |
|---|---|---|---|---|
| [Acres.com](https://www.acres.com) | Comercial | EUA | AI agent para busca de terrenos, valor de terra, 100+ camadas | Só EUA |
| [Transect](https://www.transect.com) | Comercial | EUA | Relatórios ambientais automatizados, KML upload | Só EUA |
| [Land id®](https://id.land) | Comercial | EUA | Mobile-first, contorno, solo, água subterrânea | Só EUA |
| [Imageryst](https://www.imageryst.com) | Comercial | Global (satélite) | 11 camadas, download GeoJSON/CSV | €250/mês, sem dados BR oficiais |
| [AgroEstate](https://incubed.esa.int/portfolio/agroestate/) | Comercial | Europa | Agrícola: clima, solo, precipitação | Só Europa |

## Concorrentes Open Source (referência técnica)

| Projeto | Stack | Cobertura | Diferencial |
|---|---|---|---|
| [Virdis](https://github.com/Thanas-R/Virdis) ⭐141 | React + GEE + Supabase | Global | Dashboard agrícola: NDVI, solo, clima |
| [LandCare-AI](https://github.com/Phitah02/LandCare-AI) | React + FastAPI + GEE | Global | Similar ao Virdis, menos maduro |
| [Environmental Assessment Studio](https://plugins.qgis.org/plugins/environmental_assessment_studio/) | QGIS Plugin + GEE | Global | Relatórios ambientais automatizados |

## Fontes de Dados Brasileiras (mapeamento completo)

### Fáceis (API/downloads diretos)
| Camada | Fonte | Formato | URL |
|---|---|---|---|
| APP/Reserva Legal | SICAR/CAR GeoServer | WFS | `geoserver.car.gov.br/geoserver/wfs` |
| Hidrografia | ANA SNIRH ArcGIS REST | GeoJSON | `portal1.snirh.gov.br/arcgis/rest/services` |
| Precipitação | INPE MERGE | GRIB2/NetCDF | `ftp.cptec.inpe.br/modelos/tempo/MERGE/GPM/DAILY/` |
| Clima (cotações) | INMET | CSV | `portal.inmet.gov.br` |
| Rodovias/Vias | OpenStreetMap (Overture Maps) | Parquet/GeoJSON | `overturemaps.org` |
| Base cartográfica | IBGE PGI | SHP/KML/GeoJSON | `geoftp.ibge.gov.br` |
| Relevo global | SRTM via GEE | raster 30m | `USGS/SRTMGL1_003` |
| Land cover | MapBiomas via GEE | raster 30m | Coleção 9 (1985-2023) |

### Viáveis (requerem processamento)
| Camada | Fonte | Formato | Observação |
|---|---|---|---|
| Solo | Embrapa GeoInfo / BDIA IBGE 1:250.000 / ISRIC SoilGrids 250m | SHP/raster | Licença Embrapa requer contato p/ uso comercial |
| Subsolo/Geologia | CPRM/SGB GeoPortal | SHP/WMS | Disponibilidade varia por região |
| Rede elétrica (distribuição) | ANEEL BDGD | SHP | Inconsistências nos dados brutos |
| Rede elétrica (transmissão) | EPE Webmap | SHP | Download livre |
| Usinas/Geração | ANEEL SIGA | CSV c/ lat/lon | Kaggle |
| Malha municipal | geobr (R) ⭐811 / geodata-br ⭐756 | GeoJSON/SHP | Pacotes prontos |

### Difíceis (fragmentados)
| Camada | Situação | Solução possível |
|---|---|---|
| Valor do m² | Sem base nacional | SP: GeoSampa; POA: Lei 13.842/2024; Outros: scraping Zap/VivaReal |
| Zoneamento | Depende de prefeitura | SP: GeoSampa; Curitiba: IPPUC; POA: dados abertos; Outros: upload manual |

## Pacotes/Bibliotecas Python Relevantes

| Pacote | Função |
|---|---|
| `geopandas` + `shapely` | Operações vetoriais espaciais |
| `rasterio` | Processamento de rasters |
| `earthengine-api` | Google Earth Engine |
| `AgenciBr` | Dados ANA, INMET, MERGE (INPE) unificados |
| `merge-downloader` | Download rasters precipitação INPE c/ recorte GeoJSON |
| `geobr` (R) ⭐811 | Todos shapefiles IBGE |

## Conclusão da Pesquisa

**Não existe ferramenta equivalente no mercado brasileiro.** As ferramentas americanas (Acres, Transect, Land id) validam o modelo de negócio mas não cobrem o Brasil. As ferramentas open source (Virdis, LandCare-AI) cobrem camadas ambientais globais mas não integram fontes oficiais brasileiras e não têm camadas de infraestrutura ou valor de terreno.

**O diferencial do Geodata é a integração de fontes oficiais brasileiras** (SICAR, ANA, ANEEL, INPE, prefeituras) em um único relatório, com semáforo de viabilidade focado em due diligence imobiliária.
