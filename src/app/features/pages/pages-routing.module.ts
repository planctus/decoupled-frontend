import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.services';
import { I18nService } from '@eui/core';
import { TranslateService } from '@ngx-translate/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const staticRoutes: Routes = [
    { path: '', component: LandingPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(staticRoutes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {
  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private translateService: TranslateService,
    protected i18nService: I18nService,
  ) {
    let updatedRoutes: Routes = [];
    this.i18nService.getState().subscribe((state: { activeLang: string }) => {
        const lang = state.activeLang;
        updatedRoutes = updatedRoutes.map(route => {
            if (route.children) {
                // If route has children, update their paths
                const updatedChildren = route.children.map(child => ({
                    ...child,
                    path: child.path.slice(0, -2) + lang // Replace last two characters with activeLang
                }));
                return { ...route, children: updatedChildren };
            } else {
                // If route does not have children, update its path
                return {
                    ...route,
                    path: route.path.slice(0, -2) + lang // Replace last two characters with activeLang
                };
            }
        });
        // Reset router configuration with updatedRoutes
        this.router.resetConfig(updatedRoutes);
    });    
    this.navigationService.getHeaderMainNavigation().subscribe(dynamicRoutes => {
        updatedRoutes = [
            ...staticRoutes, // Include existing routes
            ...dynamicRoutes.map(route => {
            if (route.children.length > 0) {
                const childrenRoutes = route.children.map(child => ({
                    path: child.path,
                    component: LandingPageComponent
                }));
                return {
                    path: route.path,
                    children: childrenRoutes
                };
            } else {
                return {
                    path: route.path,
                    component: LandingPageComponent
                };
            }
            })
        ];
        this.router.resetConfig(updatedRoutes);
    });
  }
}
