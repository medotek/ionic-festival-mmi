import { Component, OnInit } from '@angular/core';
import {Category} from '../Interfaces/category';
import {Oeuvre} from '../Interfaces/oeuvre';
import {Router} from '@angular/router';
import {CategorieCRUDService} from '../services/categorie-crud.service';
import {StatusCrudService} from '../services/status-crud.service';

@Component({
  selector: 'app-palmares',
  templateUrl: './palmares.page.html',
  styleUrls: ['./palmares.page.scss'],
})
export class PalmaresPage implements OnInit {

  private categories: Category[] = [];
  private statusService: any;
  private status: any;

  constructor(private router: Router,
              private categorieService: CategorieCRUDService,
              private statusService: StatusCrudService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public getStatus() {
    let test = this.statusService.getStatusList();
    test.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();
        this.status = a;
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

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  login() {
    this.router.navigate(['/form-inscription']);
  }
  home() {
    this.router.navigate(['/']);
  }


}
