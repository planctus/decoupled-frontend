import { Component, OnInit, OnDestroy } from '@angular/core';
import { EclMenuItemSelectEvent, EclAppComponentModule, EclSiteHeaderComponentModule, ECLClickOutsideDirective, EclMenuComponentModule, EclPageHeaderComponentModule, EclBreadcrumbComponentModule, EclSiteFooterComponentModule, EclLinkDirectiveModule, EclIconComponentModule } from '@eui/ecl';
import { NavigationService } from '@shared/services/navigation.services';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

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

    constructor(private navigationService: NavigationService) {}

    ngOnInit() {
        this.navigationSubscription = this.navigationService.getHeaderMainNavigation().subscribe(routes => {
            this.menuItems = routes;
        });
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
    }

    ngOnDestroy(): void {
        // Unsubscribe from the subscription when the component is destroyed
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
