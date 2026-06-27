/// <reference types="vite/client" />

// Tipagem para variáveis de ambiente do Vite
interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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
