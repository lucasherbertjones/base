import type { GeoJSONFeatureCollection, AnalysisResponse, GeometryValidation } from "./types";

const API_BASE = "/api";

export async function validateGeometry(
  geojson: GeoJSONFeatureCollection
): Promise<GeometryValidation> {
  const res = await fetch(`${API_BASE}/validate-geometry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ geojson }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Erro ao validar geometria");
  }

  return res.json();
}

export async function analyzeArea(
  geojson: GeoJSONFeatureCollection
): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ geojson }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Erro ao analisar área");
  }

  return res.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
