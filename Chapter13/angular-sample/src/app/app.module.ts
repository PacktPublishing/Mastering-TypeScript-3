import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RightscreenComponent } from './rightscreen/rightscreen.component';
import { SecureComponent } from './layout/secure/secure.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
} from 'angular-6-social-login-v2';

export function getAuthServiceConfig(): AuthServiceConfig {
    let config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(`<your client id goes here>`)
    }]);
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidenavComponent,
        RightscreenComponent,
        SecureComponent,
        LoginPanelComponent
    ],
    imports: [
        SocialLoginModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
