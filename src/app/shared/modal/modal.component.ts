import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    isActive: boolean;
    active: string;
    @Input() buttonClass: string;
    @Input() buttonIcon: string;
    @Input() buttonLabel: string;

    constructor() { }

    ngOnInit() {
        this.active = '';
        this.isActive = false;
    }

    launch() {
        this.isActive = !this.isActive;
        this.active = this.isActive ? 'is-active' : '';
    }

}
