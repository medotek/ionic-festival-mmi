import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaoService } from './../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {StatusCrudService} from '../services/status-crud.service';

@Component({
  selector: 'app-oeuvre-details',
  templateUrl: './oeuvre-details.page.html',
  styleUrls: ['./oeuvre-details.page.scss'],
})
export class OeuvreDetailsPage implements OnInit {

  private oeuvre: Oeuvre;
  private oeuvreKey;
  status: any;

  constructor(private route: ActivatedRoute,
    private dao: DaoService,
              public alertController: AlertController,
              private auth: AuthenticationService,
              private statusService: StatusCrudService,
              private router: Router,) { }

  ngOnInit() {
     this.getStatus();
  }

  public getStatus() {
    let test = this.statusService.getStatusList();
    test.snapshotChanges().subscribe(res => {
        res.forEach(item => {
            let a = item.payload.toJSON();
            this.status = a;
            if (this.status == 'debut') {
                this.router.navigate(['/']);
            }
        });
    });

}
  ionViewWillEnter(){
    let oeuvreId = this.route.snapshot.paramMap.get('id');
    this.oeuvreKey = oeuvreId;
    let results = this.dao.getOeuvre(oeuvreId);
    results.snapshotChanges().subscribe(res => {
      let o = res.payload.toJSON();
      let testOeuvre: Oeuvre = {
        name: o['name'],
        auteur: o['auteur'],
        nbImages: o['auteur'],
        key: oeuvreId,
        categoryId: o['categoryId'],
        url: o['url'],
        description: o['description'],
        contributeurs: o['contributeurs'],
        technique: o['technique'],
        realisation: o['realisation'],
        date: o['date'],
        voteNumber: o['voteNumber']
      };
      this.oeuvre = testOeuvre;
    })
  }

  public vote(){
    console.log(this.oeuvreKey);
  }

  login() {
    this.router.navigate(['/form-inscription']);
  }

  logout() {
    this.auth.logout();
  }

  home() {
    this.router.navigate(['/']);
  }
}
