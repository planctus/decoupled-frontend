import { Inject } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONFIG_TOKEN, EuiAppConfig, I18nService } from '@eui/core';
import { FeaturedItemComponent } from '../../../../shared/components/featured-item/featured-item.component';
import { ParagraphOeBannerComponent } from '../../../../shared/components/paragraph-oe-banner/paragraph-oe-banner.component';
import { ParagraphOeAccordionComponent } from '../../../../shared/components/paragraph-oe-accordion/paragraph-oe-accordion.component';
import { BlockquoteComponent } from '../../../../shared/components/blockquote/blockquote.component';
import { ParagraphOeRichTextComponent } from '../../../../shared/components/paragraph-oe-rich-text/paragraph-oe-rich-text.component';
import { NgIf, NgFor } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './landing-page.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ParagraphOeRichTextComponent, BlockquoteComponent, ParagraphOeAccordionComponent, ParagraphOeBannerComponent, FeaturedItemComponent]
})
export class LandingPageComponent implements OnInit, OnDestroy {
  paragraphs: any;
  nodeUrl: string;
  nodeDataSubscription: Subscription; // Subscription for getNodeData
  languageChangeSubscription: Subscription; // Subscription for language change event

  constructor(
    private pagesService: PagesService,
    private router: Router,
    @Inject(CONFIG_TOKEN) private appConfig: EuiAppConfig,
    private translateService: TranslateService,
    protected i18nService: I18nService,
  ) {}

  ngOnInit() {
    const languageCode = this.translateService.store.currentLang;
    this.nodeUrl = this.getLastPartOfUrl(this.router.url);
    if (!this.nodeUrl) {
      this.nodeUrl = 'index_' + languageCode;
    } else {
      this.nodeUrl = this.nodeUrl.slice(0, -2) + languageCode;
    }

    this.languageChangeSubscription = this.i18nService.getState().subscribe((state: { activeLang: string }) => {
      this.nodeUrl = this.getLastPartOfUrl(this.router.url);
      if (!this.nodeUrl) {
        this.nodeUrl = 'index_' + state.activeLang;
      } else {
        this.nodeUrl = this.nodeUrl.slice(0, -2) + state.activeLang;
      }
      this.getNodeData(this.nodeUrl);
    });

    this.getNodeData(this.nodeUrl);
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions when component is destroyed
    if (this.nodeDataSubscription) {
      this.nodeDataSubscription.unsubscribe();
    }
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }

  private getNodeData(nodeUrl: string): void {
    // Unsubscribe from previous subscription if exists
    if (this.nodeDataSubscription) {
      this.nodeDataSubscription.unsubscribe();
    }

    // Subscribe to new getNodeData request
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
