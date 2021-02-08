import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormInscriptionPageRoutingModule } from './form-inscription-routing.module';

import { FormInscriptionPage } from './form-inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormInscriptionPageRoutingModule
  ],
  declarations: [FormInscriptionPage]
})
export class FormInscriptionPageModule {}
