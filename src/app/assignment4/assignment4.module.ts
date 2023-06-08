import { NgModule } from '@angular/core';
import { LocatorModule } from '../locator/locator.module';
import { MapService } from '../services/map.services';

import { Assignment4RoutingModule } from './assignment4-routing.module';
import { Assignment4Component } from './assignment4.component';

@NgModule({
  declarations: [Assignment4Component],
  providers: [MapService],
  imports: [Assignment4RoutingModule, LocatorModule],
  bootstrap: [Assignment4Component],
})
export class Assignment4Module {}
