import { Injectable } from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

import IdentifyResult from '@arcgis/core/rest/support/IdentifyResult.js';

export type NewIdentifyResultType = IdentifyResult & {
  feature: {
    geometry: {
      rings: number[][][] | undefined;
    };
  };
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map;
  mapView: MapView;
  lastPoint: Graphic;
  lastPolygon: Graphic[] = [];

  createMap(container: HTMLDivElement, Long: number, Lat: number) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      center: [Long, Lat], //USA
      zoom: 6,
    });
  }

  //draw point
  drawPoint(Long: number, Lat: number) {
    const point = new Point({
      longitude: Long || undefined,
      latitude: Lat || undefined,
    });

    const symbol = new SimpleMarkerSymbol({
      color: [43, 142, 255, 0.7],
      outline: {
        color: [255, 255, 255, 0.5],
        width: 2,
      },
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol,
    });

    this.lastPoint = pointGraphic;
    this.mapView.graphics.add(pointGraphic);
  }

  //draw polygon
  drawPolygon(
    rings: number[][][] | undefined,
    spatialReference: __esri.SpatialReference
  ) {
    const polygon = new Polygon({
      rings,
      spatialReference,
    });

    const r = Math.random() * 255; // 0
    const g = Math.random() * 255; // 170
    const b = Math.random() * 255; // 255

    const solidSymbol = new SimpleFillSymbol({
      color: [r, g, b, 0.3],
      outline: {
        color: [r, g, b, 0.8],
        width: 2,
      },
    });

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: solidSymbol,
    });

    this.lastPolygon.push(polygonGraphic);
    this.mapView.graphics.add(polygonGraphic);
    this.mapView.graphics.reorder(polygonGraphic, 0);
  }
}
