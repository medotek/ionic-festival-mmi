import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.page.html',
  styleUrls: ['./form-inscription.page.scss'],
})
export class FormInscriptionPage implements OnInit {

  name = '';
  firstname = '';
  mail = '';
  password = '';
  errorMessage: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createNewUser() {
      console.log(this.mail + ' ' + this.password);
      return new Promise(
          (resolve, reject) => {
              firebase.auth().createUserWithEmailAndPassword(this.mail, this.password).then(
                  () => {
                    this.router.navigate(['/home']);
                  },
                  (error) => {
                      this.errorMessage = error;
                  }
              );
          }
      );
  }
}
