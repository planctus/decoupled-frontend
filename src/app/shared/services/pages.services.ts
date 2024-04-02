import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private apollo: Apollo) { }

  getNodeData(path): Observable<any> {
    return this.apollo.query<any>({
      query: gql`
      query {
        content(path: "${path}") {
          ... on NodeLandingPage {
            id
            title
            moderationState
            status
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
                  }
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
      `
    });
  }
}
