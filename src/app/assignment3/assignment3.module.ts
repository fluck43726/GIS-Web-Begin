import { NgModule } from '@angular/core';
import { LocatorModule } from '../locator/locator.module';
import { MapService } from '../services/map.services';

import { Assignment3RoutingModule } from './assignment3-routing.module';
import { Assignment3Component } from './assignment3.component';

@NgModule({
  declarations: [Assignment3Component],
  providers: [MapService],
  imports: [Assignment3RoutingModule, LocatorModule],
  bootstrap: [Assignment3Component],
})
export class Assignment3Module {}
