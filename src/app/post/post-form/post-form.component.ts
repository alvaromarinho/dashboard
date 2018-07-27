import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    post: Post;

    constructor() { }

    ngOnInit() {
        this.post = new Post();
        console.log(this.post);
    }

}
