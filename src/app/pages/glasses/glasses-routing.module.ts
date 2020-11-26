import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlassesPage } from './glasses.page';

const routes: Routes = [
  {
    path: '',
    component: GlassesPage
  },
  {
    path: 'optometer/:id',
    loadChildren: () => import('./optometer/optometer.module').then( m => m.OptometerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlassesPageRoutingModule {}
