import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptometerPage } from './optometer.page';

const routes: Routes = [
  {
    path: '',
    component: OptometerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptometerPageRoutingModule {}
