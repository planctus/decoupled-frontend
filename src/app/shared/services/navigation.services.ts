import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  constructor(private apollo: Apollo) { }
  
  getHeaderMainNavigation(): Observable<MenuItem[]> {
    return this.apollo.query<any>({
      query: gql`
        query {
          menuByName(name: MAIN) {
            links {
              link {
                label
                url {
                  path
                }
              }
              submenu: subtree {
                link {
                  label
                  url {
                    path
                  }
                }
              }
            }
          }
        }
      `
    }).pipe(
      map(response => this.parseMenu(response.data.menuByName.links))
    );
  }

  private parseMenu(links: any[]): MenuItem[] {
    return links.map(link => ({
      label: link.link.label,
      path: link.link.url.path.substring(5),
      children: link.submenu ? link.submenu.map(child => ({
        label: child.link.label,
        path: child.link.url.path.substring(5),
      })) : undefined
    }));
  }
  
}
