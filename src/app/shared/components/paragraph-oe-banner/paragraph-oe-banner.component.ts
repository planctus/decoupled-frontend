import { Component, Input } from '@angular/core';

type BannerVariant = "text-box" | "image-overlay" | "text-highlight" | "plain-background";

@Component({
  selector: 'app-ecl-paragraph-oe-banner',
  templateUrl: './paragraph-oe-banner.component.html'
})
export class ParagraphOeBannerComponent {

  @Input() fieldOeMedia: {
    mediaFileUrl: {
      path: string
    },
    mediaFileAlt: string
  };
  @Input() fieldOeTitle: string;
  @Input() fieldOeText: string;
  @Input() credit: string;
  @Input() oeParagraphsVariant: BannerVariant;
  @Input() fieldOeBannerAlignment: string;
  @Input() fieldOeBannerSize: string;
  @Input() fieldOeBannerFullWidth: boolean;
  @Input() fieldOeLink: {
    title: string,
    uri: {
      path: string
    },
  };
}
