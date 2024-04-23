import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailStateService {
  private email: string = '';

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  clearEmail(): void {
    this.email = '';
  }
}

//POR SI RECARGA LA PAGINA EN EL LOGIN

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailStateService {
//   private readonly emailKey = 'userEmail';  // Key to store the email

//   setEmail(email: string): void {
//     localStorage.setItem(this.emailKey, email);  // Store email in localStorage
//   }

//   getEmail(): string {
//     return localStorage.getItem(this.emailKey) || '';  // Retrieve email from localStorage
//   }

//   clearEmail(): void {
//     localStorage.removeItem(this.emailKey);  // Clear email from localStorage
//   }
// }
