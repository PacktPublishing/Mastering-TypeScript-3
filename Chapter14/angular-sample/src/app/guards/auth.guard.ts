import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let token = <Object>localStorage.getItem('token');
        console.log(`Authguard : token : ${token}`);
        return this.userService.validateUser(token).pipe(
            map((e: Object): boolean => {
                console.log(`Authguard : e ; ${JSON.stringify(e)}`)
                return true;
            }),
            catchError((err) => {
                // 401 unauth errors will be caught here.
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }


}

