export type AuthRoute =
  | { name: 'Splash' | 'Welcome' | 'SignIn' | 'CreateAccount' | 'Schedule' }
  | { name: 'VerifyEmail'; email: string }
  | { name: 'ForgotPassword' | 'ResetLinkSent'; email: string }
  | { name: 'AllSet'; firstName: string };

export type AuthNavigation = {
  push: (route: AuthRoute) => void;
  back: () => void;
  reset: (route: AuthRoute) => void;
  toSignIn: () => void;
};
