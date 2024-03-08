import { Component, Input } from '@angular/core';

type alignmentType = 'left' | 'right';

@Component({
  selector: 'app-ecl-featured-item',
  templateUrl: './featured-item.component.html'
})
export class FeaturedItemComponent {
  @Input() isExtended: boolean = false;
  @Input() imageUrl: string;
  @Input() imageAlt: string;
  @Input() imageCaption: string;
  @Input() description: string;
  @Input() title: string;
  @Input() alignment: alignmentType;
}
