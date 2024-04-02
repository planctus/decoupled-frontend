import { Component, OnInit } from '@angular/core';
import { EclMenuItemSelectEvent } from '@eui/ecl';
import { NavigationService } from '@shared/services/navigation.services';

interface MenuItem {
    label: string;
    path: string;
    children?: MenuItem[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private navigationService: NavigationService) {}

    ngOnInit() {
        this.navigationService.getHeaderMainNavigation().subscribe(routes => {
            this.menuItems = routes;
        });
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
    }
}
