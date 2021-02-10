import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {

  words: any[] = [];
  word = '';
  cpt = 0;
  object: any[] = [];
  header;
  indice = 0;
  length = 0;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  createUser(mail) {
    this.auth.RegisterUser(mail.value, '000null').then(() => {
      this.auth.changePassword(mail.value).then(() => {
        alert('Création du participant et mail pour inscription envoyé');
      }).catch(error => {
        alert(error);
      });
    }).catch(error => {
      alert(error);
    });
  }

  public changeListener(event) {
    let files: FileList;
    files = event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const csv: string = reader.result as string;
        for (let i = 0; i <= csv.length; i++) {
          if (csv[i] !== '\n') {
            this.word = this.word + csv[i];
          } else {
            this.words[this.cpt] = this.word;
            this.cpt++;
            this.word = '';
          }
        }
        this.header = this.words[0].split(',');
        console.log(this.header);
        this.words.splice(0, 1);
        for (let i = 0; i < this.words.length; i++) {
          const obj = {};
          const currentline = this.words[i].split(',');
          for (let j = 0; j < this.header.length; j++) {
            obj[this.header[j]] = currentline[j];
          }
          // this.retreiveMail(obj);
        }
      };
    }
  }

  /* retreiveMail(tabMail) {
    console.log(tabMail);
    console.log(tabMail.Nom);
  } */

}
