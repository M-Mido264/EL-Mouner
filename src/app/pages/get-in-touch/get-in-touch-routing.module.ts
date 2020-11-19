import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInTouchPage } from './get-in-touch.page';

const routes: Routes = [
  {
    path: '',
    component: GetInTouchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetInTouchPageRoutingModule {}
