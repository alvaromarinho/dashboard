import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

    posts: any;

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.read().subscribe(
            (res: any) => this.posts = res,
            (err: any) => console.error(err)
        )
    }

}
