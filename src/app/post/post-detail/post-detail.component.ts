import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

    post: any;

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.postService.read(params.id).subscribe(
                (res: any) => this.post = res[0],
                (err: any) => console.error(err)
            )
        });
    }

}
