import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  URLrandom: string;
  email: '';
  unCookie;
  value = [];

  constructor(private router: Router, private cookie: CookieService) {}

  public ngOnInit() {
    this.genererChaineAleatoire();
    this.value[0] = this.email;
    this.value[1] = this.URLrandom;
    this.cookie.set('Test', this.URLrandom );
    this.unCookie = this.cookie.get('Test');
    console.log(this.unCookie);
  }

  genererChaineAleatoire()
  {
    this.strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 50,
      startsWithLowerCase: true
    });
  }

  strRandom(o) {
    console.log(o);
    let a = 10;
    const b = 'abcdefghijklmnopqrstuvwxyz';
    this.URLrandom = '';
    let d = 0;
    let e = '' + b;
    if (o) {
      if (o.startsWithLowerCase) {
        this.URLrandom = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      this.URLrandom += e[Math.floor(Math.random() * e.length)];
    }
    console.log(this.URLrandom);
  }

  redirect() {
    this.router.navigate(['/form-inscription', {id: this.URLrandom}]);
  }

}
