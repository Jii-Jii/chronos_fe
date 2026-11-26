import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import {
  AuthLayout,
  AuthLink,
  AuthMessage,
  Heading,
  IconTile,
  authStyles,
} from '../../components/auth/AuthLayout';
import { OTPInput } from '../../components/auth/OTPInput';
import {
  authError,
  authService,
  resendDelaySeconds,
} from '../../services/authService';
import { typography } from '../../theme/typography';
import type { AuthNavigation } from '../../types/auth';

const styles = StyleSheet.create({
  centeredText: { textAlign: 'center' },
});

export function VerifyEmailScreen({
  email,
  navigation,
}: {
  email: string;
  navigation: AuthNavigation;
}) {
  const [code, setCode] = useState('');
  const [deadline, setDeadline] = useState(
    () => Date.now() + resendDelaySeconds * 1000,
  );
  const [remaining, setRemaining] = useState(resendDelaySeconds);
  const [feedback, setFeedback] = useState({ text: '', error: false });

  useEffect(() => {
    const timer = setInterval(
      () =>
        setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000))),
      250,
    );
    return () => clearInterval(timer);
  }, [deadline]);

  function verify() {
    try {
      const firstName = authService.verifyEmail(email, code);
      Keyboard.dismiss();
      navigation.reset({ name: 'AllSet', firstName });
    } catch (reason) {
      setFeedback({ text: authError(reason), error: true });
    }
  }

  function resend() {
    if (Date.now() < deadline) return;
    try {
      authService.resendCode(email);
      setDeadline(Date.now() + resendDelaySeconds * 1000);
      setRemaining(resendDelaySeconds);
      setFeedback({
        text: 'A new verification code was requested.',
        error: false,
      });
    } catch (reason) {
      setFeedback({ text: authError(reason), error: true });
    }
  }

  return (
    <AuthLayout
      onBack={navigation.back}
      footer={
        <>
          <AuthButton
            label="Verify & continue"
            disabled={code.length !== 6}
            onPress={verify}
          />
          <AuthLink
            before="Wrong email?"
            label="Change it"
            onPress={navigation.back}
          />
        </>
      }
    >
      <View style={authStyles.group}>
        <IconTile name="mailCheck" />
        <Heading title="Verify your email">
          Enter the 6-digit code we sent to{' '}
          <Text style={typography.strong}>{email}</Text>
        </Heading>
        <OTPInput
          value={code}
          onChange={value => {
            setCode(value);
            setFeedback({ text: '', error: false });
          }}
        />
        {remaining > 0 ? (
          <Text style={[typography.small, styles.centeredText]}>
            Didn’t get it? Resend in 0:{String(remaining).padStart(2, '0')}
          </Text>
        ) : (
          <AuthLink
            before="Didn’t get it?"
            label="Resend code"
            onPress={resend}
          />
        )}
        {feedback.text !== '' && (
          <AuthMessage error={feedback.error}>{feedback.text}</AuthMessage>
        )}
      </View>
    </AuthLayout>
  );
}
