import { Component, OnInit } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';

@Component({
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  homepageParagraphs: any; // Adjust type based on the response structure

  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.getHomepageData();
  }

  getHomepageData(): void {
    this.pagesService.getHomepageData().subscribe((response: any) => {
      this.homepageParagraphs = response.data.entityById.paragraphs;
    });
  }
}
