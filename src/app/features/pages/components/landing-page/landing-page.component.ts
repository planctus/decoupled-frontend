import { Component, OnInit } from '@angular/core';
import { PagesService } from '@shared/services/pages.services';

@Component({
  templateUrl: './landing-page.component.html'
})
export class HomepageComponent implements OnInit {
  homepageData: any; // Adjust type based on the response structure

  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.getHomepageData();
  }

  getHomepageData(): void {
    this.pagesService.getHomepageData().subscribe((data: any) => {
      this.homepageData = data;
    });
  }
}
