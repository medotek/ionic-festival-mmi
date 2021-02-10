import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'participation',
    loadChildren: () => import('./oeuvre/oeuvre.module').then( m => m.OeuvrePageModule)
  },
  {
    path: 'form-inscription',
    loadChildren: () => import('./form-inscription/form-inscription.module').then( m => m.FormInscriptionPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'invitation',
    loadChildren: () => import('./invitation/invitation.module').then( m => m.InvitationPageModule)
  },
  {
    path: 'oeuvre',
    loadChildren: () => import('./oeuvre/oeuvre.module').then( m => m.OeuvrePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'festival',
    loadChildren: () => import('./festival/festival.module').then( m => m.FestivalPageModule)
  },
  {
    path: 'oeuvre-details/:id',
    loadChildren: () => import('./oeuvre-details/oeuvre-details.module').then( m => m.OeuvreDetailsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
