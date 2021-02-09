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

  constructor(private categorieService: CategorieCRUDService,) { }

  ngOnInit() {
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
