import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  URLrandom: string;

  constructor(private router: Router) {}

  public ngOnInit() {
    this.genererChaineAleatoire();
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
