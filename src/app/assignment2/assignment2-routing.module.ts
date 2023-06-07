import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment2Component } from './assignment2.component';

const routes: Routes = [
  {
    path: '',
    component: Assignment2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assignment2RoutingModule {}
