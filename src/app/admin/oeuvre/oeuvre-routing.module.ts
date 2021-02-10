import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OeuvrePage } from './oeuvre.page';

const routes: Routes = [
  {
    path: '',
    component: OeuvrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OeuvrePageRoutingModule {}
