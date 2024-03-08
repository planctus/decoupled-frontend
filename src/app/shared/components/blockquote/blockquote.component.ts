import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ecl-blockquote',
  templateUrl: './blockquote.component.html'
})
export class BlockquoteComponent {
  @Input() fieldOePlainTextLong: string;
  @Input() fieldOeText: string;
  @Input() imageUrl: string;
  @Input() imageAlt: string;
}
