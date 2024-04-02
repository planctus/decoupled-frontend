import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit, OnDestroy {
  paragraphs: any;
  nodeUrl: string;
  nodeDataSubscription: Subscription; // Subscription for getNodeData
  homepageDataSubscription: Subscription; // Subscription for getHomepageData

  constructor(
    private pagesService: PagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nodeUrl = params.get('nodeUrl');
    });

    if (this.nodeUrl) {
      this.getNodeData(this.nodeUrl);
    } else {
      this.getHomepageData();
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

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions when component is destroyed
    if (this.nodeDataSubscription) {
      this.nodeDataSubscription.unsubscribe();
    }
    if (this.homepageDataSubscription) {
      this.homepageDataSubscription.unsubscribe();
    }
  }
}
