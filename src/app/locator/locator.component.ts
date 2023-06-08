import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CustomPoint } from './locator.model';

@Component({
  selector: 'locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css'],
})
export class LocatorComponent implements OnChanges {
  newCustomPoint: CustomPoint = new CustomPoint();

  @Input('fromTitle') fromTitle: String = 'Locator';
  @Input('longitude') longitude: number | null = null;
  @Input('latitude') latitude: number | null = null;
  @Output() locate = new EventEmitter<CustomPoint>();

  ngOnChanges() {
    this.newCustomPoint.longitude = this.longitude;
    this.newCustomPoint.latitude = this.latitude;
  }

  onLocate() {
    this.locate.emit(this.newCustomPoint);
  }
}
