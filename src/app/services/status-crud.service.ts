import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StatusCrudService {
  statusListRef: AngularFireList<any>;
  statusRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Get Single
  getStatus(id: string) {
    this.statusRef = this.db.object('/Status/' + id);
    return this.statusRef;
  }

  // Get List
  getStatusList() {
    this.statusListRef = this.db.list('/Status');
    return this.statusListRef;
  }

  // Update
  updateStatus(id, cat: string) {
    return this.statusRef.update({
      name: cat,
    })
  }

}
