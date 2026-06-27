# PRD: Plataforma de Due Diligence Territorial

**Versão**: 0.1.0 (MVP)
**Data**: 2026-06-27
**Status**: Draft

---

## 1. Problema

Incorporadoras brasileiras gastam de **2 a 4 semanas** e **R$ 5.000 a R$ 20.000** em due diligence territorial para cada terreno avaliado. O processo é manual: visitas técnicas, consultas a múltiplos órgãos (CAR, prefeitura, ANA), contratação de topógrafo e advogado. A maioria dos terrenos avaliados **não é comprada** — o custo da due diligence é perdido.

**Dor principal**: Não existe um filtro rápido e barato que elimine terrenos inviáveis ANTES de gastar com due diligence formal.

**Métrica de sucesso**: Uma incorporadora consegue eliminar 70% dos terrenos inviáveis em 30 minutos, sem sair do escritório, por uma fração do custo atual.

## 2. Solução

Plataforma web onde o usuário:
1. Desenha um polígono no mapa (área < 1 km²)
2. Em < 30 minutos, recebe um **PDF + dashboard interativo** com "semáforo de viabilidade"
3. O relatório cobre 5 camadas críticas, cada uma com status 🟢 Viável / 🟡 Atenção / 🔴 Impedimento

### Proposta de Valor

> "Antes de gastar R$ 15.000 em due diligence formal, gaste R$ 500 em 30 minutos e elimine terrenos inviáveis."

## 3. Usuários e Personas

### Persona Primária: Gerente de Aquisição de Terrenos

- **Nome**: Ricardo
- **Empresa**: Incorporadora de médio porte (5-15 lançamentos/ano)
- **Dor**: Avalia 50+ terrenos/ano. Cada due diligence custa R$ 5K-15K e leva 2-4 semanas. 80% dos terrenos avaliados são descartados.
- **Objetivo**: Filtrar terrenos inviáveis antes de acionar advogado e engenheiro
- **Dispositivo**: Desktop no escritório + celular durante visita ao terreno

## 4. Camadas do MVP (5 imprescindíveis)

### 4.1 APP / Reserva Legal (SICAR/CAR)
- **Fonte**: GeoServer SICAR (`geoserver.car.gov.br/geoserver/wfs`)
- **O que entrega**: % da área com APP/Reserva Legal. Se > 50% da área é APP, 🟢 vira 🔴
- **Semáforo**:
  - 🟢 < 10% de APP na área
  - 🟡 10–30% de APP
  - 🔴 > 30% de APP ou APP de curso d'água cruzando o terreno

### 4.2 Zoneamento Municipal
- **Fonte**: Dados abertos municipais (GeoSampa, IPPUC, etc.) onde disponível; fallback manual
- **O que entrega**: Zona (ex: ZEU, ZR3), coeficiente de aproveitamento, gabarito máximo
- **Semáforo**:
  - 🟢 Zoneamento residencial/comercial compatível com incorporação
  - 🟡 Zoneamento misto ou com restrições moderadas
  - 🔴 Zona rural, industrial ou sem potencial construtivo

### 4.3 Risco de Inundação
- **Fonte**: ANA (manchas de inundação via WMS), CEMADEN, HAND model via SRTM
- **O que entrega**: % da área em mancha de inundação. Histórico de eventos.
- **Semáforo**:
  - 🟢 0% em mancha de inundação
  - 🟡 < 5% em mancha de inundação (margem)
  - 🔴 > 5% em mancha ou histórico de inundação no local

### 4.4 Declividade / Topografia
- **Fonte**: SRTM 30m via Google Earth Engine
- **O que entrega**: Mapa de declividade, % da área com declive > 30%, perfil topográfico
- **Semáforo**:
  - 🟢 < 10% da área com declive > 30%
  - 🟡 10–30% com declive > 30%
  - 🔴 > 30% com declive acentuado

### 4.5 Valor do m² na Região
- **Fonte**: GeoSampa (IPTU/valor venal), ITBI aberto (POA — Lei 13.842/2024), scraping Zap Imóveis/VivaReal
- **O que entrega**: Valor médio do m² no bairro/região, tendência 12m, faixa de preço
- **Semáforo**:
  - 🟢 VGV projetado viável (margem > 20%)
  - 🟡 VGV marginal (margem 0–20%)
  - 🔴 VGV negativo (custo do terreno > valor de venda projetado)

## 5. Jornada do Usuário

```
1. Acessa a plataforma → vê mapa central com busca por endereço
2. Busca endereço ou navega no mapa → centraliza no terreno desejado
3. Desenha polígono sobre o terreno (desenho livre ou CNPJ/endereço do imóvel)
4. Clica "Analisar" → barra de progresso mostra camadas sendo processadas
5. Em < 30 min (alvo: < 5 min para protótipo), dashboard interativo aparece
6. Usuário explora cada camada com toggle liga/desliga
7. Clica "Gerar PDF" → recebe relatório formatado com:
   - Capa com localização e data
   - Sumário executivo (semáforo geral)
   - 5 seções, uma por camada, com mapa + estatísticas + semáforo
   - Checklist final de due diligence
8. Compartilha PDF com sócios/advogado via WhatsApp/email
```

## 6. Funcionalidades

### Fase 0 — Validação (3–5 dias)
- Landing page com explicação do produto
- 3 relatórios fake de terrenos reais
- Formulário de "quero para meu terreno" com coleta de email
- Anúncio direcionado para incorporadoras (LinkedIn/Google Ads)

### Fase 1 — Protótipo Funcional (2–4 semanas)
- [ ] Mapa interativo com Mapbox GL JS + busca de endereço
- [ ] Ferramenta de desenho de polígono (`mapbox-gl-draw`)
- [ ] Integração com 2-3 camadas (APP via SICAR, declividade via SRTM/GEE, inundação via ANA)
- [ ] Dashboard básico mostrando as camadas em toggle
- [ ] Geração de PDF simples (Jinja2 → WeasyPrint)
- [ ] Processo semi-automático (alguns passos manuais aceitáveis)

### Fase 2 — MVP Completo (2–3 meses)
- [ ] Todas as 5 camadas automatizadas
- [ ] Dashboard interativo completo com análise por camada
- [ ] PDF profissional com sumário executivo
- [ ] Cache de resultados (mesmo polígono = resultado instantâneo)
- [ ] Busca por endereço + CEP com geocoding
- [ ] Histórico de relatórios do usuário
- [ ] Autenticação simples (Google OAuth)

## 7. Métricas de Sucesso

### Fase 0
- **Conversão**: > 3% de cliques em "quero para meu terreno"
- **Custo por lead**: < R$ 30

### Fase 1
- **Tempo de geração**: < 30 min (alvo: < 10 min)
- **Precisão dos dados**: > 90% de concordância com due diligence formal (em teste cego)

### Fase 2
- **Disposição a pagar**: > 50% dos usuários do protótipo converteriam para plano pago
- **Receita por relatório**: R$ 200–500
- **Ticket médio mensal (assinatura)**: R$ 1.500–3.000 (5-10 relatórios/mês)

## 8. Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Dados do SICAR desatualizados ou lentos | Alto | Média | Baixar shapefiles por estado e cache local; WFS para consultas pontuais |
| Zoneamento indisponível para maioria das cidades | Alto | Alta | Indicar claramente no relatório; oferecer upload manual de documento da prefeitura |
| GEE conta comercial não aprovada a tempo | Médio | Baixa | Registrar projeto hoje; fallback: baixar SRTM localmente (30 GB) |
| Custo Mapbox excede orçamento | Baixo | Baixa | Free tier suporta 50K loads/mês; upgrade pago só em escala |
| Concorrente lançar algo similar | Médio | Baixa | Vantagem do primeiro movimento + foco em dados brasileiros oficiais |

## 9. Stack Técnica (resumo)

Ver [ADR 001](../docs/adr/001-stack-choices.md) para detalhes e justificativas.

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Mapbox GL JS + `@mapbox/mapbox-gl-draw` |
| Backend API | Python 3.12 + FastAPI |
| Geoespacial | GeoPandas, Shapely, Rasterio, `earthengine-api` |
| Dados brasileiros | AgenciBr (ANA, INMET, MERGE), SICAR (GeoServer WFS), ANEEL (shapefile) |
| Banco (proto) | DuckDB + extensão spatial |
| Banco (prod) | PostgreSQL + PostGIS |
| PDF | Jinja2 + WeasyPrint |
| Cache | Redis |
| Autenticação | Google OAuth (Fase 2) |

## 10. Próximos Passos

1. Criar landing page (Fase 0)
2. Solicitar aprovação de conta GEE comercial
3. Configurar ambiente de desenvolvimento
4. Implementar integração SICAR WFS
5. Implementar integração SRTM via GEE
6. Construir frontend com desenho de polígono
7. Gerar primeiro relatório com dados reais
