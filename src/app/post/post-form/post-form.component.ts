import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core';
import { SituationService } from '../../shared/services/situation.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AlertService } from '../../shared/services/alert.service';
import { TagService, Tag } from '../../tag';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    post: Post;
    tags: Tag[];
    situations: any = [];

    constructor(
        private authService: AuthService,
        private situationService: SituationService,
        private postService: PostService,
        private alertService: AlertService,
        private tagService: TagService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.postService.find(this.activatedRoute.snapshot.params.id).subscribe((res: Post) => this.post = res);
        } else {
            this.post = Object.assign(new Post(), {
                user_id: this.authService.getStorage('id'),
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
            });
        }

        this.tagService.all().subscribe((res: Tag[]) => this.tags = res);
        this.situationService.read('posts').subscribe((res) => this.situations = res);
    }

    submit() {
        const message = ('id' in this.post) ? 'edited' : 'created';
        const subscription = ('id' in this.post) ? this.postService.update(this.post) : this.postService.create(this.post);

        subscription.subscribe((res) => {
            this.router.navigate(['/post']).then(() => {
                this.alertService.sendMessage('Post ' + message + '!', 'success');
            });
        }, (err) => this.alertService.sendMessage(err, 'danger'))
    }

}
