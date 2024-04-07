import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    private apollo: Apollo,
    @Inject(CONFIG_TOKEN) private appConfig: EuiAppConfig,
  ) { }

  getNodeData(path): Observable<any> {
    const languageCode = this.appConfig.global.i18n?.i18nService?.defaultLanguage;
    return this.apollo.query<any>({
      query: gql`
      query {
        content(path: "${path}", langcode: "${languageCode}") {
          ... on NodeLandingPage {
            id
            title
            moderationState
            status
            paragraphs {
              __typename
              ... on ParagraphOeTextFeatureMedia {
                id
                oeParagraphsVariant
                fieldOeFeatureMediaTitle
                fieldOeHighlighted
                fieldOeLink {
                  uri {
                    path
                  }
                  title
                }
                fieldOeMedia {
                  mediaFileUrl {
                    path
                  }
                }
                fieldOePlainTextLong
                fieldOeTextLong
                fieldOeTitle
              }
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
