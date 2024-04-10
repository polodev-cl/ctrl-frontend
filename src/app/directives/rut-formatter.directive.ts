import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRutFormatter]'
})
export class RutFormatterDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    let value = this.el.nativeElement.value;
    value = this.formatRut(value);
    this.el.nativeElement.value = value;
   
  }

  private formatRut(value: string): string {
    let rut = value.replace(/\./g, '').replace('-', '');
    if (rut.length > 1) {
      rut = rut.substring(0, rut.length - 1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.substring(rut.length - 1);
    }
    return rut;
  }

}
