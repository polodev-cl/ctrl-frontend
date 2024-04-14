import { Injectable } from '@angular/core';
import {
  signIn,
  confirmSignIn,
  type SignInInput,
  signOut,
  ConfirmSignInInput,
  resetPassword,
  confirmResetPassword,
  updatePassword,
} from 'aws-amplify/auth';

interface ConfirmPasswordInput {
  username: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private currentUser: any; // This should ideally be a type that includes user session data

  async handleSignIn({ username, password }: SignInInput): Promise<string> {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    if (nextStep) {
      this.currentUser = nextStep; // Store necessary session info if available
      return nextStep.signInStep; // Always return a string that indicates the next step
    } else if (isSignedIn) {
      return 'SIGNED_IN'; // Indicate successful sign-in
    }
    throw new Error('Authentication failed with unknown state'); // Handle unexpected cases
  }

  // In your CognitoService
  async confirmNewPassword({
    username,
    newPassword,
  }: ConfirmPasswordInput): Promise<void> {
    try {
      const confirmInput: ConfirmSignInInput = {
        challengeResponse: newPassword,
        // Add any additional parameters required for confirmSignIn here
      };
      const confirmResult = await confirmSignIn(confirmInput);

      if (confirmResult.isSignedIn) {
        console.log(
          'User has successfully set a new password and is signed in.'
        );
      } else {
        console.log(
          'Next step after setting new password:',
          confirmResult.nextStep
        );
      }
    } catch (error) {
      console.error('Error confirming new password:', error);
      throw error; // Properly re-throw after logging
    }
  }

  async resetPassword(username: string) {
    try {
      const output = await resetPassword({ username });
      return output; // Return the output to handle the next steps in the component
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
      console.log('Password reset successfully');
    } catch (error) {
      console.error('Error during password confirmation:', error);
      throw error;
    }
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      await updatePassword({ oldPassword, newPassword });
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut();
      console.log('Sesión cerrada correctamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}