import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditBookingPage } from './add-edit-booking.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditBookingPageRoutingModule {}
