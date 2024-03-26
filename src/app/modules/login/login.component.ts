import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorLogin: boolean = false;

  constructor(private router: Router) {} // Inyectar Router

  validarLogin() {
    if (this.usuario === '123' && this.password === '123') {
      console.log('Login correcto');
      this.router.navigate(['/home']); // Usar el método navigate para redirigir
      this.errorLogin = false;
    } else {
      console.log('Error en el login');
      this.errorLogin = true;
    }
  }
}
