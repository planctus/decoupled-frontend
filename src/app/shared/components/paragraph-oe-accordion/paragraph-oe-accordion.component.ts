import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ecl-paragraph-oe-accordion',
  templateUrl: './paragraph-oe-accordion.component.html'
})
export class ParagraphOeAccordionComponent {
  @Input() fieldOeParagraphs: {
    fieldOeText: string,
    fieldOeTextLong: string,
    fieldOeIcon: string
  }[];
}
