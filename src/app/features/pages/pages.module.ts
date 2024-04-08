import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './components/landing-page/landing-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
    ],
    declarations: [
        HomepageComponent,
        ContactComponent
    ],
})
export class PagesModule {
}
