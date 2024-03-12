import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Component({
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {
  homepageData: any; // Adjust type based on the response structure

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getHomepageData();
  }

  getHomepageData(): void {
    this.apollo
      .watchQuery<any>({
        query: gql`
        query {
          content(path: "node/1", langcode: "en") {
            id
            title
            ... on NodeLandingPage {
              paragraphs {
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
                    title
                    uri {
                      path
                    }
                  }
                }
                ... on ParagraphOeRichText {
                  fieldOeTextLong
                }
                ... on ParagraphOeQuote {
                  fieldOePlainTextLong
                  fieldOeText
                  fieldOeMedia {
                    mediaFileUrl {
                      path
                    }
                  }
                }
                ... on ParagraphOeAccordion {
                  id
                  fieldOeParagraphs {
                    id
                    fieldOeTextLong
                  }
                }
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe(result => {
        this.homepageData = result.data.homepageData; // Assign the retrieved data to a component property
      });
  }
}
