import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SevicesPage } from './sevices.page';

const routes: Routes = [
  {
    path: '',
    component: SevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SevicesPageRoutingModule {}
