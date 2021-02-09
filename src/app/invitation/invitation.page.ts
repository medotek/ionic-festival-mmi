import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {

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

}
