import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { Users } from '../../Interfaces/users';
import {Menu} from '../menu';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
  providers: [Menu],
})
export class InvitationPage implements OnInit {

  words: any[] = [];
  word = '';
  cpt = 0;
  header;
  length = 0;
  nombre = 0;
  nbAjout = 0;
  URLrandom: string;
  unUser: Users = {
    Nom: '',
    Prenom: '',
    Email: '',
    Role: '',
    Image: '',
    Profession: '',
  };

  constructor(private auth: AuthenticationService, private router: Router, protected menu: Menu) { }

  ngOnInit() {
  }

  createUser(mail) {
    this.genererChaineAleatoire();
    this.auth.RegisterUser(mail, this.URLrandom).then(() => {
      this.auth.changePassword(mail).then(() => {
        this.nombre++;
        if (this.nbAjout === this.nombre) {
          alert('Nous avons envoyer les invitations !');
        }
      }).catch(error => {
        alert(error + ' ' + mail);
      });
    }).catch(error => {
      alert(error + ' ' + mail);
    });
  }

  sendMail(nom, prenom, mail, role, image, profession) {
    const name = nom.value;
    const firstname = prenom.value;
    const email = mail.value;
    const travaille = profession.value;
    let r;
    const i = image.value;
    if (role.checked === true) {
      r = 'jury';
    } else {
      r = 'public';
    }
    this.unUser = {
      Nom: name,
      Prenom: firstname,
      Email: email,
      Role: r,
      Image: i,
      Profession: travaille,
    };
    this.createUser(email);
    this.nbAjout = 1;
    this.addUserInformation(this.unUser);
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
            this.word = this.word.replace(/\n|\r/g, '');
            this.words[this.cpt] = this.word;
            this.cpt++;
            this.word = '';
          }
        }
        this.header = this.words[0].split(',');
        this.words.splice(0, 1);
        this.nbAjout = this.words.length;
        for (let i = 0; i < this.words.length; i++) {
          const obj = {};
          const currentline = this.words[i].split(',');
          for (let j = 0; j < this.header.length; j++) {
            obj[this.header[j]] = currentline[j];
          }
          this.retreiveMail(obj);
        }
      };
    }
  }

  retreiveMail(tabMail) {
    this.createUser(tabMail.Email);
    this.addUserInformation(tabMail);
  }

  addUserInformation(userInformation) {
    this.auth.createUser(userInformation);
  }

  genererChaineAleatoire()
  {
    this.strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 20,
      startsWithLowerCase: true
    });
  }

  strRandom(o) {
    let a = 10;
    const b = 'abcdefghijklmnopqrstuvwxyz';
    this.URLrandom = '';
    let d = 0;
    let e = '' + b;
    if (o) {
      if (o.startsWithLowerCase) {
        this.URLrandom = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      this.URLrandom += e[Math.floor(Math.random() * e.length)];
    }
  }

}
