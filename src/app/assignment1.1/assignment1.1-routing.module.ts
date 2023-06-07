import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment11Component } from './assignment1.1.component';

const routes: Routes = [
  {
    path: '',
    component: Assignment11Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assignment11RoutingModule {}
