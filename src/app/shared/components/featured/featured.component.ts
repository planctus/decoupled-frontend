import { Component, Input } from '@angular/core';

type alignmentType = 'left' | 'right';

@Component({
  selector: 'app-ecl-featured',
  templateUrl: './featured.component.html'
})
export class FeaturedComponent {
  @Input() isExtended: boolean = false;
  @Input() imageUrl: string;
  @Input() imageCaption: string;
  @Input() description: string;
  @Input() title: string;
  @Input() alignment: alignmentType;
}
