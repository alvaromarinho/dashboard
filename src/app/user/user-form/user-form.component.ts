import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    user: User;
    inputName: string = '...';
    repeatPass: string;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.userService.find(this.activatedRoute.snapshot.params.id).subscribe((res: User) => {
                this.user = res;
                this.repeatPass = this.user.password;
            });
        } else {
            this.user = new User();
        }
    }

    submit() {
        const message = (this.user.id) ? 'edited' : 'created';
        const subscription = (this.user.id) ? this.userService.update(this.user) : this.userService.create(this.user);

        subscription.subscribe((res) => {
            this.router.navigate(['/user']).then(() => {
                this.alertService.sendMessage('User ' + message + '!', 'success');
            });
        }, (err) => this.alertService.sendMessage(err, 'danger'))
    }

    photo(event) {
        this.user.photo = event.target.files[0];
    }

    get passwordCheck() {
        return (this.repeatPass === this.user.password) ? true : false;
    }

}
