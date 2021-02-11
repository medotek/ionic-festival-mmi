import {Component, OnInit} from '@angular/core';
import {CategorieCRUDService} from '../services/categorie-crud.service';
import {Category} from '../Interfaces/category';
import {DaoService} from './../services/dao.service';
import {Oeuvre} from 'src/app/Interfaces/oeuvre';
import {StatusCrudService} from '../services/status-crud.service';
import {Router} from '@angular/router';
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


    constructor(private router: Router,
                private categorieService: CategorieCRUDService,
                private dao: DaoService,
                private statusService: StatusCrudService,
                private auth: AuthenticationService) {
    }

    ngOnInit() {
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
                if (this.status === 'debut') {
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
