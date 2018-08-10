import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostListComponent, PostFormComponent, PostService, PostDetailComponent } from './';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../tag/tag.module';

@NgModule({
    providers: [
        PostService,
        DatePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        TagModule,
    ],
    declarations: [
        PostListComponent,
        PostFormComponent,
        PostDetailComponent,
    ],
    exports: [
        PostListComponent,
        PostFormComponent,
    ]
})
export class PostModule { }
