import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { CategorieCRUDService } from '../../services/categorie-crud.service';
import { Category } from '../../Interfaces/category';
import { DaoService } from './../../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrixCategorie } from './../../Interfaces/prix-categorie';
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
  public commentaire: string;
  
  constructor(protected menu: Menu,
    private categorieService: CategorieCRUDService,
    private dao: DaoService,
    public fb: FormBuilder,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      auteur: [''],
      categoryId: [''],
    });
    this.commentaire = '';
    this.getCategories();
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

    let prix: PrixCategorie = {
      name: cat.name,
      commentaire: this.commentaire,
      oeuvreId: monOeuvre.key,
    };
    this.voteAlertConfirm(prix, monOeuvre)
  }

  async voteAlertConfirm(lePrix, oeuvre) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: "Êtes-vous sûre de vouloir attribuer le prix : <strong>" + lePrix.name + "</strong> à l'oeuvre : <strong>" + 
      oeuvre.name + "</strong> ?",
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Ne pas voter');
          }
        }, {
          text: 'Oui',
          handler: () => {
            console.log('Voter');
            this.dao.createPrix(lePrix);
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
