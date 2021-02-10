import { Category } from './../Interfaces/category';
import { Oeuvre } from './../Interfaces/oeuvre';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaoService {
  dbList: AngularFireList<any>;
  dbObject: AngularFireObject<any>;

  constructor(private database: AngularFireDatabase) { }


  //////////////////
  //  CATEGORIES  //
  /////////////////////////////////////////////////////////////////////////////////////////////

  createCategorie(newCategoryName: string) {
    return this.dbList.push({
      name: newCategoryName,
    })
  }

  getCategorie(id: string) {
    this.dbObject = this.database.object('/Categorie/' + id);
    return this.dbObject;
  }

  getCategorieList() {
    this.dbList = this.database.list('/Categorie');
    return this.dbList;
  }

  updateCategorie(id, cat: Category) {
    this.dbObject = this.database.object('/Categorie/' + id);
    return this.dbObject.update({
      name: cat.name,
    })
  }

  deleteCategorie(id: string) {
    this.dbObject = this.database.object('/Categorie/' + id);
    this.dbObject.remove();
  }

  getCategorieByName(name: string){
    this.dbList = this.database.list('/Categorie', ref => ref.orderByChild('name').equalTo(name));
    return this.dbList;
  }

  /////////////
  // OEUVRE  //
  /////////////////////////////////////////////////////////////////////////////////////////////

  createOeuvre(o: Oeuvre) {
    this.dbList = this.database.list('/Oeuvre');
    console.log(this.dbList);
    return this.dbList.push({
      name: o.name,
      categoryId: o.categoryId,
      url: o.url,
      date: o.date,
      voteId: o.voteId,
      description: o.description,
      contributeurs: o.contributeurs,
      realisation: o.realisation,
      technique: o.technique,
    })
  }

  getOeuvre(key: string) {
    this.dbObject = this.database.object('/Oeuvre/'+ key);
    return this.dbObject;
  }

  getOeuvreList() {
    this.dbList = this.database.list('/Oeuvre');
    return this.dbList;
  }

  updateOeuvre(key: string, o: Oeuvre) {
    this.dbObject = this.database.object('/Oeuvre/'+ key);
    return this.dbObject.update({
      name: o.name,
      categoryId: o.categoryId,
      url: o.url,
      date: o.date,
      voteId: o.voteId,
      description: o.description,
      contributeurs: o.contributeurs,
      realisation: o.realisation,
      technique: o.technique,
    })
  }

  deleteOeuvre(key: string) {
    this.dbObject = this.database.object('/Oeuvre/'+ key);
    return this.dbObject.remove();
  }
}
