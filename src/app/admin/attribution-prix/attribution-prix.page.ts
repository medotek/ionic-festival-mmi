import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { CategorieCRUDService } from '../../services/categorie-crud.service';
import { Category } from '../../Interfaces/category';
import { DaoService } from './../../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-attribution-prix',
  templateUrl: './attribution-prix.page.html',
  styleUrls: ['./attribution-prix.page.scss'],
  providers: [Menu, ]
})
export class AttributionPrixPage implements OnInit {

  private categories: Category[] = [];
  private oeuvres: Oeuvre[];
  public categorySelected: Category;
  public oeuvreSelected: Oeuvre;
  public form: FormGroup;
  public attributions: any[];

  constructor(protected menu: Menu,
    private categorieService: CategorieCRUDService,
    private dao: DaoService,
    public fb: FormBuilder,) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      auteur: [''],
      categoryId: [''],
    });
    this.getCategories();
    //this.getOeuvres();
  }

  public getCategories(){
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
      })
    })
  }

  public getOeuvres() {
    console.log(this.categorySelected.name);
    let results = this.dao.getByCategoryName(this.categorySelected.name);
    results.snapshotChanges().subscribe(res => {
      this.oeuvres = [];
      res.forEach(item => {
        let o = item.payload.toJSON();
        o['key'] = item.key;
        this.oeuvres.push(o as Oeuvre);
      })
    })
  }

  public vote(cat:Category, monOeuvre?:Oeuvre){

    console.log('voté');
    if(monOeuvre){
      console.log("Pour " + cat.name + " : " + monOeuvre.name);
    }
  }

}
