import { Oeuvre } from './../Interfaces/oeuvre';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

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
      id: o.id,
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

  getOeuvre(id: number) {
    this.dbObject = this.database.object('/Oeuvre/'+ id.toString());
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

  updateOeuvre(id, o: Oeuvre) {
    return this.dbObject.update({
      id: o.id,
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

  deleteOeuvre(id: number) {
    this.dbObject = this.database.object('/Oeuvre/'+ id.toString());
    return this.dbObject.remove();
  }

}
