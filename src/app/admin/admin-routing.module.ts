import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'oeuvre',
    loadChildren: () => import('./oeuvre/oeuvre.module').then( m => m.OeuvrePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'statut',
    loadChildren: () => import('./statut/statut.module').then( m => m.StatutPageModule)
  },
  {
    path: 'invitation',
    loadChildren: () => import('./invitation/invitation.module').then( m => m.InvitationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
