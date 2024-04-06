import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './features/pages/components/contact/contact.component';

const routes: Routes = [
    { path: '', loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule) },
    { path: 'contact', component: ContactComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class AppRoutingModule {}
