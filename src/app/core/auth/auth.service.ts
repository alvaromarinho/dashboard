import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = 'http://alvaromarinho.com.br/projetos/api/v1/auth';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    auth(username: string, password: string): Observable<any> {
        const form = new FormData();
        form.set('username', username);
        form.set('password', password);
        return this.http.post(this.url, form).pipe(
            map((res: any) => {
                this.setToken(res.data.Authtoken);
                return res.message;
            }),
            catchError(this.handleError<any>())
        );
    }

    isAuthenticated() {
        return this.getToken() ? true : false;
    }

    logout() {
        localStorage.removeItem('DAT');
        this.router.navigate(['/auth']);
    }

    getToken() {
        return localStorage.getItem('DAT');
    }

    private setToken(string: string) {
        localStorage.setItem('DAT', string);
    }

    private handleError<T>(result?: T) {
        return (httpError: HttpErrorResponse): Observable<T> => {
            console.error(httpError);
            return of(result as T);
        };
    }
}
