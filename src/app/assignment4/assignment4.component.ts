import { Component, ElementRef, ViewChild } from '@angular/core';

import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import { identify } from '@arcgis/core/rest/identify';
import IdentifyResult from '@arcgis/core/rest/support/IdentifyResult.js';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';

import { MapService } from '../services/map.services';
import { CustomPoint } from '../locator/locator.model';

@Component({
  selector: 'app-assignment4',
  templateUrl: './assignment4.component.html',
  styleUrls: ['./assignment4.component.css'],
})
export class Assignment4Component {
  @ViewChild('mapPanel', { static: true }) mapPanel: ElementRef<HTMLDivElement>;
  // locate: CustomPoint = new CustomPoint(100.5408754, 13.7030248); //TH
  locate: CustomPoint = new CustomPoint(-115, 45); //USA
  params: IdentifyParameters;
  lastPolygon: Graphic;
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    //render map
    this.mapService.createMap(this.mapPanel.nativeElement);

    const identifyURL =
      'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';
    //Add layer
    const identifyLayer = new MapImageLayer({
      url: identifyURL,
      opacity: 0.5,
    });

    this.mapService.map.add(identifyLayer);

    this.params = new IdentifyParameters();
    this.params.tolerance = 3;
    this.params.layerIds = [3];
    // this.params.layerOption = 'top';
    this.params.width = this.mapService.mapView.width;
    this.params.height = this.mapService.mapView.height;
    this.params.returnGeometry = true;

    //on click
    this.mapService.mapView?.on('click', (mapEvent) => {
      this.params.geometry = mapEvent.mapPoint;
      this.params.mapExtent = this.mapService.mapView.extent;

      identify(identifyURL, this.params)
        .then((response) => {
          const results = response.results;
          return results.map((result: any) => {
            let feature = result.feature;
            feature.popupTemplate = new PopupTemplate({
              title: feature.attributes.STATE_NAME,
              content: `
                <p>Population: ${feature.attributes.POP2007}</p>
                <p>Area: ${feature.attributes.Shape_Area}</p>
              `,
            });

            this.drawPolygon(
              feature.geometry.rings,
              feature.geometry.spatialReference
            );
            this.drawPoint();

            return feature;
          });
        })
        .then((responseFeatures) => {
          if (responseFeatures.length > 0) {
            this.mapService.mapView.popup.open({
              features: responseFeatures,
              location: mapEvent.mapPoint,
            });
          }
        });
    });

    this.drawPoint();
  }

  onLocate(event: CustomPoint) {
    this.locate = event;

    this.mapService.mapView.graphics.removeAll();
    this.mapService.mapView.goTo({
      center: [event.longitude, event.latitude],
      zoom: 8,
    });

    this.drawPoint();
  }

  //Draw Point
  drawPoint() {
    const point = new Point({
      longitude: this.locate.longitude || undefined,
      latitude: this.locate.latitude || undefined,
    });

    const symbol = new SimpleMarkerSymbol({
      color: [43, 142, 255, 0.7],
      outline: {
        color: [255, 255, 255, 0.5],
        width: 2,
      },
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: symbol,
    });

    this.mapService.mapView.graphics.add(graphic);
  }

  //Draw Polygon
  drawPolygon(rings: number[][][] | undefined, spatialReference: any) {
    this.mapService.mapView.graphics.remove(this.lastPolygon);
    const polygon = new Polygon({
      rings,
      spatialReference,
    });

    const solidSymbol = new SimpleFillSymbol({
      color: [0, 170, 255, 0.3],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    });

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: solidSymbol,
    });

    this.lastPolygon = polygonGraphic;
    this.mapService.mapView.graphics.add(polygonGraphic);
  }
}
