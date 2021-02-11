import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaoService } from './../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oeuvre-details',
  templateUrl: './oeuvre-details.page.html',
  styleUrls: ['./oeuvre-details.page.scss'],
})
export class OeuvreDetailsPage implements OnInit {

  private oeuvre: Oeuvre;
  private oeuvreKey;

  constructor(private route: ActivatedRoute, private dao: DaoService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    let oeuvreId = this.route.snapshot.paramMap.get('id');
    this.oeuvreKey = oeuvreId;
    let results = this.dao.getOeuvre(oeuvreId);
    results.snapshotChanges().subscribe(res => {
      let o = res.payload.toJSON();
      let testOeuvre: Oeuvre = {
        name: o['name'],
        key: oeuvreId,
        categoryId: o['categoryId'],
        url: o['url'],
        voteId: o['voteId'],
        description: o['description'],
        contributeurs: o['contributeurs'],
        technique: o['technique'],
        realisation: o['realisation'],
        date: o['date'],
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

}
