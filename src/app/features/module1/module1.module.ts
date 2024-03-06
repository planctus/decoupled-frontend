import { NgModule } from '@angular/core';
import { Module1RoutingModule } from './module1-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        Module1RoutingModule,
    ],
    declarations: [
        HomepageComponent
    ],
})
export class Module {
}
