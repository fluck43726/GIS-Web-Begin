import { NgModule } from '@angular/core';
import { LocatorModule } from '../locator/locator.module';

import { Assignment2RoutingModule } from './assignment2-routing.module';
import { Assignment2Component } from './assignment2.component';

@NgModule({
  declarations: [Assignment2Component],
  imports: [Assignment2RoutingModule, LocatorModule],
  bootstrap: [Assignment2Component],
})
export class Assignment2Module {}
