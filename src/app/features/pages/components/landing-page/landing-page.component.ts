import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnDestroy {
  paragraphs: any;
  nodeUrl: string;
  nodeDataSubscription: Subscription; // Subscription for getNodeData
  homepageDataSubscription: Subscription; // Subscription for getHomepageData

  constructor(
    private pagesService: PagesService,
    private router: Router
  ) {
    this.nodeUrl = this.getLastPartOfUrl(this.router.url);
    this.loadData();
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

  getHomepageData(): void {
    this.homepageDataSubscription = this.pagesService.getHomepageData().subscribe((response: any) => {
      this.paragraphs = response.data.entityById.paragraphs;
    });
  }

  private getLastPartOfUrl(url: string): string {
    // Extract the last part of the URL (nodeUrl)
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  private loadData(): void {
    if (this.nodeUrl) {
      this.getNodeData(this.nodeUrl);
    } else {
      this.getHomepageData();
    }
  }
}
