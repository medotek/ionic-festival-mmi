import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { Users} from '../Interfaces/users';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userListRef: AngularFireList<any>;

  userData: any;
  public loggedIn = false;
  private userDetails: firebase.User;

  constructor(
      public afStore: AngularFirestore,
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      public database: AngularFireDatabase,
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
    this.loggedIn = !!sessionStorage.getItem('user');
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  logUserIn(email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then( res => {
      this.userDetails = res.user;
      this.stockConnexion(email);
      this.router.navigate(['/home']);
    }).catch( error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
        console.log('error' + error);
    });
  }

  stockConnexion(email) {
    if (this.userDetails) {
      email = this.userDetails.email;
      console.log('hello im user' + ' ' + email);
      // setting user in session here --->
      this.setCurrentUser(email);
    } else {
      console.log('not working');
    }
  }

  changePassword(email) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }

// Set current user in your session after a successful login
  setCurrentUser(email: string): void {
    sessionStorage.setItem('user', email);
    this.loggedIn = true;
  }

// Get currently logged in user from session
  getCurrentUser(): string | any {
    return sessionStorage.getItem('user') || undefined;
  }

// Clear the session for current user & log the user out
  logout() {
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    // ... other code for logout
  }

// The method to check whether user is logged in or not
  isLoggedIn() {
    return this.loggedIn;
  }

  // Create
  createUser(newUser: Users) {
    if (!newUser.Role) {
      newUser.Role = 'public';
    }

    if (!newUser.Image) {
      newUser.Image = '';
    }
    this.userListRef = this.database.list('/User');
    return this.userListRef.push({
      nom: newUser.Nom,
      prenom: newUser.Prenom,
      mail: newUser.Email,
      voteToken: 1,
      role: newUser.Role,
      image: newUser.Image,
    });
  }
}
