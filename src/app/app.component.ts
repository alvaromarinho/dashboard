import { Component, OnInit } from '@angular/core';
import { AuthService } from './core';
import { Observable } from '../../node_modules/rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    authenticated: Observable<boolean>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authenticated = this.authService.isAuthenticated;
    }
}
