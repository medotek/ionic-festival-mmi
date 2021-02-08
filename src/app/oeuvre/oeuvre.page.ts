import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.page.html',
  styleUrls: ['./oeuvre.page.scss'],
})
export class OeuvrePage implements OnInit {

  private path: string = "";
  private url: string = "";
  public image = null;

  constructor(public database: AngularFireDatabase, public storage: AngularFireStorage) { }

  ngOnInit() {
    this.getImage('/filesStorage/1612536094622_hahahaguda.PNG');
  }

  getImage(path: string) {
    this.storage.ref(path).getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.url = imgUrl;
    });
  }

}
