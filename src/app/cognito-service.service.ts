import { signIn, signOut,signUp, ConfirmSignUpInput, confirmSignUp, SignInInput, autoSignIn } from 'aws-amplify/auth';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export class CognitoService {
  async handleSignUp({
    username,
    password,
    email,
    phone_number,
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number,
          },
          autoSignIn: true,
        },
      });

      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }
  
  async isUserAuthenticated(): Promise<boolean> {
    try {
      await autoSignIn();
      return true;
    } catch (error) {
      return false;
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
  
  async handleSignIn({ username, password }: SignInInput): Promise<{ isSignedIn: boolean, nextStep: any }> {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      return { isSignedIn, nextStep };
    } catch (error) {
      console.log('error signing in', error);
      throw error;
    }
  }

  async handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
    } catch (error) {
      console.log(error);
    }
  }
}
