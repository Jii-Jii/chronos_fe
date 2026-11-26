import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Keyboard, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthLayout, Heading } from '../components/auth/AuthLayout';
import { AllSetScreen } from '../screens/auth/AllSetScreen';
import { CreateAccountScreen } from '../screens/auth/CreateAccountScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ResetLinkSentScreen } from '../screens/auth/ResetLinkSentScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { VerifyEmailScreen } from '../screens/auth/VerifyEmailScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import type { AuthNavigation, AuthRoute } from '../types/auth';

export function AuthNavigator() {
  const [stack, setStack] = useState<AuthRoute[]>([{ name: 'Splash' }]);
  const current = stack[stack.length - 1].name;

  const showWelcome = useCallback(() => setStack([{ name: 'Welcome' }]), []);
  const back = useCallback(() => {
    Keyboard.dismiss();
    setStack(routes => routes.length > 1 ? routes.slice(0, -1) : routes);
  }, []);

  const navigation: AuthNavigation = {
    back,
    push(route) {
      Keyboard.dismiss();
      setStack(routes => routes[routes.length - 1].name === route.name ? routes : [...routes, route]);
    },
    reset(route) {
      Keyboard.dismiss();
      setStack([route]);
    },
    toSignIn() {
      Keyboard.dismiss();
      setStack(routes => {
        const signIn = routes.findIndex(route => route.name === 'SignIn');
        return signIn >= 0 ? routes.slice(0, signIn + 1) : [{ name: 'Welcome' }, { name: 'SignIn' }];
      });
    },
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length === 1) return false;
      back();
      return true;
    });
    return () => subscription.remove();
  }, [back, stack.length]);

  function screen(route: AuthRoute) {
    switch (route.name) {
      case 'Splash': return <SplashScreen onReady={showWelcome} />;
      case 'Welcome': return <WelcomeScreen navigation={navigation} />;
      case 'SignIn': return <SignInScreen navigation={navigation} />;
      case 'CreateAccount': return <CreateAccountScreen navigation={navigation} />;
      case 'VerifyEmail': return <VerifyEmailScreen email={route.email} navigation={navigation} />;
      case 'ForgotPassword': return <ForgotPasswordScreen initialEmail={route.email} navigation={navigation} />;
      case 'ResetLinkSent': return <ResetLinkSentScreen email={route.email} navigation={navigation} />;
      case 'AllSet': return <AllSetScreen firstName={route.firstName} navigation={navigation} />;
      case 'Schedule':
        return (
          <AuthLayout footer={<AuthButton label="Sign out" onPress={showWelcome} />}>
            <Heading title="Your schedule">You’re signed in to Chronos.</Heading>
          </AuthLayout>
        );
    }
  }

  return (
    <View style={styles.fill}>
      <StatusBar style={current === 'Splash' || current === 'Welcome' || current === 'AllSet' ? 'light' : 'dark'} />
      {stack.map((route, index) => (
        <View key={route.name + index} style={index === stack.length - 1 ? styles.fill : styles.hidden}>
          {screen(route)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  hidden: { display: 'none' },
});
