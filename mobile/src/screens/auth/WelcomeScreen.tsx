import { StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthIcon, BrandIcon } from '../../components/auth/AuthIcon';
import { AuthLayout, Heading, authStyles } from '../../components/auth/AuthLayout';
import { colors } from '../../theme/colors';
import type { AuthNavigation } from '../../types/auth';

const features = [
  { icon: 'calendar', label: 'Plan' },
  { icon: 'restaurant', label: 'Book' },
  { icon: 'sparkles', label: 'Ask AI' },
] as const;

export function WelcomeScreen({ navigation }: { navigation: AuthNavigation }) {
  return (
    <AuthLayout dark footer={
      <>
        <View style={authStyles.actions}>
          <AuthButton variant="peach" label="Get started" onPress={() => navigation.push({ name: 'CreateAccount' })} />
          <AuthButton variant="outlineDark" label="I already have an account" onPress={() => navigation.push({ name: 'SignIn' })} />
        </View>
        <View accessible={false} style={styles.dots}>
          <View style={[styles.dot, styles.selected]} /><View style={styles.dot} /><View style={styles.dot} />
        </View>
      </>
    }>
      <View style={authStyles.hero}>
        <BrandIcon size={130} source={require('../../../assets/images/chronos-welcome.png')} />
        <Heading title="Chronos" center dark>Your schedule, flights, stays and tables — planned around your time.</Heading>
        <View style={styles.features}>
          {features.map(({ icon, label }) => (
            <View key={label} style={styles.feature}>
              <AuthIcon name={icon} size={16} tint={colors.onDark} />
              <Text style={styles.label}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  features: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FFFFFF25', backgroundColor: '#FFFFFF12' },
  label: { color: colors.onDark, fontSize: 13 },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 8, paddingTop: 18, paddingBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.onDark },
  selected: { width: 28, backgroundColor: colors.peach },
});
