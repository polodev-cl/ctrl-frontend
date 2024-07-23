import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { CognitoService } from '../../common/auth/cognito-service.service';
import { EmailStateService } from '../../utils/SharedService';
import { ModalPasswordComponent } from "../Custom/modal-password/modal-password.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ './forgot-password.component.css' ],
  standalone: true,
  imports: [
    ModalPasswordComponent,
    CardModule,
    NgIf,
    InputTextModule,
    ButtonModule,
    RouterLink,
    FormsModule
  ]
})
export class ForgotPasswordComponent {
  email: string = '';
  isModalDisplayed: boolean = false;
  obscuredEmail: string = '';
  errorMessage: string = '';

  constructor(
    private cognitoService: CognitoService,
    private emailStateService: EmailStateService
  ) {
  }

  async sendResetCode() {
    if ( !this.email.trim() ) {
      this.errorMessage = 'Por favor, ingrese un correo electrónico.';
      return;
    }

    try {
      await this.cognitoService.resetPassword(this.email);
      this.emailStateService.email = this.email;
      this.obscuredEmail = this.obscureEmail(this.email);
      this.showModal();
      this.errorMessage = '';
    } catch ( error ) {
      if ( error instanceof Error ) {
        switch ( error.name ) {
          case 'LimitExceededException':
            this.errorMessage = 'Límite de intentos excedido, intenta nuevamente después de unos minutos.';
            break;
          case 'UserNotFoundException':
            this.errorMessage = 'No se encontró un usuario con ese correo electrónico.';
            break;
          default:
            this.errorMessage = 'Error al enviar el código de reseteo: ' + error.message;
            break;
        }
        console.error('Failed to send reset code:', error);
      } else {
        this.errorMessage = 'Ocurrió un error inesperado.';
      }
    }
  }


  showModal() {
    if ( !this.errorMessage ) {
      this.isModalDisplayed = true;
    }
  }

  closeModal() {
    this.isModalDisplayed = false;
    this.errorMessage = '';
  }

  obscureEmail(email: string): string {
    const parts = email.split('@');
    const name = parts[0];
    return name.substring(0, 2) + '*'.repeat(name.length - 2) + '@' + parts[1];
  }
}
