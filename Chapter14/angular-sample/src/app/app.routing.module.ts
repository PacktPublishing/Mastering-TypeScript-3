import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from "./login-panel/login-panel.component";
import { SecureComponent } from "./layout/secure/secure.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
    { path: 'login', component: LoginPanelComponent },
    { path: '', component: SecureComponent/*, canActivate: [AuthGuard]*/ },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }