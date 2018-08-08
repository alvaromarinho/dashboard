import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SERVER_API_URL } from '../app.constants';
import { Tag } from './tag.model';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = SERVER_API_URL + 'tags/';

    create(post: Tag): Observable<Tag> {
        const form = this.convertItemToServer(post);
        return this.http.post(this.url, form).pipe(
            map((res: any) => {console.log(res);this.convertItemFromServer(res.data, false)}),
            catchError(this.handleError<any>())
        )
    }

    all(): Observable<Tag[]> {
        return this.http.get(this.url).pipe(
            map((res: any) => this.convertItemFromServer(res.data, true)),
            catchError(this.handleError<any>())
        );
    }

    find(id?: any): Observable<Tag[]> {
        return this.http.get(this.url + id).pipe(
            map((res: any) => this.convertItemFromServer(res.data, false)),
            catchError(this.handleError<any>())
        );
    }

    update(post: Tag): Observable<Tag> {
        const form = this.convertItemToServer(post);
        return this.http.put(this.url, form).pipe(
            map((res: any) => this.convertItemFromServer(res.data, false)),
            catchError(this.handleError<any>())
        )
    }

    delete(id: number): Observable<Tag> {
        return this.http.delete(this.url + id).pipe(
            catchError(this.handleError<any>())
        )
    }

    private convertItemToServer(post: Tag) {
        const form = new FormData();
        Object.keys(post).forEach((key) => form.set(key, post[key]));
        return form;
    }

    private convertItemFromServer(json: any, isArray: boolean): Tag {
        if (json.length === 1 && isArray === false) {
            return Object.assign(new Tag(), json[0])
        }
        const result = [];
        for (let i = 0; i < json.length; i++) {
            result.push(Object.assign(new Tag(), json[i]));
        }
        return result;
    }

    private handleError<T>(result?: T) {
        return (httpError: HttpErrorResponse): Observable<T> => {
            console.error(httpError);
            return of(result as T);
        };
    }
}
