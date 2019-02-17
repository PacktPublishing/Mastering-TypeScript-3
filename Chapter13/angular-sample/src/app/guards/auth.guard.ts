import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// import { Observable } from 'rxjs';
// import { AuthService } from 'src/services/auth.service';
// import * as jwt_decode from 'jwt-decode';

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

// sample functions, not used.

function usingObservableOf(value: number): Observable<boolean> {
    if (value > 10) {
        return of(true);
    } else {
        return of(false);
    }
}

function usingPipe(subject: Observable<Object>) {
    subject.pipe(
        map(() => { }),
        catchError((err) => {
            return of(false);
        })
    );
}

function usingMap(subject: Observable<Object>): Observable<boolean> {
    return subject.pipe(
        map((object: Object): boolean => {
            return false;
        }));
}