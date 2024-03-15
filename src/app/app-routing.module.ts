import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { RouteService } from './route.service';

const staticRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/pages/pages.module').then(m => m.Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(staticRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private routeService: RouteService,
    private router: Router,
  ) {
    this.routeService.getRoutes().subscribe(dynamicRoutes => {
      const updatedRoutes: Routes = [
        ...staticRoutes, // Include existing routes
        ...dynamicRoutes.map(route => ({
          path: route.path,
          loadChildren: () => import(`./features/pages/pages.module`).then(m => m.Module),
        }))
      ];
      this.router.resetConfig(updatedRoutes);
    });
  }
}
