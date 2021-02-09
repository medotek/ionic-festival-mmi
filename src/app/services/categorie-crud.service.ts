import { Injectable } from '@angular/core';
import { Category } from '../Interfaces/category';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategorieCRUDService {
  categoryListRef: AngularFireList<any>;
  categoryRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createCategory(newCategoryName: string) {
    return this.categoryListRef.push({
      name: newCategoryName,
    })
  }

  // Get Single
  getCategory(id: string) {
    this.categoryRef = this.db.object('/Categorie/' + id);
    return this.categoryRef;
  }

  // Get List
  getCategoryList() {
    this.categoryListRef = this.db.list('/Categorie');
    return this.categoryListRef;
  }

  // Update
  updateCategory(id, cat: Category) {
    return this.categoryRef.update({
      name: cat.name,
    })
  }

  // Delete
  deleteCategorie(id: string) {
    this.categoryRef = this.db.object('/Categorie/' + id);
    this.categoryRef.remove();
  }

  //Get by name
  getByName(name: string){
    this.categoryListRef = this.db.list('/Categorie', ref => ref.orderByChild('name').equalTo(name));
    return this.categoryListRef;
  }
}
