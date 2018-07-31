import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SituationService } from './services/situation.service';

@NgModule({
    providers: [
        SituationService,
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
