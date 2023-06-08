import { Injectable } from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map;
  mapView: MapView;

  createMap(container: HTMLDivElement) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      // center: [100.5408754, 13.7030248], //TH
      center: [-115, 45], //USA
      zoom: 8,
    });
  }
}
