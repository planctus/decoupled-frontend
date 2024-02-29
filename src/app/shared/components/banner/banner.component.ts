import { Component, Input } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() credit: string;
}
