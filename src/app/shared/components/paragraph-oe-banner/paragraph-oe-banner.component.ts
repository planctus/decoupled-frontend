import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { EclBannerComponentModule, EclLinkDirectiveModule, EclIconComponentModule } from '@eui/ecl';

type BannerVariant = "text-box" | "image-overlay" | "text-highlight" | "plain-background";

@Component({
    selector: 'app-ecl-paragraph-oe-banner',
    templateUrl: './paragraph-oe-banner.component.html',
    standalone: true,
    imports: [EclBannerComponentModule, NgIf, EclLinkDirectiveModule, RouterLink, EclIconComponentModule]
})
export class ParagraphOeBannerComponent {
  @Input() fieldOeMedia: {
    mediaFileUrl: string,
    mediaFileAlt: string
  };
  @Input() fieldOeTitle: string;
  @Input() fieldOeText: string;
  @Input() credit: string;
  @Input() oeParagraphsVariant: BannerVariant;
  @Input() fieldOeBannerAlignment: string;
  @Input() fieldOeBannerFullWidth: boolean;
  @Input() fieldOeLink: {
    title: string,
    uri: string
  };
}
