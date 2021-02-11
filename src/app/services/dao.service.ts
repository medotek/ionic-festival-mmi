import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Category } from './../Interfaces/category';
import { Oeuvre } from './../Interfaces/oeuvre';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}


@Injectable({
  providedIn: 'root'
})
export class DaoService {
  //Database
  dbList: AngularFireList<any>;
  dbObject: AngularFireObject<any>;

  //Storage
  fileUploadTask: AngularFireUploadTask;
  trackSnapshot: Observable<any>;
  
  // Image specifications
  imgName: string;
  imgSize: number;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  private filesCollection: AngularFirestoreCollection<imgFile>;

  constructor(private database: AngularFireDatabase, private storage: AngularFireStorage, private firestore: AngularFirestore) { 
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Define uploaded files collection
    this.filesCollection = firestore.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }


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
      auteur: o.auteur,
      categoryId: o.categoryId,
      url: o.url,
      date: o.date,
      voteNumber: 0,
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
      auteur: o.auteur,
      categoryId: o.categoryId,
      url: o.url,
      date: o.date,
      voteNumber: o.voteNumber,
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

  ////
  // GET BY CATEGORY NAME
  ////
  getByCategoryName(catName: string){
    this.dbList = this.database.list('/Oeuvre', ref => ref.orderByChild('categoryId').equalTo(catName));
    return this.dbList;
  }

  ////////////
  // IMAGE  //
  /////////////////////////////////////////////////////////////////////////////////////////////

  createImages(files: FileList, key: string) {
    console.log("CreateImages() dans le DAO");
    console.log(key);

    this.isFileUploading = true;
    this.isFileUploaded = false;

    let file: File;

    for (let i=0; i<files.length; i++) {
      file = files.item(i);

      this.imgName = file.name;

      // Storage path
      const fileStoragePath = `filesStorage/${key}/${i}`;

      // Image reference
      const imageRef = this.storage.ref(fileStoragePath);

      // File upload task
      this.fileUploadTask = this.storage.upload(fileStoragePath, file);

      // Show uploading progress
      this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
        
        finalize(() => {
          // Retreive uploaded image storage path
          this.UploadedImageURL = imageRef.getDownloadURL();
          
          this.UploadedImageURL.subscribe(resp=>{
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },error=>{
            console.log(error);
          })
        }),
        tap(snap => {
            this.imgSize = snap.totalBytes;
        })
      )
    }
  }

  storeFilesFirebase(image: imgFile) {
    const fileId = this.firestore.createId();
    
    this.filesCollection.doc(fileId).set(image).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
