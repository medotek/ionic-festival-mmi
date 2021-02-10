import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OeuvreDetailsPageRoutingModule } from './oeuvre-details-routing.module';

import { OeuvreDetailsPage } from './oeuvre-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OeuvreDetailsPageRoutingModule
  ],
  declarations: [OeuvreDetailsPage]
})
export class OeuvreDetailsPageModule {}
