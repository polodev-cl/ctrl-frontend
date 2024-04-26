import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailStateService {

  get email(): string | undefined {
    return sessionStorage.getItem('email') || undefined;
  }

  set email(email: string) {
    sessionStorage.setItem('email', email);
  }

  clearEmail(): void {
    sessionStorage.removeItem('email');
  }
}
