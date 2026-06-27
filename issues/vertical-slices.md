# Vertical Slices — Geodata MVP

> Decomposto do [PRD](prd.md) em 2026-06-27.
> Cada slice é uma feature independente que corta **todas** as camadas da stack
> (frontend → API → processamento geo → dados → PDF), entregando valor real ao
> usuário final.

---

## Slice 1: "Desenhar no Mapa" 🔴 CRÍTICO — Fase 1, Semana 1

**O usuário pode buscar um endereço e desenhar um polígono em um mapa interativo.**

```
Frontend: React + Mapbox GL JS + mapbox-gl-draw + geocoding
   ↓
Backend: FastAPI endpoint POST /api/analyze (recebe GeoJSON do polígono)
   ↓
Geo: Validação do polígono (área < 1 km², CRS correto, sem auto-interseção)
   ↓
Resposta: GeoJSON validado + bounding box + área calculada
   ↓
Frontend: Exibe área calculada, centraliza o mapa no polígono
```

**Critério de aceitação**:
- [ ] Mapa carrega centralizado no Brasil
- [ ] Busca por endereço funciona (geocoding)
- [ ] Usuário desenha polígono livre com clique dos vértices
- [ ] Área do polígono é calculada e exibida em m² e hectares
- [ ] Polígono é validado (sem auto-interseção, área > 0, < 1 km²)

---

## Slice 2: "Relatório APP/Reserva Legal" 🔴 CRÍTICO — Fase 1, Semana 1-2

**Dado um polígono, o sistema consulta o SICAR/CAR e retorna % de APP e Reserva Legal na área.**

```
Frontend: Botão "Analisar APP" após desenho do polígono
   ↓
Backend: POST /api/analyze/app — recebe polígono GeoJSON
   ↓
Geo: WFS query no GeoServer SICAR (geoserver.car.gov.br)
     → filtra imóveis rurais que intersectam o polígono
     → calcula área de interseção com camadas APP, Reserva Legal, Hidrografia
   ↓
Banco: DuckDB — armazena resultado da query em cache (GeoParquet)
   ↓
Resposta: JSON com % APP, % Reserva Legal, área total intersectada
   ↓
Frontend: Dashboard mostra mapa com APP sobreposto + semáforo (🟢🟡🔴)
   ↓
PDF: Seção "APP e Reserva Legal" no relatório
```

**Critério de aceitação**:
- [ ] Consulta WFS ao GeoServer SICAR retorna dados para o estado do polígono
- [ ] Interseção espacial calcula % da área com APP
- [ ] Semáforo aplica regras: < 10% = 🟢, 10-30% = 🟡, > 30% = 🔴
- [ ] Mapa mostra camada APP sobreposta ao polígono do usuário
- [ ] PDF inclui mapa + estatísticas + semáforo

---

## Slice 3: "Relatório de Declividade" 🔴 CRÍTICO — Fase 1, Semana 2

**Dado um polígono, o sistema consulta SRTM via GEE e retorna análise de declividade.**

```
Frontend: Botão "Analisar Declividade" (ou parte do fluxo "Analisar Tudo")
   ↓
Backend: POST /api/analyze/slope — recebe polígono GeoJSON
   ↓
Geo: GEE (earthengine-api) — carrega SRTM 30m (USGS/SRTMGL1_003)
     → calcula slope (ee.Terrain.slope)
     → reduz para estatísticas zonais dentro do polígono (média, max, histograma)
     → classifica: 0-15%, 15-30%, 30-45%, >45%
   ↓
Resposta: JSON com % por classe de declive, mapa de calor base64 PNG
   ↓
Frontend: Dashboard mostra mapa de calor de declividade + semáforo
   ↓
PDF: Seção "Declividade e Topografia" no relatório
```

**Critério de aceitação**:
- [ ] GEE retorna estatísticas de slope para o polígono em < 10s
- [ ] Classificação em 4 faixas de declive
- [ ] Semáforo: < 10% da área > 30% = 🟢, 10-30% = 🟡, > 30% = 🔴
- [ ] Mapa de calor (raster tile) sobreposto ao polígono
- [ ] PDF inclui mapa de declividade + tabela de classes

---

## Slice 4: "Relatório de Risco de Inundação" 🟠 ALTA — Fase 1, Semana 2-3

**Dado um polígono, o sistema consulta ANA WMS e retorna análise de risco de inundação.**

```
Frontend: Integrado ao fluxo "Analisar Tudo"
   ↓
Backend: POST /api/analyze/flood — recebe polígono GeoJSON
   ↓
Geo: ANA WMS (portal1.snirh.gov.br/arcgis/services) — manchas de inundação
     + HAND model (Height Above Nearest Drainage) via SRTM
     → calcula % da área em mancha e % com HAND < 1m (área alagável)
   ↓
Resposta: JSON com % em mancha de inundação, % HAND baixo, classificação
   ↓
Frontend: Dashboard mostra mancha de inundação + semáforo
   ↓
PDF: Seção "Risco de Inundação" no relatório
```

**Critério de aceitação**:
- [ ] Consulta ANA retorna dados de mancha de inundação (ou fallback HAND)
- [ ] Semáforo: 0% = 🟢, < 5% = 🟡, > 5% = 🔴
- [ ] PDF combina declividade + inundação em um mapa de risco hídrico

---

## Slice 5: "Relatório de Zoneamento" 🟡 MÉDIA — Fase 2, Semana 1-2

**Dado um polígono, o sistema consulta dados de zoneamento municipal (onde disponível) e retorna parâmetros construtivos.**

```
Frontend: Campo "Município" preenchido automaticamente via geocoding reverso
   ↓
Backend: POST /api/analyze/zoning — recebe polígono + município
   ↓
Geo: Consulta base de zoneamento municipal
     → Se SP: GeoSampa WFS (camada zoneamento)
     → Se POA: dados abertos POA
     → Se outros: indica "dado não disponível" + sugere upload manual
     → retorna: zona, coeficiente de aproveitamento, gabarito, taxa de ocupação
   ↓
Resposta: JSON com parâmetros de zoneamento + link para legislação
   ↓
Frontend: Dashboard mostra zona + parâmetros + link
   ↓
PDF: Seção "Zoneamento Municipal" no relatório
```

**Critério de aceitação**:
- [ ] Geocoding reverso identifica município automaticamente
- [ ] Para SP: consulta GeoSampa retorna zona e parâmetros
- [ ] Para outras cidades: indica "dado não disponível" + instruções
- [ ] Semáforo baseado na zona (residencial = 🟢, industrial/rural = 🔴)

---

## Slice 6: "Relatório de Valor do m²" 🟡 MÉDIA — Fase 2, Semana 2-3

**Dado um polígono, o sistema retorna valor médio do m² na região.**

```
Frontend: Integrado ao fluxo "Analisar Tudo"
   ↓
Backend: POST /api/analyze/landvalue — recebe polígono + município + bairro
   ↓
Dados: Múltiplas fontes em paralelo:
     → GeoSampa (valor venal IPTU por quadra) — se SP
     → ITBI Porto Alegre (Lei 13.842/2024) — dados abertos de transações
     → Zap Imóveis / VivaReal (scraping de anúncios na região)
     → FIPE (índice por bairro) — se disponível
     → Interpolação: média ponderada por distância
   ↓
Resposta: JSON com valor médio/m², faixa (min-max), tendência 12m, N amostras
   ↓
Frontend: Dashboard mostra valor/m² + mapa de calor de preços na região
   ↓
PDF: Seção "Valor do m² e Viabilidade Financeira"
```

**Critério de aceitação**:
- [ ] Para SP e POA: valor real baseado em dados oficiais
- [ ] Para outras cidades: scraping de portais imobiliários
- [ ] Semáforo: VGV projetado com margem > 20% = 🟢
- [ ] Exibe N amostras usadas e faixa de confiança

---

## Slice 7: "Geração de PDF Consolidado" 🔴 CRÍTICO — Fase 1, Semana 3

**O sistema gera um PDF profissional com todas as camadas analisadas.**

```
Frontend: Botão "Gerar Relatório PDF"
   ↓
Backend: POST /api/report/pdf — recebe ID da análise + opções
   ↓
Template: Jinja2 renderiza HTML com:
     → Capa: endereço, coordenadas, data, área
     → Sumário executivo: tabela de semáforos
     → 5 seções (uma por camada): mapa + estatísticas + interpretação
     → Checklist final
   ↓
PDF: WeasyPrint converte HTML → PDF (com mapas como imagens embedadas)
   ↓
Resposta: PDF binário para download
   ↓
Frontend: Download automático + link para compartilhar
```

**Critério de aceitação**:
- [ ] PDF gerado em < 30s para análise com 3+ camadas
- [ ] Capa com localização e data
- [ ] Sumário executivo com tabela de semáforos (5 linhas)
- [ ] Cada seção inclui mapa (imagem), estatísticas e semáforo
- [ ] Checklist final acionável
- [ ] PDF < 10 MB (otimização de imagens)
- [ ] Funciona em mobile (leitura)

---

## Slice 8: "Autenticação e Histórico" 🟢 BAIXA — Fase 2, Semana 3-4

**Usuário faz login e acessa histórico de relatórios anteriores.**

```
Frontend: Google OAuth → botão "Entrar com Google"
   ↓
Backend: Autenticação JWT, endpoint /api/auth/google
   ↓
Banco: Tabela users + relatórios (PostGIS, com geometria do polígono)
   ↓
Frontend: Página "Meus Relatórios" com lista + mini-mapa
```

**Critério de aceitação**:
- [ ] Login com Google funciona
- [ ] Histórico mostra todos os relatórios do usuário
- [ ] Relatório pode ser reaberto (dashboard) ou rebaixado (PDF)

---

## Ordem de Implementação Recomendada

```
Semana 1:  Slice 1 (Mapa) + Slice 2 (APP/SICAR)
Semana 2:  Slice 3 (Declividade/GEE) + Slice 4 (Inundação)
Semana 3:  Slice 7 (PDF Consolidado)
           → PROTÓTIPO FUNCIONAL PRONTO PARA TESTE ←
Semana 4:  Slice 5 (Zoneamento) + Slice 6 (Valor m²)
Semana 5-6: Slice 8 (Autenticação) + Polimento + Testes com incorporadoras
           → MVP PRONTO PARA LANÇAMENTO ←
```

## Dependências entre Slices

```
Slice 1 (Mapa)
  ├── Slice 2 (APP) ──────┐
  ├── Slice 3 (Declividade) ├── Slice 7 (PDF) ──► PROTÓTIPO
  └── Slice 4 (Inundação) ─┘
        │
        ├── Slice 5 (Zoneamento) ──┐
        └── Slice 6 (Valor m²)  ──┼── Slice 8 (Auth) ──► MVP
                                   └── Slice 7 (atualizado)
```
