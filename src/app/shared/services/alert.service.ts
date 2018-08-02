import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>();

    constructor() { }

    sendMessage(message: string, btnClass: string) {
        this.subject.next({ text: message, class: btnClass });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
