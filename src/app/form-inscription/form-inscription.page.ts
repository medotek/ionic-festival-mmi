import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
    selector: 'app-form-inscription',
    templateUrl: './form-inscription.page.html',
    styleUrls: ['./form-inscription.page.scss'],
})
export class FormInscriptionPage implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private authentication: AuthenticationService) {
    }

    ngOnInit() {
    }

    signUp(email, password){
        this.authentication.SignIn(email.value, password.value)
            .then((res) => {
                this.router.navigate(['/home']);
            }).catch((error) => {
            window.alert(error.message);
        });
    }

    changePassword() {
        this.router.navigate(['/forgot-password']);
    }
}
