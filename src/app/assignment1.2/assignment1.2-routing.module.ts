import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment12Component } from './assignment1.2.component';

const routes: Routes = [
  {
    path: '',
    component: Assignment12Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assignment12RoutingModule {}
