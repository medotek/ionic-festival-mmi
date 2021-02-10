import { Category } from './../../Interfaces/category';
import { DaoService } from './../../services/dao.service';
import { Menu } from './../menu';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.page.html',
  styleUrls: ['./oeuvre.page.scss'],
  providers: [Menu ],
})
export class OeuvrePage implements OnInit {
  //Page building
  form: FormGroup;
  updateMode: boolean = false;

  //Content
  categories: Category[];
  selectedCategorie: string;
  oeuvres: Oeuvre[];
  selected: Oeuvre = null;


  constructor(protected menu: Menu, private dao: DaoService, private router: Router, public fb: FormBuilder, private alertController:AlertController) {}

  ngOnInit(): void {
    //Formulaire
    this.form = this.fb.group({
      name: [''],
      categoryId: [''],
      url: [''],
      date: [''],
      voteId: [''],
      description: [''],
      contributeurs: [''],
      realisation: [''],
      technique: [''],
    })

    this.fetchOeuvres();
    this.fetchCategories();
    
  }

  formSubmit() {
    console.log(this.form.value);
    if(!this.form.valid) {
      return false;
    } else {
      if(this.updateMode) {
        this.dao.updateOeuvre(this.selected.key, this.form.value).then(res => {
          this.onSwitchMode(null);
        })
      } else {
        this.dao.createOeuvre(this.form.value).then(res => {
          this.form.reset();
        })
        .catch(error => console.log(error));
      }
    }
  }

  fetchOeuvres() {
    let results = this.dao.getOeuvreList();
    results.snapshotChanges().subscribe(res => {
      this.oeuvres = [];
      res.forEach(item => {
        let o = item.payload.toJSON();
        o['key'] = item.key;
        this.oeuvres.push(o as Oeuvre);
        console.log(this.oeuvres);
      })
    })
  }

  fetchCategories() {
    let results = this.dao.getCategorieList();
    results.snapshotChanges().subscribe(res => {
      this.categories = [];
      res.forEach(item => {
        let a = item.payload.toJSON();

        let c: Category = {
          name: '',
          key: '',
        };

        c.key = item.key;
        c.name = a['name'];
        this.categories.push(c as Category);
      })
    })
  }

  async onDelete(key: string) {
    const deletion = await this.deleteAlertPrompt();

    //Break out since they hit cancel
    if(!deletion) return;

    //Continue
    console.log("Suppression de l'élément...");
    this.dao.deleteOeuvre(key);
  }

  onSwitchMode(key: string) {
    if(!this.updateMode) {
      console.log("Passage en mode update...");
      this.updateMode = true;
      this.dao.getOeuvre(key).snapshotChanges().subscribe(item => {
        let o = item.payload.toJSON();
        o['key'] = item.key;
        this.selected = (o as Oeuvre);
        this.updateForm(this.selected);
      });
    } else {
      if(key != null && this.selected.key != key) {
        this.dao.getOeuvre(key).snapshotChanges().subscribe(item => {
        let o = item.payload.toJSON();
        o['key'] = item.key;
        this.selected = (o as Oeuvre);
        this.updateForm(this.selected);
        });
      } else {
        console.log("Passage en mode create...");
        this.updateMode = false;
        this.selected = null;
        this.form.reset();
      }
    }
  }

  updateForm(o: Oeuvre): void {
    this.form = this.fb.group({
      name: [o.name],
      categoryId: [o.categoryId],
      url: [o.url],
      date: [o.date],
      voteId: [o.voteId],
      description: [o.description],
      contributeurs: [o.contributeurs],
      realisation: [o.realisation],
      technique: [o.technique],
    });
  }

  async deleteAlertPrompt() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'alert-delete',
        header: 'Supprimer',
        subHeader: 'Voulez-vous vraiment supprimer cet élement?',
        message: "La suppression d'un objet est définitive.",
        buttons: [{
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return resolve(false);
          },
        }, 
        {
          text: 'Supprimer',
          handler: () => {
            return resolve(true);
          },
        }]
      });  

      await alert.present();
    });
    
  }

}
