import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostListComponent, PostFormComponent, PostService } from './';
import { AppRoutingModule } from '../app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';

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
