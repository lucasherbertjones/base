/// <reference types="vite/client" />

// Token do Mapbox — free tier (50K loads/mês)
// Em produção, mover para variável de ambiente
export const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ2VvZGF0YS1kZXYiLCJhIjoiY20wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9.0000000000000000000000000";

export interface GeoJSONGeometry {
  type: string;
  coordinates: number[][][] | number[][][][];
}

export interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties?: Record<string, unknown>;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface LayerResult {
  name: string;
  status: "pass" | "warning" | "fail" | "unavailable";
  summary: string;
  details: Record<string, unknown>;
  percentage_affected?: number;
}

export interface AnalysisResponse {
  analysis_id: string;
  area_m2: number;
  area_hectares: number;
  bbox: number[];
  centroid: number[];
  layers: LayerResult[];
  overall_status: "viable" | "attention" | "blocked";
}

export interface GeometryValidation {
  valid: boolean;
  area_m2: number;
  area_hectares: number;
  bbox: number[];
  centroid: number[];
  crs: string;
  geometry_type: string;
}
