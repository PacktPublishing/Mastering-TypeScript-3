import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    authenticateUser(username: string, password: string): Observable<Object> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const user = {
            username: username,
            password: password
        };
        return this.httpClient.post('/login', user, { 'headers': headers });
    }

    validateUser(token: object): Observable<Object> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const payload = {
            token: token
        };
        return this.httpClient.post('/validate-user', payload, { 'headers': headers });
    }

    authenticateGoogleUser(data: any) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.httpClient.post('/login-google', data, { 'headers': headers });
    }

}
