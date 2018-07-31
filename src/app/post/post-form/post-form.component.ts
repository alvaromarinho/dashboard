import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../post.model';
import { AuthService } from '../../core';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    post: Post = new Post();

    constructor(private authService: AuthService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.post = Object.assign(new Post(), {
            user_id: this.authService.getStorage('id'),
            date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
        });
    }
    
    submit() {
        console.log(this.post);
    }

}
