import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/route.service';

@Component({
  selector: 'app-ecl-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  menuItems: { label: string, path: string }[] = [];

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routes => {
      this.menuItems = routes.map(route => ({ label: route.label, path: route.path }));
    });
  }
}
