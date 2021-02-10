import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StatusCrudService {
  categoryListRef: AngularFireList<any>;
  categoryRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Get Single
  getCategory(id: string) {
    this.categoryRef = this.db.object('/Status/' + id);
    return this.categoryRef;
  }

  // Get List
  getCategoryList() {
    this.categoryListRef = this.db.list('/Status');
    return this.categoryListRef;
  }

  // Update
  updateCategory(id, cat: string) {
    return this.categoryRef.update({
      name: cat,
    })
  }

}
