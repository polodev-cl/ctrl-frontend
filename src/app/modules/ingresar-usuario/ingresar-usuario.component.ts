import { Component } from '@angular/core';
import { signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css']
})
export class IngresarUsuarioComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingresar-usuario', link: '/ingresar-usuario' }
  ];


  email: string = '';
  password: string = 'test1234'; 

  async registrarUsuario() {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: {
            email: this.email,
            // Otros atributos aquí...
          },
          autoSignIn: { enabled: false }
        }
      });
      console.log('UserID:', userId);
      // Ajusta aquí basado en la estructura de nextStep
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
    }
  }


  mostrarModalExito: boolean = false; 
  tituloModalExito: string = ''; 
  mensajeModalExito: string = ''; 

  abrirModalExito(): void {
    this.tituloModalExito = 'Ingreso Usuario'; 
    this.mensajeModalExito = 'Usuario JPerez ha sido ingresado con éxito'; 
    this.mostrarModalExito = true; 
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false; 
  }


}
