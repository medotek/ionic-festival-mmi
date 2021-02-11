import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DaoService, imgFile} from './../services/dao.service';
import {Oeuvre} from 'src/app/Interfaces/oeuvre';
import {AlertController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {StatusCrudService} from '../services/status-crud.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-oeuvre-details',
    templateUrl: './oeuvre-details.page.html',
    styleUrls: ['./oeuvre-details.page.scss'],
})
export class OeuvreDetailsPage implements OnInit {

  protected oeuvre: Oeuvre;
  private oeuvreKey;
  status: any;
  protected imagePath: string;
  protected path: string = "";
  voteUser = true;
  unUser;
  userKey;

  constructor(private route: ActivatedRoute,
    private dao: DaoService,
    public alertController: AlertController,
    private auth: AuthenticationService,
    private statusService: StatusCrudService,
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getStatus();
    this.getUserVote();
  }

  public getStatus() {
      let test = this.statusService.getStatusList();
      test.snapshotChanges().subscribe(res => {
          res.forEach(item => {
              let a = item.payload.toJSON();
              this.status = a;
              if (this.status === 'debut') {
                  this.router.navigate(['/']);
              }
          });
      });

  }

    public getUserVote() {
        const mail = this.auth.getCurrentUser();
        const listUser = this.auth.getAllUser();
        listUser.snapshotChanges().subscribe(res => {
            res.forEach(item => {
                const a = item.payload.toJSON();

                if (a.mail === mail) {
                    if (a.voteToken <= 0) {
                        console.log('je suis la');
                        this.voteUser = false;
                    }
                }
            });
        });
    }

  ionViewWillEnter() {
    let oeuvreId = this.route.snapshot.paramMap.get('id');
    this.oeuvreKey = oeuvreId;
    let results = this.dao.getOeuvre(oeuvreId);
    results.snapshotChanges().subscribe(res => {
        let o = res.payload.toJSON();
        let testOeuvre: Oeuvre = {
            name: o['name'],
            auteur: o['auteur'],
            nbImages: o['auteur'],
            key: oeuvreId,
            categoryId: o['categoryId'],
            url: o['url'],
            description: o['description'],
            contributeurs: o['contributeurs'],
            technique: o['technique'],
            realisation: o['realisation'],
            date: o['date'],
            voteNumber: o['voteNumber']
        };
        this.oeuvre = testOeuvre;
        this.getImage(this.oeuvre);
        console.log(this.oeuvre);
    });
  }

  //Retourne l'url de la miniature d'une oeuvre
  public getImage(o: Oeuvre): void {

    switch (o.categoryId) {
        case "Photo":
            this.dao.getImage(o.key).subscribe(res => {
              let image = res.payload.data();
              console.log(image);
              this.path = image.filepath != "" ? image.filepath : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png";
            })            
            break;
        case "Web":
            this.path = `https://api.thumbnail.ws/api/abfcd13f120af04d2a4f7e80cd2fbf434e250fa02f4b/thumbnail/get?url=${o.url}&width=640`;
            break;
        case "Animation":
            let url = this.youtube_parser(o.url) ? "https://i.ytimg.com/vi/"+this.youtube_parser(o.url)+"/hq3.jpg" : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png";
            this.path = url as string;
            break;
        default:
            this.path = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
            break;
    }
  }

  youtube_parser(url: string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  public vote() {
      const mail = this.auth.getCurrentUser();
      const listUser = this.auth.getAllUser();
      listUser.snapshotChanges().subscribe(res => {
          res.forEach(item => {
              const a = item.payload.toJSON();

              if (a.mail === mail) {
                  this.userKey = item.key;
                  this.unUser = a;
                  this.voteAlertConfirm();
                      // console.log(r.voteToken);
              }
          });
      });
  }

    async voteAlertConfirm() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirmation',
            message: 'Êtes-vous sûre de vouloir voter la catégorie voter pour cette oeuvre ?',
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
                        this.auth.updateUser(this.userKey, this.unUser);
                        window.location.reload();
                    }
                }
            ]
        });

        await alert.present();
    }

  login() {
      this.router.navigate(['/form-inscription']);
  }

  logout() {
      this.auth.logout();
  }

  home() {
      this.router.navigate(['/']);
  }
}
