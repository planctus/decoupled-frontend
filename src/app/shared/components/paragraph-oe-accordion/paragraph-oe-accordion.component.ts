import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { EclAccordionComponentModule } from '@eui/ecl';

@Component({
    selector: 'app-ecl-paragraph-oe-accordion',
    templateUrl: './paragraph-oe-accordion.component.html',
    standalone: true,
    imports: [EclAccordionComponentModule, NgFor]
})
export class ParagraphOeAccordionComponent {
  @Input() fieldOeParagraphs: {
    fieldOeText: string,
    fieldOeTextLong: string,
    fieldOeIcon: string
  }[];
}
