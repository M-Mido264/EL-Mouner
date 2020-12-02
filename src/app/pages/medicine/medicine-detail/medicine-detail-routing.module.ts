import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineDetailPage } from './medicine-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineDetailPageRoutingModule {}
