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
    this.formatRut();
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    this.formatRutOnInput();
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    this.formatRut();
  }

  private formatRutOnInput() {
    let value = this.el.nativeElement.value;
    value = value.replace(/[^0-9kK-]/g, '');
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    this.el.nativeElement.value = value;
  }

  private formatRut() {
    let value = this.el.nativeElement.value;
    value = this.rutPipe.transform(value);
    this.el.nativeElement.value = value;
  }
}
