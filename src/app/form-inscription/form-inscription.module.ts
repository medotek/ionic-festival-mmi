import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormInscriptionPageRoutingModule } from './form-inscription-routing.module';

import { FormInscriptionPage } from './form-inscription.page';
import { AngularFireModule } from '@angular/fire';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormInscriptionPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  declarations: [FormInscriptionPage]
})
export class FormInscriptionPageModule {}
