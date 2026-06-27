import type { AnalysisResponse, GeometryValidation } from "./types";

interface Props {
  analysis: AnalysisResponse;
  validation: GeometryValidation;
  onReset: () => void;
}

const STATUS_CONFIG = {
  pass: { label: "Viável", icon: "🟢", color: "#16a34a" },
  warning: { label: "Atenção", icon: "🟡", color: "#ca8a04" },
  fail: { label: "Impedimento", icon: "🔴", color: "#dc2626" },
  unavailable: { label: "Indisponível", icon: "⚪", color: "#9ca3af" },
};

const OVERALL_CONFIG = {
  viable: { label: "Terreno Viável", color: "#16a34a", bg: "#f0fdf4" },
  attention: { label: "Requer Atenção", color: "#ca8a04", bg: "#fefce8" },
  blocked: { label: "Terreno Bloqueado", color: "#dc2626", bg: "#fef2f2" },
};

export default function AnalysisPanel({ analysis, validation, onReset }: Props) {
  const overall = OVERALL_CONFIG[analysis.overall_status];

  const formatArea = (m2: number) => {
    if (m2 >= 1_000_000) return `${(m2 / 1_000_000).toFixed(2)} km²`;
    if (m2 >= 10_000) return `${(m2 / 10_000).toFixed(1)} ha`;
    return `${m2.toFixed(0)} m²`;
  };

  return (
    <aside className="panel">
      {/* Header */}
      <div className="panel-header" style={{ background: overall.bg, borderColor: overall.color }}>
        <div className="panel-header-top">
          <h2>Relatório de Viabilidade</h2>
          <button className="btn btn-sm" onClick={onReset}>
            🔄 Nova Análise
          </button>
        </div>
        <div className="overall-status" style={{ color: overall.color }}>
          <span className="overall-dot" style={{ background: overall.color }} />
          {overall.label}
        </div>
        <div className="panel-meta">
          <div className="meta-item">
            <span className="meta-label">Área</span>
            <span className="meta-value">{formatArea(validation.area_m2)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">ID</span>
            <span className="meta-value mono">{analysis.analysis_id}</span>
          </div>
        </div>
      </div>

      {/* Layers */}
      <div className="panel-layers">
        <h3>Camadas Analisadas</h3>
        {analysis.layers.map((layer) => {
          const status = STATUS_CONFIG[layer.status];
          return (
            <div key={layer.name} className="layer-card">
              <div className="layer-header">
                <span className="layer-icon">{status.icon}</span>
                <span className="layer-name">{layer.name}</span>
                <span className="layer-status" style={{ color: status.color }}>
                  {status.label}
                </span>
              </div>
              <p className="layer-summary">{layer.summary}</p>
              {layer.percentage_affected !== undefined && (
                <div className="layer-bar-container">
                  <div className="layer-bar">
                    <div
                      className="layer-bar-fill"
                      style={{
                        width: `${Math.min(layer.percentage_affected, 100)}%`,
                        background:
                          layer.percentage_affected < 10
                            ? "#16a34a"
                            : layer.percentage_affected < 30
                            ? "#ca8a04"
                            : "#dc2626",
                      }}
                    />
                  </div>
                  <span className="layer-bar-label">{layer.percentage_affected.toFixed(0)}% afetado</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="panel-footer">
        <button className="btn btn-primary btn-full" disabled title="PDF será implementado no Slice 7">
          📄 Gerar Relatório PDF
        </button>
        <p className="footer-note">
          Protótipo v0.1 — Dados mockados. Integração real em desenvolvimento.
        </p>
      </div>
    </aside>
  );
}
