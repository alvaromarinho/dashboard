import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AlertService } from '../../shared/services/alert.service';
import { Post } from '../post.model';
import { PaginationService } from '../../shared/services/pagination.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

    posts: Post[];
    pagination: any = {};
    pagedItems: any[];

    constructor(
        private postService: PostService,
        private alertService: AlertService,
        private paginationService: PaginationService,
    ) { }

    ngOnInit() {
        this.postService.read().subscribe((res: Post[]) => {
            this.posts = res
            this.setPage(1);
        }, (err) => console.error(err));
    }

    setPage(page: number) {
        this.pagination = this.paginationService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    delete(id, modal) {
        this.postService.delete(id).subscribe(() => {
            this.alertService.sendMessage('Post #' + id + ' deleted!', 'danger');
            this.posts = this.posts.filter((elem: any) => {
                return elem.id !== id;
            });
        }, (err: any) => console.error(err));
        modal.launch();
    }
}
