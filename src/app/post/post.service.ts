import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SERVER_API_URL } from '../app.constants';
import { Post } from './post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = SERVER_API_URL + 'posts/';

    create(post: Post): Observable<Post> {
        const form = this.convertItemToServer(post);
        return this.http.post(this.url, form).pipe(
            map((res: any) => {
                console.log(res)
            }),
            catchError(this.handleError<any>())
        )
    }

    read(id?: any): Observable<Post[]> {
        const params = id || '';
        return this.http.get(this.url + params).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError(this.handleError<any>())
        );
    }

    update(post: Post): Observable<Post> {
        const form = this.convertItemToServer(post);
        return this.http.put(this.url, form).pipe(
            map((res: any) => {
                console.log(res)
            }),
            catchError(this.handleError<any>())
        )
    }

    private convertItemToServer(post: Post) {
        const form = new FormData();
        Object.keys(post).forEach((key) => form.set(key, post[key]));
        return form;
    }

    private convertItemFromServer(json: any): Post {
        if (json.length === 1) {
            return Object.assign(new Post(), json[0])
        }
        const result = [];
        for (let i = 0; i < json.length; i++) {
            result.push(Object.assign(new Post(), json[i]));
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
