import { DaoService } from './../../services/dao.service';
import { Menu } from './../menu';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Oeuvre } from 'src/app/Interfaces/oeuvre';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.page.html',
  styleUrls: ['./oeuvre.page.scss'],
  providers: [Menu ],
})
export class OeuvrePage implements OnInit {
  form: FormGroup;
  oeuvres: Oeuvre[];

  constructor(protected menu: Menu, private dao: DaoService, private router: Router, public fb: FormBuilder) {}

  ngOnInit(): void {
    //Formulaire
    this.form = this.fb.group({
      name: [''],
      categoryId: [''],
      url: [''],
      voteId: [''],
      description: ['']
    })

    this.fetchOeuvres();
    let results = this.dao.getOeuvreList();
    results.snapshotChanges().subscribe(res => {
      this.oeuvres = [];
      res.forEach(item => {
        let o = item.payload.toJSON();
        o['$key'] = item.key;
        this.oeuvres.push(o as Oeuvre);
      })
    })

  }

  formSubmit() {
    if(!this.form.valid) {
      return false;
    } else {
      this.dao.createOeuvre(this.form.value).then(res => {
        this.form.reset();
      })
        .catch(error => console.log(error));
    }
  }

  fetchOeuvres() {
    this.dao.getOeuvreList().valueChanges().subscribe(res => {
    })
  }

  onDelete(key: string): void {
    //TODO: key is undefined
    console.log("delete item: "+key);
  }

}
