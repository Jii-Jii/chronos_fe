import { useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthCheckbox, AuthLayout, AuthLink, AuthMessage, Heading, authStyles } from '../../components/auth/AuthLayout';
import { GoogleButton } from '../../components/auth/GoogleButton';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { authError, authService } from '../../services/authService';
import { colors } from '../../theme/colors';
import type { AuthNavigation } from '../../types/auth';

export function SignInScreen({ navigation }: { navigation: AuthNavigation }) {
  const [email, setEmail] = useState(authService.getRememberedEmail);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  function submit() {
    try {
      const result = authService.signIn(email, password, remember);
      Keyboard.dismiss();
      setError('');
      if (result.verified) navigation.reset({ name: 'Schedule' });
      else {
        authService.resendCode(result.email);
        setPassword('');
        navigation.push({ name: 'VerifyEmail', email: result.email });
      }
    } catch (reason) {
      setError(authError(reason));
    }
  }

  return (
    <AuthLayout onBack={navigation.back} showBrand footer={
      <AuthLink before="Don’t have an account?" label="Create one" onPress={() => navigation.push({ name: 'CreateAccount' })} />
    }>
      <View style={authStyles.group}>
        <Heading title="Welcome back">Sign in to pick up your schedule, bookings and conversations right where you left off.</Heading>
        <AuthInput label="Email" icon="mail" value={email} onChangeText={text => { setEmail(text); setError(''); }}
          placeholder="maya@chronosapp.io" placeholderTextColor={colors.placeholder} hidePlaceholderOnFocus
          autoCapitalize="none" autoCorrect={false} autoComplete={remember ? 'email' : 'off'} inputMode="email" />
        <PasswordInput value={password} onChangeText={text => { setPassword(text); setError(''); }}
          placeholder="••••••••••" placeholderTextColor={colors.placeholder} hidePlaceholderOnFocus
          autoComplete={remember ? 'current-password' : 'off'} onSubmitEditing={submit} />
        <View style={authStyles.row}>
          <AuthCheckbox checked={remember} onChange={setRemember}>Remember me</AuthCheckbox>
          <AuthLink label="Forgot password?" onPress={() => navigation.push({ name: 'ForgotPassword', email })} />
        </View>
        {error !== '' && <AuthMessage error>{error}</AuthMessage>}
        <AuthButton label="Sign in" onPress={submit} />
        <View style={styles.divider}>
          <View style={styles.line} /><Text style={styles.caption}>OR CONTINUE WITH</Text><View style={styles.line} />
        </View>
        <GoogleButton onPress={() => navigation.reset({ name: 'AllSet', firstName: authService.continueWithGoogle() })} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  line: { height: 1, flex: 1, backgroundColor: colors.border },
  caption: { fontSize: 11, letterSpacing: 0.8, color: colors.muted },
});
