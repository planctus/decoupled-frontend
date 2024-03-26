import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/route.service';

import {
    EclMenuItemSelectEvent,
} from '@eui/ecl';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    menuItems: { label: string, path: string }[] = [];

    // @ts-ignore
    constructor(private routeService: RouteService) {}

    ngOnInit() {
        this.routeService.getRoutes().subscribe(routes => {
            this.menuItems = routes.map(route => ({ label: route.label, path: route.path }));
        });
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
    }
}
