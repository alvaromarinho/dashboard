import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent, AuthGuard, HomeComponent } from './core';
import { PostListComponent, PostFormComponent, PostDetailComponent } from './post';
import { TagListComponent, TagFormComponent } from './tag';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent },
    { path: 'logout', component: AuthComponent, data: { logout: true } },

    { path: 'post', canActivate: [AuthGuard], children: [
        { path: '', component: PostListComponent },
        { path: 'new', component: PostFormComponent },
        { path: 'view/:id', component: PostDetailComponent },
        { path: 'edit/:id', component: PostFormComponent },
    ]},

    { path: 'tag', canActivate: [AuthGuard], children: [
        { path: '', component: TagListComponent },
        { path: 'new', component: TagFormComponent },
        { path: 'edit/:id', component: TagFormComponent },
    ]},

    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
