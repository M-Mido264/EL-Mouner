import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlassesPageRoutingModule } from './glasses-routing.module';

import { GlassesPage } from './glasses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlassesPageRoutingModule
  ],
  declarations: [GlassesPage]
})
export class GlassesPageModule {}
