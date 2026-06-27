import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import type { GeoJSONFeatureCollection } from "./types";
import type { AnalysisResponse, GeometryValidation } from "./types";
import { validateGeometry, analyzeArea, healthCheck } from "./api";
import AnalysisPanel from "./AnalysisPanel";

// Token público do Mapbox lido de variável de ambiente
// Crie um arquivo .env com VITE_MAPBOX_TOKEN=pk.seu_token_aqui
// Obtenha seu token em: https://account.mapbox.com/access-tokens/
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type AppStep = "draw" | "validating" | "analyzing" | "results" | "error";

export default function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const [step, setStep] = useState<AppStep>("draw");
  const [error, setError] = useState<string>("");
  const [validation, setValidation] = useState<GeometryValidation | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  // Verifica saúde do backend
  useEffect(() => {
    healthCheck().then(setBackendOnline);
    const interval = setInterval(() => healthCheck().then(setBackendOnline), 30_000);
    return () => clearInterval(interval);
  }, []);

  // Inicializa o mapa
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-46.6333, -23.5505], // São Paulo
      zoom: 14,
      antialias: true,
    });

    m.addControl(new mapboxgl.NavigationControl(), "top-right");
    m.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
        showUserHeading: false,
      }),
      "top-right"
    );

    // Ferramenta de desenho
    const d = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    m.addControl(d);

    m.on("load", () => {
      d.changeMode("draw_polygon");
    });

    // Handler para processar polígono
    const processPolygon = async (feature: any) => {
      if (!feature || feature.geometry.type !== "Polygon") return;

      const geojson: GeoJSONFeatureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };

      setStep("validating");
      setError("");

      try {
        const val = await validateGeometry(geojson);
        setValidation(val);

        setStep("analyzing");
        const result = await analyzeArea(geojson);
        setAnalysis(result);
        setStep("results");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setStep("error");
      }
    };

    m.on("draw.create", (e: any) => processPolygon(e.features[0]));
    m.on("draw.update", (e: any) => processPolygon(e.features[0]));

    mapRef.current = m;
    drawRef.current = d;

    return () => {
      m.remove();
      mapRef.current = null;
      drawRef.current = null;
    };
  }, []);

  const handleReset = () => {
    setStep("draw");
    setError("");
    setValidation(null);
    setAnalysis(null);
    drawRef.current?.deleteAll();
    drawRef.current?.changeMode("draw_polygon");
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">📍</span>
            Geodata
          </h1>
          <span className="badge">MVP v0.1</span>
        </div>
        <div className="header-right">
          <span
            className={`status-dot ${
              backendOnline ? "online" : backendOnline === false ? "offline" : "checking"
            }`}
          />
          <span className="status-text">
            {backendOnline === null
              ? "Verificando..."
              : backendOnline
              ? "API Online"
              : "API Offline"}
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Map Area */}
        <div className="map-area">
          <div ref={mapContainer} className="map-container" />

          {/* Instruções iniciais */}
          {step === "draw" && (
            <div className="map-overlay">
              <div className="instruction-card">
                <h2>✏️ Desenhe o terreno</h2>
                <p>
                  Clique nos vértices para criar o polígono.
                  Duplo-clique para fechar.
                </p>
              </div>
            </div>
          )}

          {/* Loading */}
          {(step === "validating" || step === "analyzing") && (
            <div className="map-overlay">
              <div className="loading-card">
                <div className="spinner" />
                <h2>
                  {step === "validating" ? "Validando geometria..." : "Analisando terreno..."}
                </h2>
              </div>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <div className="map-overlay is-centered">
              <div className="error-card">
                <div className="error-icon">⚠️</div>
                <h2>Erro na análise</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Tentar novamente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        {step === "results" && analysis && validation && (
          <AnalysisPanel analysis={analysis} validation={validation} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
