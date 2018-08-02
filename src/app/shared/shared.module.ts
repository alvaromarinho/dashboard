import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SituationService } from './services/situation.service';
import { AlertService } from './services/alert.service';

@NgModule({
    providers: [
        SituationService,
        AlertService
    ],
    imports: [
        CommonModule,
    ],
    declarations: [
        ModalComponent,
    ],
    exports: [
        ModalComponent,
    ]
})
export class SharedModule { }
