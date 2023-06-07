import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Assignment11Component } from './assignment11/assignment11.component';
import { Assignment1Component } from './assignment1/assignment1.component';
import { Assignment12Component } from './assignment1.2/assignment1.2.component';
import { Assignment13Component } from './assignment1.3/assignment1.3.component';
import { Assignment2Component } from './assignment2/assignment2.component';

@NgModule({
  declarations: [
    AppComponent,
    Assignment11Component,
    Assignment1Component,
    Assignment12Component,
    Assignment13Component,
    Assignment2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
