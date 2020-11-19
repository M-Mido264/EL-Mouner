import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SevicesPageRoutingModule } from './sevices-routing.module';

import { SevicesPage } from './sevices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SevicesPageRoutingModule
  ],
  declarations: [SevicesPage]
})
export class SevicesPageModule {}
