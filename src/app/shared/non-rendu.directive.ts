import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]'
})
export class NonRenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = '';
    el.nativeElement.style.fontSize = '14px';
    // el.nativeElement.style.border = '2px dashed orange';
  }
}
