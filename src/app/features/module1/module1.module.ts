import { NgModule } from '@angular/core';
import { Module1RoutingModule } from './module1-routing.module';
import { Homepage } from './components/homepage/homepage.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        Module1RoutingModule,
    ],
    declarations: [
        Homepage
    ],
})
export class Module {
}
