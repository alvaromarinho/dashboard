import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';

import { AuthGuard, AuthInterceptor } from './core';
import { SharedModule } from './shared/shared.module';

@NgModule({
    providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        PostModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
