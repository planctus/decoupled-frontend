import { Component, OnInit } from '@angular/core';
import { MockService } from '@shared/services/mock.services';

@Component({
  templateUrl: './landing-page.component.html'
})
export class HomepageComponent implements OnInit {
  homepageData: any; // Adjust type based on the response structure

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.getHomepageData();
  }

  getHomepageData(): void {
    this.mockService.getHomepageData().subscribe((data: any) => {
      this.homepageData = data;
    });
  }
}
