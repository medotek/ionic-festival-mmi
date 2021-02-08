import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

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

  constructor() { }

  ngOnInit() {
  }

  createNewUser() {
      console.log(this.mail + ' ' + this.password);
      /*return new Promise(
          (resolve, reject) => {
              firebase.auth().createUserWithEmailAndPassword(this.mail, this.password).then(
                  () => {
                      resolve();
                  },
                  (error) => {
                      reject(error);
                  }
              );
          }
      );*/
  }
}
