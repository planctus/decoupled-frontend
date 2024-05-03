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
    languageChangeSubscription: Subscription; // Subscription for language change event

    constructor(
        private navigationService: NavigationService,
        private translateService: TranslateService,
        protected i18nService: I18nService,
    ) {}

    ngOnInit() {
        // Subscribe to language change event
        this.languageChangeSubscription = this.i18nService.getState().subscribe((state:{activeLang:string})=>{
            console.log(state);
            this.updateMenuItems();
        });

        // Initial call to update menu items
        this.updateMenuItems();
    }

    ngOnDestroy(): void {
        // Unsubscribe from the subscriptions when the component is destroyed
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
        if (this.languageChangeSubscription) {
            this.languageChangeSubscription.unsubscribe();
        }
    }

    private updateMenuItems() {
        // Unsubscribe from previous subscription if exists
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }

        this.navigationSubscription = this.navigationService.getHeaderMainNavigation().subscribe(routes => {
            this.menuItems = routes;
        });
    }
}
