import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage.component';

const routes: Routes = [
    { path: '', component: Homepage },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class Module1RoutingModule {}
