import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() {}

  getRoutes(): Observable<any[]> {

    const exampleRoutes = [
      { path: 'home', label: 'Home' },
      { path: 'about', label: 'About' },
    ];

    return of(exampleRoutes);
  }
}
