import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicineDetailPageRoutingModule } from './medicine-detail-routing.module';

import { MedicineDetailPage } from './medicine-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineDetailPageRoutingModule
  ],
  declarations: [MedicineDetailPage]
})
export class MedicineDetailPageModule {}
