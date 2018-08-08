import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { AlertService } from '../../shared/services/alert.service';
import { Tag } from '../tag.model';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

    tags: Tag[];
    pagination: any = {};
    pagedItems: any[];
    search: string;
    filtered: boolean;

    constructor(
        private tagService: TagService,
        private alertService: AlertService,
        private paginationService: PaginationService,
    ) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.tagService.all().subscribe((res: Tag[]) => {
            this.tags = res
            this.setPage(1);
        }, (err) => console.error(err));
    }
    
    clean() {
        this.filtered = false;
        this.search = '';
        this.loadAll();
    }

    filter() {
        this.tags = this.tags.filter((elem: any) => elem.title.toLowerCase().includes(this.search.toLowerCase()));
        this.setPage(1);
        this.filtered = true;
    }

    setPage(page: number) {
        this.pagination = this.paginationService.getPager(this.tags.length, page);
        this.pagedItems = this.tags.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    delete(id, modal) {
        this.tagService.delete(id).subscribe(() => {
            this.alertService.sendMessage('Tag #' + id + ' deleted!', 'danger');
            this.loadAll();
        }, (err: any) => console.error(err));
        modal.launch();
    }

}
