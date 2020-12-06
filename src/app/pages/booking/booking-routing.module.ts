import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  {
    path: 'add-edit-booking',
    loadChildren: () => import('./add-edit-booking/add-edit-booking.module').then( m => m.AddEditBookingPageModule)
  },
  {
    path: 'add-edit-booking/:id',
    loadChildren: () => import('./add-edit-booking/add-edit-booking.module').then( m => m.AddEditBookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
