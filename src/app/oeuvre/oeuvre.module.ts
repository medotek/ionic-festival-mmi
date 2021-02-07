import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OeuvrePageRoutingModule } from './oeuvre-routing.module';

import { OeuvrePage } from './oeuvre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OeuvrePageRoutingModule
  ],
  declarations: [OeuvrePage]
})
export class OeuvrePageModule {}
