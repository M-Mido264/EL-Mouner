import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetInTouchPageRoutingModule } from './get-in-touch-routing.module';

import { GetInTouchPage } from './get-in-touch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetInTouchPageRoutingModule
  ],
  declarations: [GetInTouchPage]
})
export class GetInTouchPageModule {}
