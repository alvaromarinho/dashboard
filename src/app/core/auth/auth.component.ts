import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    username: string;
    password: string;
    load: boolean;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            if (data.logout) {
                this.authService.logout();
            }
        });
    }

    submit() {
        this.load = true;
        this.authService.auth(this.username, this.password).subscribe(() => {
            this.load = false;
            this.route.queryParams.subscribe((params) =>
                params['returnUrl']
                    ? this.router.navigate([params['returnUrl']])
                    : this.router.navigate([''])
            )}
        )
    }

}
