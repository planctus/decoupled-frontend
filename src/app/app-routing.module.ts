import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.services';
import { LandingPageComponent } from './features/pages/components/landing-page/landing-page.component';

const staticRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(staticRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private navigationService: NavigationService,
    private router: Router,
  ) {
    this.navigationService.getHeaderMainNavigation().subscribe(dynamicRoutes => {
      const updatedRoutes: Routes = [
        ...staticRoutes, // Include existing routes
        ...dynamicRoutes.map(route => {
          if (route.children.length > 0) {
            const childrenRoutes = route.children.map(child => ({
              path: child.path,
              component: LandingPageComponent,
            }));
            return {
              path: route.path,
              children: childrenRoutes
            };
          } else {
            return {
              path: route.path,
              component: LandingPageComponent,
            };
          }
        })
      ];
      this.router.resetConfig(updatedRoutes);
    });
  }
}
