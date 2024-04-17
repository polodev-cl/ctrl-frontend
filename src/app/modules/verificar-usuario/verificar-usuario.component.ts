import { Component } from '@angular/core';
import { confirmSignUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.css']
})
export class VerificarUsuarioComponent {
  username: string = '';
  confirmationCode: string = '';
  error: string = '';
  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';

  async verificarCodigo() {
    try {
      await confirmSignUp({
        username: this.username,
        confirmationCode: this.confirmationCode
      });
      // Si llegamos aquí, la verificación fue exitosa
      this.abrirModalExito();
    } catch (error: unknown) {  // Nota el cambio aquí para el tipo 'unknown'
      console.error('Error confirmando el registro:', error);
      if (error instanceof Error) {  // Verifica que es un objeto Error
        this.error = error.message;
      } else {
        this.error = "Se ha producido un error desconocido.";
      }
    }
  }


  abrirModalExito(): void {
    this.tituloModalExito = 'Verificación Exitosa';
    this.mensajeModalExito = 'Su cuenta ha sido verificada con éxito.';
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
    // Aquí puedes redirigir al usuario a la página de inicio de sesión o donde sea apropiado
  }
}
