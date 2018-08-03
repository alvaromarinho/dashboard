import { Component, ChangeDetectorRef, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from './shared/services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
    authenticated: Observable<boolean>;
    subscription: Subscription;
    message: any;
    class: any;

    constructor(
        private authService: AuthService, 
        private alertService: AlertService,
        private cdRef: ChangeDetectorRef,
    ) { }

    clear() {
        this.message = undefined;
        this.class = undefined;
        this.alertService.clearMessage();
    }
    
    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe((data) => { 
            if (data) {
                this.message = data.text;
                this.class = data.class
                setTimeout(() => this.clear(), 3000);
            }
        });
    }

    ngAfterViewChecked() {
        this.authenticated = this.authService.isAuthenticated;
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
