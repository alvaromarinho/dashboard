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
    search: string;
    filtered: boolean;

    constructor(
        private postService: PostService,
        private alertService: AlertService,
        private paginationService: PaginationService,
    ) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.postService.read().subscribe((res: Post[]) => {
            this.posts = res
            this.setPage(1);
        }, (err) => console.error(err));
    }
    
    clean() {
        this.filtered = false;
        this.search = '';
        this.loadAll();
    }

    filter() {
        this.posts = this.posts.filter((elem: any) => elem.title.toLowerCase().includes(this.search.toLowerCase()));
        this.setPage(1);
        this.filtered = true;
    }

    setPage(page: number) {
        this.pagination = this.paginationService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    delete(id, modal) {
        this.postService.delete(id).subscribe(() => {
            this.alertService.sendMessage('Post #' + id + ' deleted!', 'danger');
            this.loadAll();
        }, (err: any) => console.error(err));
        modal.launch();
    }
}
