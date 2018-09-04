import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    
    user: User;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.userService.find(params.id).subscribe(
                (res: User) => {
                    console.log(res)
                    this.user = res
                },
                (err: any) => console.error(err)
            )
        });
    }

}
