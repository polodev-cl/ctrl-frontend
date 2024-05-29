import { inject, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { confirmResetPassword, confirmSignIn, ConfirmSignInInput, getCurrentUser, resetPassword, signIn, type SignInInput, signOut, updatePassword, } from 'aws-amplify/auth';

interface ConfirmPasswordInput {
  username: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root', })
export class CognitoService {
  private readonly _router: Router = inject(Router);
  private currentUser: any;

  async handleSignIn({ username, password }: SignInInput): Promise<string> {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    if (nextStep) {
      return nextStep.signInStep;
    } else if (isSignedIn) {
      return 'SIGNED_IN';
    }
    throw new Error('Authentication failed with unknown state');
  }

  async confirmNewPassword({ username, newPassword }: ConfirmPasswordInput): Promise<void> {
    try {
      const confirmInput: ConfirmSignInInput = {
        challengeResponse: newPassword,
      };
      await confirmSignIn(confirmInput);
    } catch (error) {
      console.error('Error confirming new password:', error);
      throw error;
    }
  }

  getCurrentUser = () => getCurrentUser().then((user) => this.currentUser = user);

  async resetPassword(username: string) {
    try {
      return await resetPassword({ username });
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  async confirmResetPassword(
    username: string,
    code: string,
    newPassword: string
  ) {
    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
    } catch (error) {
      console.error('Error during password confirmation:', error);
      throw error;
    }
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      await updatePassword({ oldPassword, newPassword });
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  signOut = () => signOut().then(() => this._router.navigate(['/sign-in']).then());
}
