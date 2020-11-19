import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinePage } from './medicine.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinePageRoutingModule {}
