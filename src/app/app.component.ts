import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/route.service';
import { EclMenuItemSelectEvent } from '@eui/ecl';

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

    constructor(private routeService: RouteService) {}

    ngOnInit() {
        this.routeService.getRoutes().subscribe(routes => {
            this.menuItems = routes;
        });
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
    }
}
