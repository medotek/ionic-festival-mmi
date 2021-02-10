import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.page.html',
  styleUrls: ['./statut.page.scss'],
  providers: [Menu ],
})
export class StatutPage implements OnInit {

  constructor(protected menu: Menu,) { }

  ngOnInit() {
  }

}
