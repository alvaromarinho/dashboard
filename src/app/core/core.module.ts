import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';

import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    HomeComponent,
    AuthComponent
  ],
  exports: [
    HomeComponent,
    AuthComponent
  ]
})
export class CoreModule { }
