export function checkIpAddress(ip: string): boolean {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}
export function formatAndValidateMAC(mac: string): { formattedMAC: string, isValid: boolean } {
  let value = mac.replace(/\W/gi, '').toLowerCase();
  let formatted = '';
  
  // Formatear la dirección MAC
  for (let i = 0; i < value.length; i++) {
    if (i !== 0 && i % 2 === 0) formatted += ':';
    formatted += value[i];
  }
  
  formatted = formatted.slice(0, 17); // Limita a la longitud de una dirección MAC válida

  // Validar la dirección MAC formateada
  const macPattern = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/;
  const isValid = macPattern.test(formatted);
  
  return { formattedMAC: formatted, isValid };
}


// Suponiendo que este código se agregará en tu archivo de utilidades
export function formatAndValidateDDLTBK(input: string): {
  formatted: string;
  isValid: boolean;
} {
  // Primero, elimina cualquier caracter que no sea dígito o guión
  let cleanedInput = input.replace(/[^\d-]/g, '').substring(0, 11); // Limpia y limita la longitud

  // Inserta guiones automáticamente después del tercer y sexto dígito
  let parts = cleanedInput.split('-').join(''); // Elimina guiones existentes para evitar duplicados
  let formatted =
    parts.substring(0, 3) +
    (parts.length > 3 ? '-' : '') +
    parts.substring(3, 6) +
    (parts.length > 6 ? '-' : '') +
    parts.substring(6, 9);

  // Valida si el formato cumple con el patrón exacto XXX-XXX-XXX
  const isValid = /^(\d{3}-){2}\d{3}$/.test(formatted);

  return { formatted, isValid };
}
