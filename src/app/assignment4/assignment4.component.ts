import { Component, ElementRef, ViewChild } from '@angular/core';

import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import { identify } from '@arcgis/core/rest/identify';
// import IdentifyResult from '@arcgis/core/rest/support/IdentifyResult.js';
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
  locate: CustomPoint = new CustomPoint(-98, 40); //USA
  params: IdentifyParameters = new IdentifyParameters();
  lastPolygon: Graphic;
  identifyURL: string =
    'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    //render map
    this.mapService.createMap(this.mapPanel.nativeElement);

    //add layer
    const identifyLayer = new MapImageLayer({
      url: this.identifyURL,
      opacity: 0.5,
    });

    this.mapService.map.add(identifyLayer);

    this.params.tolerance = 3;
    this.params.layerIds = [3];
    this.params.width = this.mapService.mapView.width;
    this.params.height = this.mapService.mapView.height;
    this.params.returnGeometry = true;

    //on click
    this.mapService.mapView?.on('click', (mapEvent) => {
      this.onClickHandler(mapEvent);
    });

    //draw point
    this.drawPoint();
  }

  //on click
  onClickHandler(mapEvent: __esri.ViewClickEvent) {
    this.params.geometry = mapEvent.mapPoint;
    this.params.mapExtent = this.mapService.mapView.extent;

    identify(this.identifyURL, this.params)
      .then((response) => {
        const results = response.results;
        return results.map((result: any /*IdentifyResult*/) => {
          let feature = result.feature;
          feature.popupTemplate = new PopupTemplate({
            title: feature.attributes.STATE_NAME,
            content: this.buildContent(
              feature.attributes.POP2007,
              feature.attributes.Shape_Area
            ),
          });

          this.drawPolygon(
            feature.geometry.rings,
            feature.geometry.spatialReference
          );

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
  }

  //locate
  onLocate(event: CustomPoint) {
    this.locate = event;

    this.mapService.mapView.graphics.removeAll();
    this.mapService.mapView.goTo({
      center: [event.longitude, event.latitude],
    });

    this.drawPoint();
  }

  //draw point
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

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol,
    });

    this.mapService.mapView.graphics.add(pointGraphic);
  }

  //draw polygon
  drawPolygon(rings: number[][][] | undefined, spatialReference: any) {
    const polygon = new Polygon({
      rings,
      spatialReference,
    });

    const solidSymbol = new SimpleFillSymbol({
      color: [0, 170, 255, 0.3],
      outline: {
        color: [0, 170, 255, 0.8],
        width: 2,
      },
    });

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: solidSymbol,
    });

    this.mapService.mapView.graphics.remove(this.lastPolygon);
    this.lastPolygon = polygonGraphic;
    this.mapService.mapView.graphics.add(polygonGraphic);
    this.mapService.mapView.graphics.reorder(polygonGraphic, 0);
  }

  //html content
  buildContent(population: number, area: number) {
    return `
      <p style="margin-bottom: 2px"><b>Population (2007):</b> ${this.formatThousandSeparate(
        population
      )}</p>
      <p style="margin-bottom: 2px"><b>Area:</b> ${this.formatThousandSeparate(
        area
      )}</p>
    `;
  }

  //format number
  formatThousandSeparate(currencyVal: number) {
    if (currencyVal) {
      let parts = currencyVal.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    return currencyVal;
  }
}
