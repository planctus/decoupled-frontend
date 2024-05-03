import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ecl-paragraph-oe-rich-text',
    templateUrl: './paragraph-oe-rich-text.component.html',
    standalone: true,
})
export class ParagraphOeRichTextComponent {
  @Input() fieldOeTextLong: string;
}
