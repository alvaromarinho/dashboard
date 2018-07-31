import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = SERVER_API_URL + 'auth';
    private authenticated = new BehaviorSubject<boolean>(this.hasStorage());

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    get isAuthenticated() {
        return this.authenticated.asObservable();
    }

    auth(username: string, password: string): Observable<any> {
        const form = new FormData();
        form.set('username', username);
        form.set('password', password);
        return this.http.post(this.url, form).pipe(
            map((res: any) => {
                this.setStorage(res.data);
                this.authenticated.next(true);
                return res.message;
            }),
            catchError(this.handleError<any>())
        );
    }

    logout() {
        localStorage.removeItem('DAD');
        this.authenticated.next(false);
        this.router.navigate(['/auth']);
    }

    hasStorage(): boolean {
        return !!localStorage.getItem('DAD');
    }

    getStorage(key) {
        const storage = JSON.parse(atob(localStorage.getItem('DAD')));
        return storage[key] || null;
    }

    private setStorage(data: any) {
        const storage = {
            id: data.id,
            token: data.Authtoken
        }
        localStorage.setItem('DAD', btoa(JSON.stringify(storage)));
    }

    private handleError<T>(result?: T) {
        return (httpError: HttpErrorResponse): Observable<T> => {
            console.error(httpError);
            return of(result as T);
        };
    }
}
