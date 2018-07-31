import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../post.model';
import { AuthService } from '../../core';
import { SituationService } from '../../shared/services/situation.service';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    post: Post = new Post();
    situations: any = [];

    constructor(
        private authService: AuthService, 
        private situationService: SituationService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.post = Object.assign(new Post(), {
            user_id: this.authService.getStorage('id'),
            date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
        });

        this.situationService.read('posts').subscribe((res) => {
            this.situations = res;
        });
    }
    
    submit() {
        console.log(this.post);
    }

}
