import { Injectable } from '@angular/core';
import { Category } from '../Interfaces/category';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategorieCRUDService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createCategory(newCategoryName: string) {
    return this.bookingListRef.push({
      name: newCategoryName,
    })
  }

  // Get Single
  getCategory(id: string) {
    this.bookingRef = this.db.object('/Categorie/' + id);
    return this.bookingRef;
  }

  // Get List
  getCategoryList() {
    this.bookingListRef = this.db.list('/Categorie');
    return this.bookingListRef;
  }

  // Update
  updateCategory(id, cat: Category) {
    return this.bookingRef.update({
      name: cat.name,
    })
  }

  // Delete
  deleteCategorie(id: string) {
    this.bookingRef = this.db.object('/Categorie/' + id);
    this.bookingRef.remove();
  }
}
