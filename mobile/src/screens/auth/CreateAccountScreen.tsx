import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthCheckbox, AuthLayout, AuthLink, AuthMessage, Heading, authStyles } from '../../components/auth/AuthLayout';
import { GoogleButton } from '../../components/auth/GoogleButton';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { authError, authService } from '../../services/authService';
import { colors } from '../../theme/colors';
import type { AuthNavigation } from '../../types/auth';

export function CreateAccountScreen({ navigation }: { navigation: AuthNavigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  function submit() {
    try {
      const address = authService.createAccount(name, email, password, agreed);
      Keyboard.dismiss();
      setError('');
      navigation.push({ name: 'VerifyEmail', email: address });
    } catch (reason) {
      setError(authError(reason));
    }
  }

  return (
    <AuthLayout onBack={navigation.back} footer={
      <AuthLink before="Already have an account?" label="Sign in" onPress={navigation.toSignIn} />
    }>
      <View style={authStyles.group}>
        <Heading title="Create your account">One place for your calendar, trips and tables — with an AI that books for you.</Heading>
        <AuthInput label="Full name" icon="user" value={name} onChangeText={setName}
          placeholder="Maya Chen" placeholderTextColor={colors.placeholder} hidePlaceholderOnFocus
          autoComplete="name" autoCapitalize="words" />
        <AuthInput label="Email" icon="mail" value={email} onChangeText={setEmail} placeholder="maya@chronosapp.io"
          placeholderTextColor={colors.placeholder} hidePlaceholderOnFocus
          inputMode="email" autoCapitalize="none" autoCorrect={false} autoComplete="email" />
        <View style={authStyles.actions}>
          <PasswordInput value={password} onChangeText={setPassword}
            placeholder="••••••••••" placeholderTextColor={colors.placeholder} hidePlaceholderOnFocus autoComplete="new-password" />
          <AuthMessage>At least 8 characters, with a number.</AuthMessage>
        </View>
        <AuthCheckbox checked={agreed} onChange={setAgreed}>I agree to the Terms of Service and Privacy Policy</AuthCheckbox>
        {error !== '' && <AuthMessage error>{error}</AuthMessage>}
        <AuthButton label="Create account" onPress={submit} />
        <GoogleButton onPress={() => navigation.reset({ name: 'AllSet', firstName: authService.continueWithGoogle() })} />
      </View>
    </AuthLayout>
  );
}
