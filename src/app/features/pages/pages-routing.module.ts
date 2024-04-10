import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/landing-page/landing-page.component';
import { ContactComponent } from './components/contact/contact.component';
const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'contact', component: ContactComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class PagesRoutingModule {}
