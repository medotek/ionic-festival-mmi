import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttributionPrixPage } from './attribution-prix.page';

const routes: Routes = [
  {
    path: '',
    component: AttributionPrixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributionPrixPageRoutingModule {}
