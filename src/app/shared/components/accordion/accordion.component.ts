import { Component, OnInit } from '@angular/core';
import { MockService } from '@shared/services/mock.services';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements OnInit {
  accordionData: { title: string, description: string }[];

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.getAccordionData();
  }

  getAccordionData(): void {
    this.mockService.getAccordionData().subscribe(data => {
      this.accordionData = data;
    });
  }
}
