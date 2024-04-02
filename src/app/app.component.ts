import { Component, OnInit, OnDestroy } from '@angular/core';
import { EclMenuItemSelectEvent } from '@eui/ecl';
import { NavigationService } from '@shared/services/navigation.services';
import { Subscription } from 'rxjs';

interface MenuItem {
    label: string;
    path: string;
    children?: MenuItem[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
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
