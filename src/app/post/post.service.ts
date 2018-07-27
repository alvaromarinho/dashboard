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

    read(id?: any): Observable<Post[]> {
        const params = id || '';
        return this.http.get(this.url + params).pipe(
            map((res: any) => this.convert(res.data)),
            catchError(this.handleError<any>())
        );
    }

    private convert(json: any): Post {
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
