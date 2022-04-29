import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = ''; // Couleur du texte d'un assigment rendu
    el.nativeElement.style.fontSize = '14px';
  }

}
