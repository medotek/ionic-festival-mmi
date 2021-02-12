import { Component, OnInit } from '@angular/core';
import { CategorieCRUDService } from '../services/categorie-crud.service';
import { Category } from '../Interfaces/category';
import { DaoService } from './../services/dao.service';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';
import { StatusCrudService } from '../services/status-crud.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-festival',
    templateUrl: './festival.page.html',
    styleUrls: ['./festival.page.scss'],
})
export class FestivalPage implements OnInit {

    private categories: Category[] = [];
    private oeuvres: Oeuvre[] = [];
    private allCategory: Category = {
        name: 'Toutes les participations',
        key: '0',
    };
    private status: any;
    private path: string;
    protected imagePath: Map<string, string>;


    constructor(private router: Router,
        private categorieService: CategorieCRUDService,
        private dao: DaoService,
        private statusService: StatusCrudService,
        private auth: AuthenticationService) {
    }

    ngOnInit() {
        this.imagePath = new Map();

        this.categories.push(this.allCategory);
        this.getCategories();
        this.getOeuvres();
        this.getStatus();
    }

    public getStatus() {
        let test = this.statusService.getStatusList();
        test.snapshotChanges().subscribe(res => {
            res.forEach(item => {
                let a = item.payload.toJSON();
                this.status = a;
                if (this.status == 'debut') {
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

    public getOeuvres() {
        let results = this.dao.getOeuvreList();
        results.snapshotChanges().subscribe(res => {
            this.oeuvres = [];
            res.forEach(item => {
                let o = item.payload.toJSON();
                o['key'] = item.key;
                this.oeuvres.push(o as Oeuvre);
                this.getImage(o as Oeuvre);
            });
        });
    }

    public categoryName(maCategorie: Category) {
        if (maCategorie.key != '0') {

            let results = this.dao.getByCategoryName(maCategorie.name);
            results.snapshotChanges().subscribe(res => {
                this.oeuvres = [];
                res.forEach(item => {
                    let o = item.payload.toJSON();
                    o['key'] = item.key;
                    this.oeuvres.push(o as Oeuvre);
                });
            });
        } else {
            this.getOeuvres();
        }
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

    login() {
        this.router.navigate(['/form-inscription']);
    }

    gotoResult() {
        this.router.navigate(['/palmares']);
    }

    logout() {
        this.auth.logout();
    }

    home() {
        this.router.navigate(['/']);
    }

}
