import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login-v2';

@Component({
    selector: 'app-login-panel',
    templateUrl: './login-panel.component.html',
    styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {
    username: string;
    password: string;
    error: string;

    ngOnInit() {
    }

    constructor(private userService: UserService, private router: Router, private socialAuthService: AuthService) { }

    onLoginClicked() {
        console.log(`LoginPanelComponent : this.username : ${this.username}`);

        this.userService.authenticateUser(this.username, this.password).subscribe((response: any) => {
            console.log(`LoginPanelCompenent : response : ${JSON.stringify(response)}`);
            localStorage.setItem('token', response);
            this.router.navigate([``]);
        }, (err) => {
            console.log(`onLoginClicked() : error : ${JSON.stringify(err, null, 4)}`);
            this.error = `${err.message}`;
        }, () => {
            // finally
            console.log(`finally.`);
        });
    }

    onLoginGoogleClicked() {
        console.log(`LoginPanelComponent : onLoginGoogleClicked()`);
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userdata) => {

            this.userService.authenticateGoogleUser(userdata).subscribe((response: any) => {
                console.log(`LoginPanelCompenent : response : ${JSON.stringify(response)}`);
                localStorage.setItem('token', response);
                this.router.navigate([``]);
            }, (err) => {
                console.log(`onLoginClicked() : error : ${JSON.stringify(err, null, 4)}`);
                this.error = `${err.message}`;
            });

        }).catch((error) => {
            console.log(`error : ${error}`);
        });
    }

}
