import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagService, TagListComponent, TagFormComponent } from './';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    providers: [
        TagService,
        DatePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
    ],
    declarations: [
        TagListComponent,
        TagFormComponent,
    ]
})
export class TagModule { }
