import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptometerPageRoutingModule } from './optometer-routing.module';

import { OptometerPage } from './optometer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptometerPageRoutingModule
  ],
  declarations: [OptometerPage]
})
export class OptometerPageModule {}
