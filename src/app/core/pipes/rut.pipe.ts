import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'rutPipe',
  pure: true,
  standalone: true
})
export class RutPipe implements PipeTransform {
  transform(value: string): string {
    if ( !value ) return value;
    let rut = value.replace(/./g, '').replace('-', '');
    if ( rut.length > 1 ) {
      rut = rut.substring(0, rut.length - 1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.substring(rut.length - 1);
    }
    return rut;
  }
}
