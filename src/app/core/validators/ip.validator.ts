import { AbstractControl, ValidationErrors } from "@angular/forms";

function IpValidator(control: AbstractControl): ValidationErrors | null {
  const ip = control.value;
  if ( !ip ) return null;

  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  const valid = ipv4Pattern.test(ip) || ipv6Pattern.test(ip);

  return valid ? null : { ip: true };
}
