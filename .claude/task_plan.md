# Task Plan — Geodata

**Plano crash-proof para desenvolvimento do MVP
Gerado: 2026-06-27 | Atualizado: 2026-06-27

---

## Fase 0: Validação de Mercado (3–5 dias)

### Tarefas
- [ ] Criar landing page com proposta de valor clara
- [ ] Gerar 3 relatórios fake para terrenos reais em SP
- [ ] Formulário "Quero para meu terreno" com email
- [ ] Rodar anúncio LinkedIn + Google Ads para incorporadoras
- [ ] Medir: CPL, taxa de conversão, feedback qualitativo

### Critério de sucesso
- Conversão > 3% no formulário
- Custo por lead < R$ 30
- Pelo menos 5 incorporadoras demonstram interesse real

---

## Fase 1: Protótipo Funcional (2–4 semanas)

### Semana 1: Fundação + APP
- [ ] Configurar ambiente dev (Python 3.12, React 18, DuckDB)
- [ ] Slice 1: Mapa interativo com Mapbox GL JS + desenho de polígono
- [ ] Slice 2: Integração SICAR/CAR — consulta APP por polígono
- [ ] PostGIS: schema inicial para cache de análises

### Semana 2: Declividade + Inundação
- [ ] Slice 3: Integração GEE — SRTM declividade
- [ ] Slice 4: Integração ANA — manchas de inundação (ou HAND)
- [ ] Dashboard com toggle de camadas

### Semana 3: PDF + Teste
- [ ] Slice 7: Geração de PDF com WeasyPrint
- [ ] Teste com 5 terrenos reais em SP
- [ ] Coletar feedback de 2-3 incorporadoras

---

## Fase 2: MVP Completo (2–3 meses)

### Semana 4: Zoneamento + Cache
- [ ] Slice 5: Integração zoneamento (GeoSampa + POA)
- [ ] Cache Redis para consultas repetidas

### Semana 5: Valor m²
- [ ] Slice 6: Integração múltiplas fontes de valor
- [ ] Scraping Zap/VivaReal com fallback

### Semana 6: Auth + Polimento
- [ ] Slice 8: Google OAuth + histórico
- [ ] Testes de carga e performance
- [ ] Documentação de API

---

## Dependências

```
Mapa (S1) ──► APP (S2) ──┐
Mapa (S1) ──► Decliv (S3) ├──► PDF (S7) ──► PROTÓTIPO
Mapa (S1) ──► Inund (S4) ─┘
                              │
                    Zoneam (S5) ──┐
                    Valor (S6) ───┼──► Auth (S8) ──► MVP
                    PDF (S7)  ────┘
```

## Blockers

| Blocker | Impacto | Resolução |
|---|---|---|
| Conta GEE comercial não aprovada | Bloqueia Slice 3 | Registrar hoje; fallback: baixar SRTM local |
| GeoServer SICAR lento/instável | Bloqueia Slice 2 | Baixar shapefile estadual e cache local |
| Mapbox API key não obtida | Bloqueia Slice 1 | Criar conta free tier imediatamente |
