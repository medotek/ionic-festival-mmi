import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OeuvreDetailsPage } from './oeuvre-details.page';

const routes: Routes = [
  {
    path: '',
    component: OeuvreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OeuvreDetailsPageRoutingModule {}
