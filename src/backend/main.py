"""Geodata API — Backend de análise territorial para due diligence imobiliária."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import geopandas as gpd
from shapely.geometry import shape, Polygon, MultiPolygon
from shapely.validation import explain_validity
import json

app = FastAPI(
    title="Geodata API",
    description="Análise territorial para due diligence imobiliária no Brasil",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Models ---

class GeoJSONGeometry(BaseModel):
    type: str
    coordinates: list


class GeoJSONFeature(BaseModel):
    type: str = "Feature"
    geometry: GeoJSONGeometry
    properties: Optional[dict] = None


class GeoJSONFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: list[GeoJSONFeature]


class AnalysisRequest(BaseModel):
    geojson: GeoJSONFeatureCollection = Field(
        ...,
        description="Polígono da área a ser analisada (GeoJSON FeatureCollection)",
    )


class LayerResult(BaseModel):
    """Resultado de uma camada de análise."""
    name: str
    status: str  # "pass" | "warning" | "fail" | "unavailable"
    summary: str
    details: dict = {}
    percentage_affected: Optional[float] = None


class AnalysisResponse(BaseModel):
    """Resposta completa da análise territorial."""
    analysis_id: str
    area_m2: float
    area_hectares: float
    bbox: list[float]  # [min_lon, min_lat, max_lon, max_lat]
    centroid: list[float]  # [lon, lat]
    layers: list[LayerResult]
    overall_status: str  # "viable" | "attention" | "blocked"


# --- Routes ---

@app.get("/api/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}


@app.post("/api/validate-geometry")
async def validate_geometry(request: AnalysisRequest):
    """Valida o polígono enviado pelo usuário e retorna metadados."""
    try:
        # Extrair geometria do GeoJSON
        features = request.geojson.features
        if not features:
            raise HTTPException(status_code=400, detail="Nenhuma geometria enviada")

        geom_dict = features[0].geometry.model_dump()
        geom = shape(geom_dict)

        # Validar: deve ser Polygon ou MultiPolygon
        if geom.geom_type not in ("Polygon", "MultiPolygon"):
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de geometria inválido: {geom.geom_type}. Use Polygon ou MultiPolygon.",
            )

        # Validar geometria
        if not geom.is_valid:
            reason = explain_validity(geom)
            raise HTTPException(
                status_code=400,
                detail=f"Geometria inválida: {reason}. Corrija o polígono (auto-interseção, anéis abertos, etc).",
            )

        # Validar área (máx 1 km² = 1.000.000 m²)
        # Projeção para cálculo de área em m² (UTM aproximada)
        gdf = gpd.GeoDataFrame(geometry=[geom], crs="EPSG:4326")
        centroid = gdf.geometry.centroid.iloc[0]
        utm_zone = int((centroid.x + 180) / 6) + 1
        hemisphere = "south" if centroid.y < 0 else "north"
        utm_crs = f"EPSG:{32700 + utm_zone}" if hemisphere == "south" else f"EPSG:{32600 + utm_zone}"
        gdf_utm = gdf.to_crs(utm_crs)
        area_m2 = gdf_utm.geometry.area.iloc[0]

        if area_m2 > 1_000_000:
            raise HTTPException(
                status_code=400,
                detail=f"Área excede o limite de 1 km². Área calculada: {area_m2 / 1_000_000:.2f} km².",
            )

        if area_m2 < 10:
            raise HTTPException(
                status_code=400,
                detail=f"Área muito pequena: {area_m2:.1f} m². Mínimo: 10 m².",
            )

        bbox = list(geom.bounds)
        centroid_coords = [centroid.x, centroid.y]

        return {
            "valid": True,
            "area_m2": round(area_m2, 1),
            "area_hectares": round(area_m2 / 10_000, 2),
            "bbox": bbox,
            "centroid": centroid_coords,
            "crs": utm_crs,
            "geometry_type": geom.geom_type,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar geometria: {str(e)}")


@app.post("/api/analyze")
async def analyze_area(request: AnalysisRequest):
    """
    Analisa a área selecionada em todas as camadas disponíveis.
    Por enquanto retorna apenas validação + mock das camadas.
    A integração real com SICAR, GEE, ANA será implementada nos próximos slices.
    """
    # Validar geometria primeiro
    validation = await validate_geometry(request)
    area_ha = validation["area_hectares"]

    # Camadas mockadas (serão substituídas por integrações reais)
    layers = [
        LayerResult(
            name="APP / Reserva Legal",
            status="unavailable",
            summary="Integração com SICAR/CAR será implementada no Slice 2.",
            details={"source": "SICAR/CAR (GeoServer WFS)", "status_code": "not_implemented"},
        ),
        LayerResult(
            name="Declividade",
            status="unavailable",
            summary="Integração com SRTM via GEE será implementada no Slice 3.",
            details={"source": "SRTM 30m (Google Earth Engine)", "status_code": "not_implemented"},
        ),
        LayerResult(
            name="Risco de Inundação",
            status="unavailable",
            summary="Integração com ANA será implementada no Slice 4.",
            details={"source": "ANA (WMS manchas de inundação)", "status_code": "not_implemented"},
        ),
        LayerResult(
            name="Zoneamento Municipal",
            status="unavailable",
            summary="Integração com dados municipais será implementada no Slice 5.",
            details={"source": "GeoSampa / IPPUC / Prefeituras", "status_code": "not_implemented"},
        ),
        LayerResult(
            name="Valor do m²",
            status="unavailable",
            summary="Integração com fontes de valor será implementada no Slice 6.",
            details={"source": "ITBI / IPTU / Zap Imóveis", "status_code": "not_implemented"},
        ),
    ]

    import uuid

    analysis_id = uuid.uuid4().hex[:12]

    return AnalysisResponse(
        analysis_id=analysis_id,
        area_m2=validation["area_m2"],
        area_hectares=area_ha,
        bbox=validation["bbox"],
        centroid=validation["centroid"],
        layers=layers,
        overall_status="viable",  # mock
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
