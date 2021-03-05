import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalmaresPage } from './palmares.page';

const routes: Routes = [
  {
    path: '',
    component: PalmaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalmaresPageRoutingModule {}
