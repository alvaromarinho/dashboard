import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

    constructor(
        private http: HttpClient,
    ) { }

    private url = SERVER_API_URL + 'situations/';

    read(table: string): Observable<any> {
        const params = 'filter=table_name:\'' + table + '\'';
        return this.http.get(this.url + params).pipe(
            map((res: any) => res.data),
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
