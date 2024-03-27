import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private apollo: Apollo) { }
  
  getHomepageData(): Observable<any> {

  const homepageQuery = gql`
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
    return this.apollo.query<any>({
      query: gql`
        query {
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
