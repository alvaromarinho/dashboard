import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

    find(id?: any): Observable<Post> {
        return this.http.get(this.url + id).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        );
    }

    update(post: Post): Observable<Post> {
        const form = this.convertItemToServer(post);
        return this.http.put(this.url, form).pipe(
            map((res: any) => this.convertItemFromServer(res.data)),
            catchError((error) => throwError(error))
        )
    }

    delete(id: number): Observable<Post> {
        return this.http.delete(this.url + id).pipe(
            catchError((error) => throwError(error))
        )
    }

    private convertItemToServer(post: Post) {
        const form = new FormData();
        Object.keys(post).forEach((key) => form.set(key, post[key]));
        return form;
    }

    private convertItemFromServer(json: any, isArray = false): Post {
        if (json.length === 1 && isArray === false) {
            return Object.assign(new Post(), json[0])
        }
        const result = [];
        for (let i = 0; i < json.length; i++) {
            result.push(Object.assign(new Post(), json[i]));
        }
        return result;
    }
}
