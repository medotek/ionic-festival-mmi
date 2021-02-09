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
  form: FormGroup;
  oeuvres: Oeuvre[];

  constructor(protected menu: Menu, private dao: DaoService, private router: Router, public fb: FormBuilder, private alertController:AlertController) {}

  ngOnInit(): void {
    //Formulaire
    this.form = this.fb.group({
      name: [''],
      categoryId: [''],
      url: [''],
      voteId: [''],
      description: [''],
      contributeurs: [''],
    })

    this.fetchOeuvres();
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

  formSubmit() {
    if(!this.form.valid) {
      return false;
    } else {
      this.dao.createOeuvre(this.form.value).then(res => {
        this.form.reset();
      })
        .catch(error => console.log(error));
    }
  }

  fetchOeuvres() {
    this.dao.getOeuvreList().valueChanges().subscribe(res => {
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
