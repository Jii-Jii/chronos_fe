import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthLayout, AuthLink, AuthMessage, Heading, IconTile, authStyles } from '../../components/auth/AuthLayout';
import { authError, authService } from '../../services/authService';
import type { AuthNavigation } from '../../types/auth';

export function ForgotPasswordScreen({ initialEmail, navigation }: { initialEmail: string; navigation: AuthNavigation }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');

  function submit() {
    try {
      const address = authService.requestPasswordReset(email);
      Keyboard.dismiss();
      setError('');
      navigation.push({ name: 'ResetLinkSent', email: address });
    } catch (reason) {
      setError(authError(reason));
    }
  }

  return (
    <AuthLayout onBack={navigation.back} footer={
      <>
        <AuthButton label="Send reset link" onPress={submit} />
        <AuthLink before="Remembered it?" label="Back to sign in" onPress={navigation.toSignIn} />
      </>
    }>
      <View style={authStyles.group}>
        <IconTile name="lock" />
        <Heading title="Forgot password?">No worries. Enter the email linked to your account and we’ll send you a reset link.</Heading>
        <AuthInput label="Email" icon="mail" value={email} onChangeText={text => { setEmail(text); setError(''); }}
          placeholder="maya@chronosapp.io" inputMode="email" autoCapitalize="none" autoCorrect={false}
          autoComplete="email" onSubmitEditing={submit} />
        {error !== '' && <AuthMessage error>{error}</AuthMessage>}
      </View>
    </AuthLayout>
  );
}
