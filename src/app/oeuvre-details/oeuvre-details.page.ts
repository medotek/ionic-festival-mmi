import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaoService } from './../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';

@Component({
  selector: 'app-oeuvre-details',
  templateUrl: './oeuvre-details.page.html',
  styleUrls: ['./oeuvre-details.page.scss'],
})
export class OeuvreDetailsPage implements OnInit {

  private oeuvre: Oeuvre;

  constructor(private route: ActivatedRoute, private dao: DaoService,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    let oeuvreId = this.route.snapshot.paramMap.get('id');
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
      };
      this.oeuvre = testOeuvre;
    })
  }

}
