import { Component } from '@angular/core';
import { confirmSignUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.css']
})
export class VerificarUsuarioComponent {
  username: string = ''; // Asegúrate de que este valor está siendo correctamente gestionado
  confirmationCode: string = '';

  async verificarCodigo() {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: this.username,
            confirmationCode: this.confirmationCode
        });
        // Procesar el resultado aquí...
    } catch (error) {
        console.error('Error confirmando el registro:', error);
    }
}
}