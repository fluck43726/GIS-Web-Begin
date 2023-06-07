import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomPoint } from './locator.model';

@Component({
  selector: 'locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css'],
})
export class LocatorComponent {
  newCustomPoint: CustomPoint = new CustomPoint();

  @Input('fromTitle') fromTitle: String = 'Locator';
  @Output() locate = new EventEmitter<CustomPoint>();

  onLocate() {
    this.locate.emit(this.newCustomPoint);
  }
}
