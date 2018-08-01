import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

    post: Post;

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.postService.read(params.id).subscribe(
                (res: Post[]) => this.post = res,
                (err: any) => console.error(err)
            )
        });
    }

}
