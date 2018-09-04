import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserListComponent, UserFormComponent, UserDetailComponent, UserService } from './';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    providers: [
        UserService,
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
        UserListComponent,
        UserFormComponent,
        UserDetailComponent
    ]
})
export class UserModule { }
