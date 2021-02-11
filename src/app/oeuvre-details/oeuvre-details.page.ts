import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaoService } from './../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-oeuvre-details',
  templateUrl: './oeuvre-details.page.html',
  styleUrls: ['./oeuvre-details.page.scss'],
})
export class OeuvreDetailsPage implements OnInit {

  private oeuvre: Oeuvre;
  private oeuvreKey;

  constructor(private route: ActivatedRoute, 
    private dao: DaoService,
    public alertController: AlertController,) { }

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
        auteur: o['auteur'],
        key: oeuvreId,
        categoryId: o['categoryId'],
        url: o['url'],
        voteNumber: o['voteNumber'],
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
    this.voteAlertConfirm();
  }

  async voteAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: "Êtes-vous sûre de vouloir voter pour l'oeuvre : <strong>" + this.oeuvre.name + "</strong> de <strong>" 
      + this.oeuvre.auteur + "</strong> ?",
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
            this.oeuvre.voteNumber += 1;
            console.log(this.oeuvre.voteNumber);
            console.log(this.oeuvreKey);
            this.dao.updateOeuvre(this.oeuvreKey, this.oeuvre);
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
