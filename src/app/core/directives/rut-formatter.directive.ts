import { Directive, ElementRef, HostListener } from '@angular/core';
import { RutPipe } from '../pipes/rut.pipe';

@Directive({
  selector: '[appRutFormatter]',
  standalone: true
})
export class RutFormatterDirective {
  private rutPipe = new RutPipe();

  constructor(private el: ElementRef) {}

  @HostListener('blur', ['$event'])
  onBlur(event: KeyboardEvent) {
    let value = this.el.nativeElement.value;
    value = this.rutPipe.transform(value);
    this.el.nativeElement.value = value;
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    let value = this.el.nativeElement.value;
    value = value.replace(/[^0-9kK]/g, '');
    if (value.length > 9) { // 8 digits + 1 verifier character
      value = value.substring(0, 9);
    }
    this.el.nativeElement.value = value;
  }
}