import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { CognitoService } from '../../common/auth/cognito-service.service';
import { EmailStateService } from '../../utils/SharedService';
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: [ './recover-password.component.css' ],
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    NgIf,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    ModalExitosoComponent
  ]
})
export class RecoverPasswordComponent {
  email: string;
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';
  mostrarModal: boolean = false;
  tituloModal: string = '';
  mensajeModal: string = '';

  constructor(
    private cognitoService: CognitoService,
    private emailStateService: EmailStateService,
    private router: Router
  ) {
    const tempEmail = this.emailStateService.email;
    if (!tempEmail) {
      console.warn('No email provided via EmailStateService.');
      this.router.navigate([ '/' ]);
    }
    this.email = tempEmail!;
  }

  async changePassword(): Promise<void> {
    console.log('Attempting to change password...');
    if (!this.newPassword || !this.confirmPassword || !this.verificationCode) {
      this.error = 'All fields are required.';
      return;
    }
    if (this.newPassword.length < 8) {
      this.error = 'Password must be at least 8 characters long.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    try {
      console.log(`Changing password for ${ this.email }`);
      await this.cognitoService.confirmResetPassword(this.email, this.verificationCode, this.newPassword);
      this.abrirModalExitoso();
      this.error = ''; 
      this.emailStateService.clearEmail();
    } catch ( error ) {
      console.error('Error during password confirmation:', error);
      this.error = 'Failed to change password: ' + (error instanceof Error ? error.message : 'unknown error');
    }
  }


  abrirModalExitoso(): void {
    this.tituloModal = 'Contraseña actualizada';
    this.mensajeModal = 'Su contraseña se ha actualizado con éxito,<br/>presione volver para dirigirse al login.';
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.router.navigate([ '/sign-up' ]);
  }
}
