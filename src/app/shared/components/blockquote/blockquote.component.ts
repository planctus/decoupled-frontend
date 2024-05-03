import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { EclBlockquoteComponentModule } from '@eui/ecl';

@Component({
    selector: 'app-ecl-blockquote',
    templateUrl: './blockquote.component.html',
    standalone: true,
    imports: [EclBlockquoteComponentModule, NgIf]
})
export class BlockquoteComponent {
  @Input() fieldOePlainTextLong: string;
  @Input() fieldOeText: string;
  @Input() imageUrl: string;
  @Input() imageAlt: string;
}
