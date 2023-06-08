import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';

import { MapService } from '../services/map.services';
import { CustomPoint } from '../locator/locator.model';
@Component({
  selector: 'assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css'],
})
export class Assignment3Component implements OnInit {
  @ViewChild('mapPanel', { static: true }) mapPanel: ElementRef<HTMLDivElement>;
  locate: CustomPoint = new CustomPoint(100.5408754, 13.7030248);

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    //render map
    this.mapService.createMap(this.mapPanel.nativeElement);

    //Draw graphic
    this.drawGraphic();
  }

  onLocate(event: CustomPoint) {
    this.locate = event;

    this.mapService.mapView?.graphics.removeAll();
    this.mapService.mapView?.goTo({
      center: [event.longitude, event.latitude],
      zoom: 15,
    });

    this.drawGraphic();
  }

  //Draw graphic
  drawGraphic() {
    const point = new Point({
      longitude: this.locate.longitude || undefined,
      latitude: this.locate.latitude || undefined,
    });

    const symbol = new SimpleMarkerSymbol({
      color: [43, 142, 255, 0.8],
      outline: {
        color: [43, 142, 255, 0.3],
        width: 2,
      },
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: symbol,
    });

    this.mapService.mapView?.graphics.add(graphic);
  }
}
