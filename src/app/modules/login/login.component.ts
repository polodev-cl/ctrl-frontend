import { NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { CognitoService } from '@common/auth/cognito-service.service';
import { UserService } from "@common/user/services/user.service";
import { lastValueFrom } from "rxjs";

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
export class LoginComponent implements OnInit {
  loading = false;
  usuario: string = '';
  password: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorLogin: boolean = false;
  errorMessage: string = '';
  requireNewPassword: boolean = false;
  failedAttempts: number = 0;
  isBlocked: boolean = false;

  ngOnInit() {
    const isBlocked = localStorage.getItem('isBlocked');
    if (isBlocked === 'true') {
      this.blockLogin();
    }
  }

  constructor(private router: Router, private cognitoService: CognitoService, private userService: UserService) {
  }

  signIn() {
    if (this.isBlocked) {
      this.errorMessage = 'Demasiados intentos fallidos. Inténtalo de nuevo en un minuto.';
      this.errorLogin = true;
      return;
    }
    this.loading = true;
    this.cognitoService.signOut()
      .then(() => this.cognitoService.handleSignIn({ username: this.usuario, password: this.password }))
      .then(async signInStep => {
        if ( [ 'SIGNED_IN', 'DONE' ].includes(signInStep) ) {
          this.failedAttempts = 0;
          const user = await this.cognitoService.getCurrentUser();
          await lastValueFrom(this.userService.getUserByCognitoId(user.username))
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
        this.loading = false;

        this.failedAttempts++;
        if (this.failedAttempts >= 3) {
          localStorage.setItem('isBlocked', 'true');
          this.blockLogin();
        }
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
      const user = await this.cognitoService.getCurrentUser();
      await lastValueFrom(this.userService.getUserByCognitoId(user.username))
      this.router.navigate([ '/home' ]);
    } catch ( error ) {
      this.errorMessage = 'Error setting new password';
      this.errorLogin = true;
    }
  }

  blockLogin() {
    this.isBlocked = true;
    this.errorMessage = 'Demasiados intentos fallidos. Inténtalo de nuevo en un minuto.';
    setTimeout(() => {
      this.isBlocked = false;
      this.failedAttempts = 0;
      this.errorMessage = '';
      localStorage.removeItem('isBlocked');
    }, 60000);
  }

  clearErrors() {
    this.errorLogin = false;
    this.errorMessage = '';
  }

}
