import { Injectable } from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map;
  mapView: MapView;

  createMap(container: HTMLDivElement, iniLong: number, iniLat: number) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      center: [iniLong, iniLat], //USA
      zoom: 6,
    });
  }
}
