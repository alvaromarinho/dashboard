import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core';
import { SituationService } from '../../shared/services/situation.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    post: Post;
    situations: any = [];

    constructor(
        private authService: AuthService,
        private situationService: SituationService,
        private postService: PostService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.postService.read(this.activatedRoute.snapshot.params.id).subscribe((res: Post) => this.post = res);
        } else {
            this.post = Object.assign(new Post(), {
                user_id: this.authService.getStorage('id'),
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
            });
        }

        this.situationService.read('posts').subscribe((res) => {
            this.situations = res;
        });
    }

    submit() {
        if ('id' in this.post) {
            this.postService.update(this.post).subscribe(() => {
                this.router.navigate(['/post']).then(() => {
                    this.alertService.sendMessage('Post edited!', 'success');
                });
            })
        } else {
            this.postService.create(this.post).subscribe(() => {
                this.router.navigate(['/post']).then(() => {
                    this.alertService.sendMessage('Post created!', 'success');
                });
            })
        }
    }

}
