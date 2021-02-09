import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OeuvrePageRoutingModule } from './oeuvre-routing.module';

import { OeuvrePage } from './oeuvre.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OeuvrePageRoutingModule,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
  declarations: [OeuvrePage]
})
export class OeuvrePageModule {}
