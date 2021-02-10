import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { Users} from '../Interfaces/users';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(
      public afStore: AngularFirestore,
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('users', null);
        JSON.parse(localStorage.getItem('users'));
      }
    });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  /*SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          this.router.navigate(['verify-email']);
        });
  }*/

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  changePassword(email) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }
}
