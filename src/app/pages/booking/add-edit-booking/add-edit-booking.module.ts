import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditBookingPageRoutingModule } from './add-edit-booking-routing.module';

import { AddEditBookingPage } from './add-edit-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddEditBookingPageRoutingModule
  ],
  declarations: [AddEditBookingPage]
})
export class AddEditBookingPageModule {}
