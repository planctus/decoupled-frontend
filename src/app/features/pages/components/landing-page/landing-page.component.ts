import { Inject } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';
import { FeaturedItemComponent } from '../../../../shared/components/featured-item/featured-item.component';
import { ParagraphOeBannerComponent } from '../../../../shared/components/paragraph-oe-banner/paragraph-oe-banner.component';
import { ParagraphOeAccordionComponent } from '../../../../shared/components/paragraph-oe-accordion/paragraph-oe-accordion.component';
import { BlockquoteComponent } from '../../../../shared/components/blockquote/blockquote.component';
import { ParagraphOeRichTextComponent } from '../../../../shared/components/paragraph-oe-rich-text/paragraph-oe-rich-text.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    templateUrl: './landing-page.component.html',
    standalone: true,
    imports: [NgIf, NgFor, ParagraphOeRichTextComponent, BlockquoteComponent, ParagraphOeAccordionComponent, ParagraphOeBannerComponent, FeaturedItemComponent]
})
export class LandingPageComponent implements OnDestroy {
  paragraphs: any;
  nodeUrl: string;
  nodeDataSubscription: Subscription; // Subscription for getNodeData
  homepageDataSubscription: Subscription; // Subscription for getHomepageData

  constructor(
    private pagesService: PagesService,
    private router: Router,
    @Inject(CONFIG_TOKEN) private appConfig: EuiAppConfig,
  ) {
    this.nodeUrl = this.getLastPartOfUrl(this.router.url);
    if (!this.nodeUrl) {
      const languageCode = appConfig.global.i18n?.i18nService?.defaultLanguage;
      this.nodeUrl = 'index_' + languageCode;
    }
    this.getNodeData(this.nodeUrl);
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions when component is destroyed
    if (this.nodeDataSubscription) {
      this.nodeDataSubscription.unsubscribe();
    }
    if (this.homepageDataSubscription) {
      this.homepageDataSubscription.unsubscribe();
    }
  }

  getNodeData(nodeUrl: string): void {
    this.nodeDataSubscription = this.pagesService.getNodeData(nodeUrl).subscribe((response: any) => {
      this.paragraphs = response.data.content.paragraphs;
    });
  }

  private getLastPartOfUrl(url: string): string {
    // Extract the last part of the URL (nodeUrl)
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
