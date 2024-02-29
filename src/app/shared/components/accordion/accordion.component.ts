import { Component, Input } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent {
  @Input() accordionItems: any;
}
