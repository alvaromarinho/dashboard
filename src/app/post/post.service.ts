import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = 'http://alvaromarinho.com.br/projetos/api/v1/posts';

    read(): Observable<any> {
        return this.http.get(this.url).pipe(
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
