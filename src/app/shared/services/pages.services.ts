import { Inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { I18nService } from '@eui/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    private apollo: Apollo,
    protected i18nService: I18nService,
    private translateService: TranslateService,
  ) {}

  getNodeData(path): Observable<any> {
    const languageCode = this.translateService.store.currentLang;
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
