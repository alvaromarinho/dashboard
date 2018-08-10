import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        )
    }

    all(): Observable<any> {
        return this.http.get(this.url).pipe(
            map((res: any) => this.convertItemFromServer(res.data, true)),
            catchError((error) => throwError(error))
        );
    }

    find(id?: any): Observable<Tag> {
        return this.http.get(this.url + id).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        );
    }

    update(post: Tag): Observable<Tag> {
        const form = this.convertItemToServer(post);
        return this.http.put(this.url, form).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        )
    }

    delete(id: number): Observable<Tag> {
        return this.http.delete(this.url + id).pipe(
            catchError((error) => throwError(error))
        )
    }

    private convertItemToServer(post: Tag) {
        const form = new FormData();
        Object.keys(post).forEach((key) => form.set(key, post[key]));
        return form;
    }

    private convertItemFromServer(json: any,  isArray = false): Tag {
        if (json.length === 1 && isArray === false) {
            return Object.assign(new Tag(), json[0])
        }
        const result = [];
        for (let i = 0; i < json.length; i++) {
            result.push(Object.assign(new Tag(), json[i]));
        }
        return result;
    }
}
