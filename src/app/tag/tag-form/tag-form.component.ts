import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from '../tag.service';
import { Tag } from '../tag.model';
import { AuthService } from '../../core';

@Component({
    selector: 'app-tag-form',
    templateUrl: './tag-form.component.html',
    styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

    tag: Tag;

    constructor(
        private tagService: TagService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.tagService.find(this.activatedRoute.snapshot.params.id).subscribe((res: Tag) => this.tag = res);
        } else {
            this.tag = new Tag();
        }
    }

    submit() {
        const message = ('id' in this.tag) ? 'edited' : 'created';
        const subscription = ('id' in this.tag) ? this.tagService.update(this.tag) : this.tagService.create(this.tag);

        subscription.subscribe((res) => {
            this.router.navigate(['/tag']).then(() => {
                this.alertService.sendMessage('Tag ' + message + '!', 'success');
            });
        }, (err) => this.alertService.sendMessage(err, 'danger'))
    }

}
