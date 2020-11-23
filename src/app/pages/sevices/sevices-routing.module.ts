import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SevicesPage } from './sevices.page';

const routes: Routes = [
  {
    path: '',
    component: SevicesPage
  },
  {
    path: 'single-service/:id',
    loadChildren: () => import('./single-service/single-service.module').then( m => m.SingleServicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SevicesPageRoutingModule {}
