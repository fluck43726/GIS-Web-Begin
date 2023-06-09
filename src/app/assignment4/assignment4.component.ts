import { Component, ElementRef, ViewChild } from '@angular/core';

import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { identify } from '@arcgis/core/rest/identify';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';

import { MapService, NewIdentifyResultType } from '../services/map.services';
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

  identifyURL: string =
    'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    //render map
    this.mapService.createMap(
      this.mapPanel.nativeElement,
      this.locate.longitude || 0,
      this.locate.latitude || 0
    );

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

    //draw point
    this.mapService.drawPoint(
      this.locate.longitude || 0,
      this.locate.latitude || 0
    );

    //on click
    this.mapService.mapView?.on('click', async (mapEvent) => {
      await this.onClickHandler(mapEvent);
    });
  }

  //on click
  async onClickHandler(mapEvent: __esri.ViewClickEvent) {
    this.locate.longitude = mapEvent.mapPoint.longitude;
    this.locate.latitude = mapEvent.mapPoint.latitude;

    this.params.geometry = mapEvent.mapPoint;
    this.params.mapExtent = this.mapService.mapView.extent;

    const response = await identify(this.identifyURL, this.params);
    const responseFeatures = response.results.map(
      (result: NewIdentifyResultType) => {
        let feature = result.feature;
        feature.popupTemplate = new PopupTemplate({
          title: feature.attributes.STATE_NAME,
          content: this.buildContent(
            feature.attributes.POP2007,
            feature.attributes.Shape_Area
          ),
        });

        this.mapService.drawPolygon(
          feature.geometry.rings,
          feature.geometry.spatialReference
        );

        return feature;
      }
    );

    if (responseFeatures.length > 0) {
      this.mapService.mapView.popup.open({
        features: responseFeatures,
        location: mapEvent.mapPoint,
      });
    }

    // identify(this.identifyURL, this.params)
    //   .then((response) => {
    //     const results = response.results;
    //     return results.map((result: NewIdentifyResultType) => {
    //       let feature = result.feature;
    //       feature.popupTemplate = new PopupTemplate({
    //         title: feature.attributes.STATE_NAME,
    //         content: this.buildContent(
    //           feature.attributes.POP2007,
    //           feature.attributes.Shape_Area
    //         ),
    //       });

    //       this.mapService.drawPolygon(
    //         feature.geometry.rings,
    //         feature.geometry.spatialReference
    //       );

    //       return feature;
    //     });
    //   })
    //   .then((responseFeatures) => {
    //     if (responseFeatures.length > 0) {
    //       this.mapService.mapView.popup.open({
    //         features: responseFeatures,
    //         location: mapEvent.mapPoint,
    //       });
    //     }
    //   });
  }

  //CustomPoint
  onLocate(event: CustomPoint) {
    this.locate.longitude = event.longitude;
    this.locate.latitude = event.latitude;

    this.mapService.mapView.graphics.remove(this.mapService.lastPoint);
    this.mapService.mapView.goTo({
      center: [this.locate.longitude, this.locate.latitude],
    });

    this.mapService.drawPoint(
      this.locate.longitude || 0,
      this.locate.latitude || 0
    );
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
    if (typeof currencyVal === 'number') {
      let parts = currencyVal.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); //Regular Expression
      return parts.join('.');
    }
    return currencyVal;
  }
}
