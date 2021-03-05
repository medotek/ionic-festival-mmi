import { Component, Injectable, OnInit } from '@angular/core';
import { Menu } from './menu'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  providers: [Menu ],
})
export class AdminPage implements OnInit {

  constructor(protected menu: Menu) { }

  ngOnInit() {
  }

}



