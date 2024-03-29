import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './components/landing-page/landing-page.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
    ],
    declarations: [
        HomepageComponent
    ],
})
export class PagesModule {
}
