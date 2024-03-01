import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ecl-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent {
  @Input() accordionItems: any;
}
