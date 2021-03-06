import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire'; // pour se connecter à Firebase
import { AngularFireDatabaseModule } from '@angular/fire/database'; // pour manipuler la base de données Firebase
import { AngularFireStorageModule } from '@angular/fire/storage'; // pour accéder aux fonction de stockage et de récupération des fichiers
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    MatDialogModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
  ],
  providers: [
      AngularFirestoreModule,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      MatDatepickerModule,
      {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}

