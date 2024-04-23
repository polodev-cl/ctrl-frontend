import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { CognitoService } from '../../common/auth/cognito-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  imports: [
    CardModule,
    FormsModule,
    PasswordModule,
    NgIf,
    ButtonModule,
    RouterLink,
    InputTextModule
  ],
  standalone: true
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorLogin: boolean = false;
  errorMessage: string = '';  // Store the user-facing error message
  requireNewPassword: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) {
  }

  signIn() {
    this.cognitoService.signOut()
      .then(() => this.cognitoService.handleSignIn({ username: this.usuario, password: this.password }))
      .then(signInStep => {
        console.log('Sign-in step:', signInStep)
        if ( [ 'SIGNED_IN', 'DONE' ].includes(signInStep) ) {
          return this.router.navigate([ '/home' ]);
        } else if ( signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED' ) {
          this.requireNewPassword = true;
          return;
        } else {
          throw new Error(`Unhandled sign-in step: ${ signInStep }`);
        }
      })
      .catch(error => {
        console.error('Error during sign-in or sign-out:', error);
        this.errorMessage = error.message || 'Error during sign-in';
        this.errorLogin = true;
        return;
      });
  }

  async submitNewPassword() {
    if ( this.newPassword !== this.confirmPassword ) {
      this.errorMessage = 'Passwords do not match.';
      this.errorLogin = true;
      return;
    }

    if ( this.newPassword.length < 8 ) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      this.errorLogin = true;
      return;
    }

    try {
      await this.cognitoService.confirmNewPassword({ username: this.usuario, newPassword: this.newPassword });
      this.router.navigate([ '/home' ]);
    } catch ( error ) {
      this.errorMessage = 'Error setting new password';
      this.errorLogin = true;
    }
  }
}
