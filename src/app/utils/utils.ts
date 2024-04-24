import { FormGroup } from "@angular/forms";

export const MAC_PATTERN = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/;
export const IPV4_PATTERN = /^(\d{1,3}\.){3}\d{1,3}$/;
export const IPV6_PATTERN = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
export const DDLTBK_PATTERN = /^(\d{3}-){2}\d{3}$/;

export function checkIpAddress(ip: string): boolean {

  return IPV6_PATTERN.test(ip) || IPV6_PATTERN.test(ip);
}

export function formatMAC(mac: string): string {
  let value = mac.replace(/\W/gi, '').toLowerCase();
  let formatted = '';

  // Formatear la dirección MAC
  for ( let i = 0; i < value.length; i++ ) {
    if ( i !== 0 && i % 2 === 0 ) formatted += ':';
    formatted += value[i];
  }

  formatted = formatted.slice(0, 17); // Limita a la longitud de una dirección MAC válida

  return formatted;
}

export const validateMAC = (str: string) => MAC_PATTERN.test(str);


// Suponiendo que este código se agregará en tu archivo de utilidades
export function formatDDLTBK(input: string): string {
  // Primero, elimina cualquier caracter que no sea dígito o guión
  let cleanedInput = input.replace(/[^\d-]/g, '').substring(0, 11); // Limpia y limita la longitud

  // Inserta guiones automáticamente después del tercer y sexto dígito
  let parts = cleanedInput.split('-').join(''); // Elimina guiones existentes para evitar duplicados
  return parts.substring(0, 3) +
    (parts.length > 3 ? '-' : '') + parts.substring(3, 6) +
    (parts.length > 6 ? '-' : '') + parts.substring(6, 9);
}

export function logFormErrors(form: FormGroup): void {
  Object.keys(form.controls).forEach(key => {
    const controlErrors = form.get(key)?.errors;
    if ( controlErrors ) {
      Object.keys(controlErrors).forEach(errorKey => {
        console.log(`Error in ${ key }: ${ errorKey }, error value:`, controlErrors[errorKey]);
      });
    }
  });
}
