import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { AuthIcon, BrandIcon, type IconName } from './AuthIcon';

export function AuthLayout({ children, footer, onBack, showBrand, dark, splash }: {
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
  showBrand?: boolean;
  dark?: boolean;
  splash?: boolean;
}) {
  return (
    <SafeAreaView style={[styles.safe, dark && styles.dark, splash && styles.splash]}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.fill} contentContainerStyle={styles.viewport}>
          <View style={styles.content}>
            {onBack && (
              <View style={styles.header}>
                <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back" style={styles.back}>
                  <AuthIcon name="back" size={18} />
                </Pressable>
                {showBrand && <BrandIcon size={64} />}
              </View>
            )}
            {children}
            {footer && <View style={styles.footer}>{footer}</View>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Heading({ title, children, center = false, dark = false }: {
  title: string;
  children?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  const alignment = center ? styles.centerText : undefined;
  return (
    <View style={styles.heading}>
      <Text accessibilityRole="header" style={[typography.title, alignment, dark && styles.lightText]}>{title}</Text>
      {children && <Text style={[typography.body, alignment, dark && styles.peachText]}>{children}</Text>}
    </View>
  );
}

export function AuthLink({ before, label, onPress }: { before?: string; label: string; onPress: () => void }) {
  return (
    <Text style={[typography.small, styles.centerText]}>
      {before && before + ' '}
      <Text accessibilityRole="link" onPress={onPress} style={typography.strong}>{label}</Text>
    </Text>
  );
}

export function AuthMessage({ children, error = false }: { children: string; error?: boolean }) {
  return <Text accessibilityLiveRegion="polite" style={[typography.small, error && styles.error]}>{children}</Text>;
}

export function IconTile({ name }: { name: IconName }) {
  return <View style={styles.tile}><AuthIcon name={name} size={30} /></View>;
}

export function AuthCheckbox({ checked, onChange, children }: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: string;
}) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={() => onChange(!checked)}
      style={styles.checkboxRow}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <AuthIcon name="check" size={15} tint={colors.onDark} />}
      </View>
      <Text style={[typography.small, styles.checkboxLabel]}>{children}</Text>
    </Pressable>
  );
}

export const authStyles = StyleSheet.create({
  group: { gap: spacing.md },
  actions: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.xs },
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.lg },
});

const styles = StyleSheet.create({
  fill: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.cream },
  dark: { backgroundColor: colors.darkBottom, experimental_backgroundImage: 'linear-gradient(145deg, #644133, #4D2B21)' },
  splash: { backgroundColor: colors.dark, experimental_backgroundImage: undefined },
  viewport: { flexGrow: 1, alignItems: 'center' },
  content: { flexGrow: 1, width: '100%', maxWidth: 480, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 52, marginBottom: spacing.lg },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  footer: { marginTop: 'auto', paddingTop: spacing.lg, gap: spacing.md },
  heading: { gap: spacing.xs },
  centerText: { textAlign: 'center' },
  lightText: { color: colors.onDark },
  peachText: { color: colors.peach },
  error: { color: colors.error },
  tile: { width: 72, height: 72, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.peach, marginBottom: spacing.xs },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs, paddingVertical: 3, flexShrink: 1 },
  checkboxLabel: { flexShrink: 1 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  checked: { backgroundColor: colors.primary },
});
