import { Component, Input } from '@angular/core';
import { EclFeaturedModule, EclMediaContainerComponentModule } from '@eui/ecl';

type alignmentType = 'left' | 'right';

@Component({
    selector: 'app-ecl-featured-item',
    templateUrl: './featured-item.component.html',
    standalone: true,
    imports: [EclFeaturedModule, EclMediaContainerComponentModule]
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
