import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment3Component } from './assignment3.component';

const routes: Routes = [
  {
    path: '',
    component: Assignment3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assignment3RoutingModule {}
