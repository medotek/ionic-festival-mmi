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

  ////
  // CREATE
  ////

  createOeuvre(o: Oeuvre) {
    this.dbList = this.database.list('/Oeuvre');
    console.log(this.dbList);
    return this.dbList.push({
      name: o.name,
      categoryId: o.categoryId,
      url: o.url,
      voteId: o.voteId,
      description: o.description
    })
  }

  ////
  // GET
  ////

  //ONE OBJECT

  getOeuvre(key: string) {
    this.dbObject = this.database.object('/Oeuvre/'+ key);
    return this.dbObject;
  }

  //ALL OBJECTS
  getOeuvreList() {
    this.dbList = this.database.list('/Oeuvre');
    return this.dbList;
  }

  ////
  // UPDATE
  ////

  updateOeuvre(key: string, o: Oeuvre) {
    //TODO: Recuperer l'objet 
    return this.dbObject.update({
      name: o.name,
      categoryId: o.categoryId,
      url: o.url,
      voteId: o.voteId,
      description: o.description
    })
  }

  ////
  // DELETE
  ////

  deleteOeuvre(key: string) {
    this.dbObject = this.database.object('/Oeuvre/'+ key);
    return this.dbObject.remove();
  }
}
