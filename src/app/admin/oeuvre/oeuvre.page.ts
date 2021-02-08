import { DaoService } from './../../services/dao.service';
import { Menu } from './../menu';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.page.html',
  styleUrls: ['./oeuvre.page.scss'],
  providers: [Menu ],
})
export class OeuvrePage implements OnInit {
  form: FormGroup;

  constructor(protected menu: Menu, private dao: DaoService, private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      categoryId: [''],
      url: [''],
      voteId: [''],
      description: ['']
    })
  }

  formSubmit() {
    if(!this.form.valid) {
      return false;
    } else {
      this.dao.createOeuvre(this.form.value).then(res => {
        console.log(res);
        this.form.reset();
      })
        .catch(error => console.log(error));
    }
  }

}
