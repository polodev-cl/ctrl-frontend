import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutPipe',
  pure: true,
  standalone: true
})
export class RutPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let rut = value.replace(/[^0-9kK]/g, '').toLowerCase();
    let verifier = rut.slice(-1);
    let numbers = rut.slice(0, -1);

    return `${numbers}-${verifier}`;
  }
}
