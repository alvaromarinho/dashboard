import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostListComponent, PostFormComponent, PostService } from './';
import { AppRoutingModule } from '../app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    providers: [
        PostService
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
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
