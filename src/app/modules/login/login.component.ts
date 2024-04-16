import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../cognito-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorLogin: boolean = false;
  errorMessage: string = '';  // Store the user-facing error message
  requireNewPassword: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) {}

  async signIn() {
    try {
      await this.cognitoService.signOut().catch(error => console.error('Error al cerrar sesión previa, continuando con el inicio de sesión:', error));
      const signInStep = await this.cognitoService.handleSignIn({ username: this.usuario, password: this.password });
      if (signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        this.requireNewPassword = true;
      } else if (signInStep === 'SIGNED_IN' || signInStep === 'DONE') {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Unhandled sign-in step: ' + signInStep;
        this.errorLogin = true;
      }
    } catch (error) {
      this.errorMessage = 'Error during sign-in';
      this.errorLogin = true;
    }
  }

  async submitNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.errorLogin = true;
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      this.errorLogin = true;
      return;
    }

    try {
      await this.cognitoService.confirmNewPassword({ username: this.usuario, newPassword: this.newPassword });
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = 'Error setting new password';
      this.errorLogin = true;
    }
  }
}