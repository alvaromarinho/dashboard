import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];
    pagination: any = {};
    pagedItems: any[];
    search: string;
    filtered: boolean;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private paginationService: PaginationService,
    ) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.userService.all().subscribe((res: User[]) => {
            this.users = res
            this.setPage(1);
        }, (err) => console.error(err));
    }

    clean() {
        this.filtered = false;
        this.search = '';
        this.loadAll();
    }

    filter() {
        this.users = this.users.filter((elem: any) => elem.title.toLowerCase().includes(this.search.toLowerCase()));
        this.setPage(1);
        this.filtered = true;
    }

    setPage(page: number) {
        this.pagination = this.paginationService.getPager(this.users.length, page);
        this.pagedItems = this.users.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    delete(id, modal) {
        this.userService.delete(id).subscribe(() => {
            this.alertService.sendMessage('User #' + id + ' deleted!', 'danger');
            this.loadAll();
        }, (err: any) => console.error(err));
        modal.launch();
    }

}
