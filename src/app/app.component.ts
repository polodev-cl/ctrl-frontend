import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { I18n } from '@aws-amplify/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  constructor(private router: Router) {
    // Define las traducciones
    const dict = {
      'es': {
        'Sign In': 'Iniciar sesión',
        'Sign in': 'Iniciar sesión',
        'Sign Up': 'Registrarse',
        'Sign Out': 'Cerrar sesión',
        "Email": "Correo Electrónico",
        "Enter your Email": "Ingresa tu Correo",
        'Username': 'Nombre de usuario',
        'Welcome!': 'Bienvenido',
        "Password must have at least 8 characters": "La contraseña debe tener al menos 8 caracteres",
        'Change Password': 'Cambio de contraseña',
        'Your passwords must match': 'Las contraseñas deben coincidir',
        'Confirm Password': 'Confirmar Contraseña',
        'Back to Sign In': 'Volver a inicio de sesión',
        "Please confirm your Password": "Por favor confirma tu contraseña",
        'Password': 'Contraseña',
        'Enter your username': 'Introduce tu nombre de usuario',
        'Enter your Password': 'Introduce tu contraseña',
        'Forgot your password?': '¿Olvidaste tu contraseña?',
        'No account?': '¿No tienes cuenta?',
        'Create Account': 'Crear cuenta',
        'Reset your password': 'Restablecer tu contraseña',

      }
    };

    // Añadir el diccionario de traducciones a Amplify
    I18n.putVocabularies(dict);

    // Establecer el idioma español como predeterminado
    I18n.setLanguage('es');
  }

  redirectToLogin() {
    this.router.navigate([ '/login' ]);
  }
}
