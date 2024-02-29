import { Component, Input } from '@angular/core';

@Component({
  selector: 'paragraph-oe-quote',
  templateUrl: './paragraph-oe-quote.component.html'
})
export class ParagraphOeQuoteComponent {
  @Input() fieldOePlainTextLong: string;
  @Input() fieldOeText: string;
  @Input() imageUrl: string;
}
