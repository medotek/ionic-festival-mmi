import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service';
import {StatusCrudService} from '../services/status-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  dateOpening: string;
  URLrandom: string;
  email: '';
  private status: any;

  constructor(private router: Router, private auth: AuthenticationService, private statusService: StatusCrudService) {}

  public ngOnInit() {
    this.dateOpening = '21 Avril à 16h00';
    this.getStatus();
  }

  login() {
    this.router.navigate(['/form-inscription']);
  }

  gotoFest() {
    this.router.navigate(['/festival']);
  }

  private getStatus() {
    const test = this.statusService.getStatusList();
    test.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();
        this.status = a;
      });
    });
  }

  logout() {
    this.auth.logout();
  }
}
