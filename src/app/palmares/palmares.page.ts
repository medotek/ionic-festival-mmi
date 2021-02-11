import { Component, OnInit } from '@angular/core';
import { Category } from '../Interfaces/category';
import { Oeuvre } from '../Interfaces/oeuvre';
import { Router } from '@angular/router';
import { CategorieCRUDService } from '../services/categorie-crud.service';
import { DaoService } from './../services/dao.service';
import { PrixCategorie } from './../Interfaces/prix-categorie';
import { StatusCrudService } from '../services/status-crud.service';
import { AuthenticationService } from '../services/authentication.service';

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
  private path: string;
  protected imagePath: Map<string, string>;

  constructor(private router: Router,
    private categorieService: CategorieCRUDService,
    private dao: DaoService,
    private statusService: StatusCrudService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.imagePath = new Map();
    this.getStatus();
    this.getCategories();
    this.getPrixCategorie();
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
        maCategorie.name = a['name'].toLowerCase();
        this.categories.push(maCategorie);
      });
    });
  }

  public getPrixCategorie() {
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
        this.listPrix.push(lePrix);
        this.getOeuvre(lePrix.oeuvreId);
      });

    });
  }

  public getOeuvre(key: string) {
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
      this.getImage(o as Oeuvre);
      this.listOeuvre.push(monOeuvre);
    })

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
            let url = this.youtube_parser(o.url) ? "https://i.ytimg.com/vi/" + this.youtube_parser(o.url) + "/hq3.jpg" : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png";
            this.path = url as string;
            break;
        default:
            this.path = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
            break;
    }
    console.log(this.path);
    this.imagePath.set(o.key, this.path);
}

  youtube_parser(url: string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }


  home() {
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/form-inscription']);
  }

  logout() {
    this.auth.logout();
  }
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


}
