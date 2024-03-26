import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class PagesRoutingModule {}
