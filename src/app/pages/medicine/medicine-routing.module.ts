import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinePage } from './medicine.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinePage
  },
  {
    path: 'medicine-detail',
    loadChildren: () => import('./medicine-detail/medicine-detail.module').then( m => m.MedicineDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinePageRoutingModule {}
