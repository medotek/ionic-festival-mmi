import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { StatusCrudService } from './../../services/status-crud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.page.html',
  styleUrls: ['./statut.page.scss'],
  providers: [Menu ],
})
export class StatutPage implements OnInit {

  private currentStatus: any;
  private newStatut: any;

  constructor(protected menu: Menu,
    private statusService: StatusCrudService,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.getStatus();
  }

  public getStatus(){
    let test = this.statusService.getStatusList();
    test.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();
        switch (a) {
          case 'debut':
            this.currentStatus = 'Début';
            break;
          case 'enCours':
            this.currentStatus = 'En cours';
            break;
          case 'votesFermes':
            this.currentStatus = 'Votes Fermés';
            break;
          case 'resultats':
            this.currentStatus = 'Résultats';
            break;
          default:
            break;
        }
      })
    })
  }

  public updateStatus(){
    this.updateStatusAlertConfirm();
  }

  async updateStatusAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Êtes-vous sûre de vouloir modifier le statut : <strong>' + this.currentStatus + '</strong> en <strong>' 
      + this.newStatut + '</strong> ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Ne pas modifier');
          }
        }, {
          text: 'Oui',
          handler: () => {
            console.log('modifier');
            this.statusService.updateStatus(this.newStatut);
          }
        }
      ]
    });

    await alert.present();
  }

}
