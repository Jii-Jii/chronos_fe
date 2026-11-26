import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

type Variant = 'primary' | 'peach' | 'outline' | 'outlineDark';

export function AuthButton({ label, onPress, variant = 'primary', disabled = false }: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
}) {
  const lightText = variant === 'primary' || variant === 'outlineDark';
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={({ pressed }) => [
        styles.button, styles[variant], (pressed || disabled) && styles.dimmed,
      ]}>
      <Text style={[styles.label, { color: lightText ? colors.onDark : colors.ink }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 58, padding: 12, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  peach: { backgroundColor: colors.peach, borderColor: colors.peach },
  outline: { backgroundColor: colors.surface, borderColor: colors.border },
  outlineDark: { backgroundColor: 'transparent', borderColor: colors.onDark },
  dimmed: { opacity: 0.65 },
  label: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
