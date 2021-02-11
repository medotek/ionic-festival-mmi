import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../Interfaces/users';
import { AuthenticationService} from '../services/authentication.service';
import { DaoService } from '../services/dao.service';
import {StatusCrudService} from '../services/status-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private user:Users;
  dateOpening: string;
  email: '';
  private status: any;
  private jury : Users[] = [];

  constructor(private router: Router,  private dao: DaoService, private auth: AuthenticationService, private statusService: StatusCrudService) {}

  public ngOnInit() {
    this.dateOpening = '21 Avril à 16h00';
    this.getStatus();
  }

  public getJury() {
    let listJury = this.dao.getJury();
    listJury.snapshotChanges().subscribe(res => {
        res.forEach(item => {
            let a = item.payload.toJSON();

            let monJury: Users = {
              Nom: '',
              Prenom: '',
              Email: '',
              Role: '',
              Image: '',
              Profession: '',
            };

            monJury.Nom =  a['nom'];
            monJury.Prenom = a['prenom'];
            monJury.Profession = a['profession'];
            this.jury.push(monJury);
        });
    });
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
