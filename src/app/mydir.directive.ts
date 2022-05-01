import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMydir]'
})
export class MydirDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.backgroundColor="yellow";
   }

}
