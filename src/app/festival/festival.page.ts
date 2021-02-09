import { Component, OnInit } from '@angular/core';
import { CategorieCRUDService } from '../services/categorie-crud.service';
import { Category } from '../Interfaces/category';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.page.html',
  styleUrls: ['./festival.page.scss'],
})
export class FestivalPage implements OnInit {

  private categories: Category[] = [];
  private allCategory: Category = {
    name: "Toutes les participations",
    key: "0",
  };

  constructor(private categorieService: CategorieCRUDService,) { }

  ngOnInit() {
    this.categories.push(this.allCategory);
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

}
