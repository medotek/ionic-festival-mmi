import { Component, OnInit } from '@angular/core';
import {Category} from '../Interfaces/category';
import {Oeuvre} from '../Interfaces/oeuvre';
import {Router} from '@angular/router';
import {CategorieCRUDService} from '../services/categorie-crud.service';
import {DaoService} from './../services/dao.service';
import { PrixCategorie } from './../Interfaces/prix-categorie';

@Component({
  selector: 'app-palmares',
  templateUrl: './palmares.page.html',
  styleUrls: ['./palmares.page.scss'],
})
export class PalmaresPage implements OnInit {

  private categories: Category[] = [];
  public listPrix: PrixCategorie[] = [];
  public listOeuvre: Oeuvre[] = [];
  status: any;
  statusService: any;
  
  constructor(private router: Router,
              private categorieService: CategorieCRUDService,
              private dao: DaoService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getPrixCategorie();
    this.getStatus();
  }

  public getStatus() {
    let test = this.statusService.getStatusList();
    test.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();
        this.status = a;
        if (this.status !== 'resultats') {
          this.router.navigate(['/']);
        }
      });
    });
  }

  public getCategories() {
    let listCategorie = this.categorieService.getCategoryList();
    listCategorie.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();

        let maCategorie: Category = {
          name: '',
          key: '',
        };

        maCategorie.key = item.key;
        maCategorie.name = a['name'];
        this.categories.push(maCategorie);
      });
    });
  }

  public getPrixCategorie(){
    let listPrixParCategorie = this.dao.getPrixList();
    listPrixParCategorie.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();

        let lePrix: PrixCategorie = {
          name: '',
          commentaire: '',
          oeuvreId: '',
        };

        lePrix.name = a['name'];
        lePrix.commentaire = a['commentaire'];
        lePrix.oeuvreId = a['oeuvreId'];
        console.log(lePrix);
        this.listPrix.push(lePrix);
        this.getOeuvre(lePrix.oeuvreId);
      });

    });
  }

  public getOeuvre(key: string){
    let results = this.dao.getOeuvre(key);
    results.snapshotChanges().subscribe(res => {
      let o = res.payload.toJSON();
      let monOeuvre: Oeuvre = {
        name: o['name'],
        auteur: o['auteur'],
        nbImages: o['auteur'],
        key: key,
        categoryId: o['categoryId'],
        url: o['url'],
        description: o['description'],
        contributeurs: o['contributeurs'],
        technique: o['technique'],
        realisation: o['realisation'],
        date: o['date'],
        voteNumber: o['voteNumber']
      };
      console.log(monOeuvre);
      this.listOeuvre.push(monOeuvre);
    })

  }

  home() {
    this.router.navigate(['/']);
  }

}
