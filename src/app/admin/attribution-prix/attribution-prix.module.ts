import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttributionPrixPageRoutingModule } from './attribution-prix-routing.module';

import { AttributionPrixPage } from './attribution-prix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttributionPrixPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AttributionPrixPage]
})
export class AttributionPrixPageModule {}
