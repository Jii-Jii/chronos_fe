import { useState } from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthIcon } from '../../components/auth/AuthIcon';
import { AuthLayout, AuthLink, AuthMessage, Heading, authStyles } from '../../components/auth/AuthLayout';
import { authService } from '../../services/authService';
import { colors } from '../../theme/colors';
import type { AuthNavigation } from '../../types/auth';

export function ResetLinkSentScreen({ email, navigation }: { email: string; navigation: AuthNavigation }) {
  const [feedback, setFeedback] = useState({ text: '', error: false });

  async function openEmail() {
    try {
      const inbox = Platform.OS === 'ios' ? 'message://' : 'googlegmail://';
      await Linking.openURL(inbox).catch(() => Linking.openURL('mailto:'));
      setFeedback({ text: '', error: false });
    } catch {
      setFeedback({ text: 'Couldn’t open email. Open your email app from your device.', error: true });
    }
  }

  function resend() {
    authService.requestPasswordReset(email);
    setFeedback({ text: 'Reset link requested again.', error: false });
  }

  return (
    <AuthLayout onBack={navigation.back} footer={
      <>
        <View style={authStyles.actions}>
          <AuthButton label="Open email app" onPress={openEmail} />
          <AuthButton label="Back to sign in" variant="outline" onPress={navigation.toSignIn} />
        </View>
        <AuthLink before="Didn’t get it?" label="Resend link" onPress={resend} />
        {feedback.text !== '' && <AuthMessage error={feedback.error}>{feedback.text}</AuthMessage>}
      </>
    }>
      <View style={authStyles.hero}>
        <View style={styles.outer}>
          <View style={styles.inner}><AuthIcon name="mailCheck" tint={colors.peach} size={38} /></View>
        </View>
        <Heading title="Check your inbox" center>
          We sent a password reset link to {email}. It expires in 30 minutes.
        </Heading>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  outer: { width: 132, height: 132, borderRadius: 66, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.peach },
  inner: { width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
});
