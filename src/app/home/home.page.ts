import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dateOpening: string;
  URLrandom: string;
  email: '';
  status: string;

  constructor(private router: Router, private auth: AuthenticationService) {}

  public ngOnInit() {
    this.genererChaineAleatoire();
    this.dateOpening = '21 Avril à 16h00';
    this.status = 'ouverture';
  }

    genererChaineAleatoire() {
        this.strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 50,
            startsWithLowerCase: true
        });
    }

    strRandom(o) {
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
    }

  login() {
    this.router.navigate(['/form-inscription']);
  }

  gotoFest() {
    this.router.navigate(['/festival']);
  }
}
