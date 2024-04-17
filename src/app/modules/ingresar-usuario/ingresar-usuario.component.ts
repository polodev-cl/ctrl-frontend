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

  nombreUsuario: string = ''; 
  email: string = '';
  password: string = 'test1234'; 

  async registrarUsuario() {
    try {
      await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: {
            email: this.email,
            // Otros atributos aquí...
          },
          autoSignIn: { enabled: true }
        }
      });
      // Llamar al modal de éxito inmediatamente después de la promesa signUp
      this.abrirModalExito();
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
    }
  }


  mostrarModalExito: boolean = false; 
  tituloModalExito: string = ''; 
  mensajeModalExito: string = ''; 

  abrirModalExito(): void {
    this.tituloModalExito = 'Ingreso Usuario';
    this.mensajeModalExito = `Usuario ${this.nombreUsuario} ha sido ingresado con éxito`;
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false; 
  }


}
