import { Component, Input } from '@angular/core';

@Component({
  selector: 'paragraph-oe-rich-text',
  templateUrl: './paragraph-oe-rich-text.component.html',
})
export class ParagraphOeRichTextComponent {
  @Input() fieldOeTextLong: string;
}
