import { Component, Input } from '@angular/core';

type BannerVariant = "text-box" | "image-overlay" | "text-highlight" | "plain-background";

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() credit: string;
  @Input() variant: BannerVariant;
  @Input() isCentered: boolean = true;
}
