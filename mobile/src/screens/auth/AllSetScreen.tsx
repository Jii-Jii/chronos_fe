import { StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthIcon, BrandIcon } from '../../components/auth/AuthIcon';
import { AuthLayout, Heading, authStyles } from '../../components/auth/AuthLayout';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { AuthNavigation } from '../../types/auth';

const features = [
  { icon: 'calendar', title: 'Your schedule, one view', detail: 'See meetings, trips and plans together.' },
  { icon: 'plane', title: 'Book in a few taps', detail: 'Flights, hotels and restaurants — no app hopping.' },
  { icon: 'sparkles', title: 'Or just ask Chronos', detail: '“Book dinner for two near my hotel at 8.”' },
] as const;

export function AllSetScreen({ firstName, navigation }: { firstName: string; navigation: AuthNavigation }) {
  return (
    <AuthLayout dark footer={
      <AuthButton variant="peach" label="Go to my schedule" onPress={() => navigation.reset({ name: 'Schedule' })} />
    }>
      <View style={authStyles.group}>
        <BrandIcon size={82} />
        <Heading dark title={`You’re all set, ${firstName}`}>
          Chronos is ready to plan around your time. Here’s what you can do:
        </Heading>
        <View style={authStyles.actions}>
          {features.map(({ icon, title, detail }) => (
            <View key={title} style={styles.card}>
              <View style={styles.tile}><AuthIcon name={icon} /></View>
              <View style={styles.copy}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.detail}>{detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 20, backgroundColor: '#FFFFFF12', borderWidth: 1, borderColor: '#FFFFFF20' },
  tile: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.peach, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 3 },
  title: { ...typography.small, color: colors.onDark, fontWeight: '600' },
  detail: { ...typography.small, color: colors.peach },
});
