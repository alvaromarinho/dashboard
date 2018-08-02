import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

    posts: any;

    constructor(private postService: PostService, private alertService: AlertService) { }

    ngOnInit() {
        this.postService.read().subscribe(
            (res: any) => this.posts = res,
            (err: any) => console.error(err)
        )
    }

    delete(id, modal) {
        this.postService.delete(id).subscribe(
            () => this.alertService.sendMessage('Post #' + id + ' deleted!', 'danger'),
            (err: any) => console.error(err)
        );
        modal.launch();
    }

}
