import { Component, OnInit } from '@angular/core';
import { MockService } from '@shared/services/mock.services';
import { Apollo, gql } from 'apollo-angular';

@Component({
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {
  homepageData: any; // Adjust type based on the response structure

  constructor(private apollo: Apollo, private mockService: MockService) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
          query: graphQlquery
      })
      .valueChanges.subscribe((result: any) => {
          const data = result.data?.homePage;
          this.homepageData = data;
          console.log(data); 
      }, (error) => {
          console.error('Error fetching data:', error);
      });
  }
}

const graphQlquery = gql`
{
 homePage {
    content {
      id
      entityRevisionId
      nid
      title
      moderationState
      status
      featured {
        title
        description
        imageUrl
        imageCaption
        imageAlt
        alignment
        isExtended
      }
      paragraphs {
        __typename
        ... on ParagraphOeBanner {
          id
          fieldOeBannerSize
          fieldOeBannerFullWidth
          fieldOeBannerAlignment
          oeParagraphsVariant
          fieldOeTitle
          fieldOeText
          fieldOeMedia {
            mediaFileUrl {
              path
            }
          }
          fieldOeLink {
            uri {
              path
            },
            title
          }
        }
        ... on ParagraphOeRichText {
          fieldOeTextLong
        }
        ... on ParagraphOeQuote {
          fieldOePlainTextLong
          fieldOeText
        }
        ... on ParagraphOeAccordion {
          id
          fieldOeParagraphs {
            id
            fieldOeText
            fieldOeTextLong
            fieldOeIcon
          }
        }
      }
    }
  }
}
`;

