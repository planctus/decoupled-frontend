import { Component, OnInit } from '@angular/core';
import { MockService } from '@shared/services/mock.services';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  image: string;
  title: string;
  description: string;

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.mockService.getBannerData().subscribe(data => {
      this.image = data.image;
      this.title = data.title;
      this.description = data.description;
    });
  }
}
