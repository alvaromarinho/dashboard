import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SERVER_API_URL } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = SERVER_API_URL + 'posts';

    read(key?: any): Observable<any> {
        const id = key ? '/' + key : '';
        return this.http.get(this.url + id).pipe(
            map((res: any) => res = res.data),
            catchError(this.handleError<any>())
        );
    }

    private handleError<T>(result?: T) {
        return (httpError: HttpErrorResponse): Observable<T> => {
            console.error(httpError);
            return of(result as T);
        };
    }
}
