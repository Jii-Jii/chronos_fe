import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { colors } from '../../theme/colors';

export function SplashScreen({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onReady, 1100);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <AuthLayout dark splash footer={
      <View style={styles.footer}>
        <Text style={styles.tagline}>Plan your time. Book your world.</Text>
        <Text style={styles.version}>v1.0</Text>
      </View>
    }>
      <View style={styles.center}>
        <Image source={require('../../../assets/images/chronos-lockup.png')} resizeMode="contain"
          accessibilityLabel="Chronos" style={styles.logo} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignSelf: 'stretch', justifyContent: 'center' },
  logo: { alignSelf: 'center', width: 330, maxWidth: '100%', aspectRatio: 330 / 282 },
  footer: { alignItems: 'center', paddingBottom: 24, gap: 6 },
  tagline: { color: colors.peach, fontSize: 15 },
  version: { color: colors.peach, opacity: 0.7, fontSize: 12 },
});
