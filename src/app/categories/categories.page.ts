import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Category } from '../Interfaces/category';
import { CategorieCRUDService } from './../services/categorie-crud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  private categories: Category[] = [];
  private newCategory: string;

  private categorieSelect: string;

  constructor(public database: AngularFireDatabase, 
    private categorieService: CategorieCRUDService,
    public fb: FormBuilder,
    public alertController: AlertController) { }

  ngOnInit() {
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

  public add(){
    if(this.newCategory){
      this.categorieService.createCategory(this.newCategory);
      window.location.reload();
    }
  }

  public delete(){
    if(this.categorieSelect){
      this.deleteAlertConfirm();
    }
  }

  async deleteAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Êtes-vous sûre de vouloir supprimer la catégorie : <strong>' + this.categorieSelect.name + '</strong> ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Ne pas supprimer');
          }
        }, {
          text: 'Oui',
          handler: () => {
            console.log('Supprimer');
            this.categorieService.deleteCategorie(this.categorieSelect.key);
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
