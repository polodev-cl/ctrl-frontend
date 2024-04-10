import { RutFormatterDirective } from './rut-formatter.directive';
import { ElementRef } from '@angular/core';

describe('RutFormatterDirective', () => {
  it('should create an instance', () => {
    // Crea un objeto simulado de ElementRef
    const elementRefMock: ElementRef = new ElementRef(document.createElement('div'));
    const directive = new RutFormatterDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});