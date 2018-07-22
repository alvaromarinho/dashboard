import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isActive: boolean;
    active: string;

    constructor() { }

    ngOnInit() {
        this.active = '';
        this.isActive = false;
    }

    open() {
        this.isActive = !this.isActive;
        this.active = this.isActive ? 'is-active' : '';
    }
}
