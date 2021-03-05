import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OeuvrePageRoutingModule } from './oeuvre-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { OeuvrePage } from './oeuvre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OeuvrePageRoutingModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [OeuvrePage]
})
export class OeuvrePageModule {}
