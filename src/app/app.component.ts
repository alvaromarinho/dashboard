import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from './core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
    authenticated: Observable<boolean>;

    constructor(private authService: AuthService, private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked() {
        this.authenticated = this.authService.isAuthenticated;
        this.cdRef.detectChanges();
    }
}
