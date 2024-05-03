import { Component, OnInit, OnDestroy } from '@angular/core';
import { EclMenuItemSelectEvent, EclAppComponentModule, EclSiteHeaderComponentModule, ECLClickOutsideDirective, EclMenuComponentModule, EclPageHeaderComponentModule, EclBreadcrumbComponentModule, EclSiteFooterComponentModule, EclLinkDirectiveModule, EclIconComponentModule } from '@eui/ecl';
import { NavigationService } from '@shared/services/navigation.services';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { I18nService } from '@eui/core';
import { TranslateService } from '@ngx-translate/core';

interface MenuItem {
    label: string;
    path: string;
    children?: MenuItem[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        EclAppComponentModule,
        EclSiteHeaderComponentModule,
        ECLClickOutsideDirective,
        EclMenuComponentModule,
        NgFor,
        RouterLink,
        NgIf,
        EclPageHeaderComponentModule,
        EclBreadcrumbComponentModule,
        RouterOutlet,
        EclSiteFooterComponentModule,
        EclLinkDirectiveModule,
        EclIconComponentModule,
        TranslateModule,
    ],
})
export class AppComponent implements OnInit, OnDestroy {
    menuItems: MenuItem[] = [];
    navigationSubscription: Subscription; // Subscription for navigationService.getHeaderMainNavigation()

    constructor(
        private navigationService: NavigationService,
        private translateService: TranslateService,
        protected i18nService: I18nService,
    ) {}

    ngOnInit() {
        this.navigationSubscription = this.navigationService.getHeaderMainNavigation().subscribe(routes => {
            const lang = this.translateService.store.currentLang;
            this.menuItems = this.updateMenuItemsPaths(routes, lang);
        });

        this.i18nService.getState().subscribe((state:{activeLang:string})=>{
            const lang = state.activeLang;
            this.menuItems = this.updateMenuItemsPaths(this.menuItems, lang);
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from the subscription when the component is destroyed
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    private updateMenuItemsPaths(routes: MenuItem[], lang: string): MenuItem[] {
        return routes.map(route => {
            if (route.children && route.children.length) {
                // If route has children, update their paths
                const updatedChildren = this.updateMenuItemsPaths(route.children, lang);
                return { 
                    ...route,
                    path: route.path.slice(0, -2) + lang,
                    children: updatedChildren 
                };
            } else {
                // If route does not have children, update its path
                return {
                    ...route,
                    path: route.path.slice(0, -2) + lang // Replace last two characters with activeLang
                };
            }
        });
    }
}
