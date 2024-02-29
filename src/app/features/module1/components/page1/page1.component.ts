import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'page-1',
  templateUrl: './page1.component.html'
})

export class Page1Component implements OnInit {
    constructor(private apollo: Apollo) {}
    ngOnInit() {
        this.apollo
        .watchQuery({
            query: graphQlquery
        })
        .valueChanges.subscribe((result: any) => {
            console.log(result.data);
        });
    }
}

const graphQlquery = gql`
{
  article(id: 5) {
      id
      title
      author
  }
}
`;