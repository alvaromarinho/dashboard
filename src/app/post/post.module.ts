import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostListComponent, PostFormComponent, PostService } from './';

@NgModule({
  providers: [
    PostService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    PostListComponent,
    PostFormComponent,
  ],
  exports: [
    PostListComponent,
    PostFormComponent,
  ]
})
export class PostModule { }
