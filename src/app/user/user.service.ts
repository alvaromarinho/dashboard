import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SERVER_API_URL } from '../app.constants';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = SERVER_API_URL + 'users/';

    create(user: User): Observable<User> {
        const form = this.convertItemToServer(user);
        return this.http.post(this.url, form).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        )
    }

    all(): Observable<any> {
        return this.http.get(this.url).pipe(
            map((res: any) => this.convertItemFromServer(res.data, true)),
            catchError((error: any) => throwError(error))
        );
    }

    find(id?: any): Observable<User> {
        return this.http.get(this.url + id).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        );
    }

    update(post: User): Observable<User> {
        const form = this.convertItemToServer(post);
        return this.http.put(this.url, form).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        )
    }

    delete(id: number): Observable<User> {
        return this.http.delete(this.url + id).pipe(
            catchError((error) => throwError(error))
        )
    }

    private convertItemToServer(user: User) {
        const form = new FormData();
        Object.keys(user).forEach((key) => {
            if(user[key]) {
                form.set(key, user[key]);
            }
        });
        return form;
    }

    private convertItemFromServer(json: any, isArray = false): User {
        if (json.length === 1 && isArray === false) {
            return Object.assign(new User(), json[0])
        }
        const result: any = [];
        for (let i = 0; i < json.length; i++) {
            result.push(Object.assign(new User(), json[i]));
        }
        return result;
    }
}
