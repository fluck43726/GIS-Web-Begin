import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'assignment1_1',
    loadChildren: () =>
      import('./assignment1.1/assignment1.1.module').then(
        (m) => m.Assignment11Module
      ),
  },
  {
    path: 'assignment1_2',
    loadChildren: () =>
      import('./assignment1.2/assignment1.2.module').then(
        (m) => m.Assignment12Module
      ),
  },
  {
    path: 'assignment1_3',
    loadChildren: () =>
      import('./assignment1.3/assignment1.3.module').then(
        (m) => m.Assignment13Module
      ),
  },
  {
    path: 'assignment2',
    loadChildren: () =>
      import('./assignment2/assignment2.module').then(
        (m) => m.Assignment2Module
      ),
  },
  {
    path: 'assignment3',
    loadChildren: () =>
      import('./assignment3/assignment3.module').then(
        (m) => m.Assignment3Module
      ),
  },
  {
    path: 'assignment4',
    loadChildren: () =>
      import('./assignment4/assignment4.module').then(
        (m) => m.Assignment4Module
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
