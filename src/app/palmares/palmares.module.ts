import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalmaresPageRoutingModule } from './palmares-routing.module';

import { PalmaresPage } from './palmares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalmaresPageRoutingModule
  ],
  declarations: [PalmaresPage]
})
export class PalmaresPageModule {}
