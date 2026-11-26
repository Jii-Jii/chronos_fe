import { Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export function GoogleButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Continue with Google" onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Image source={require('../../../assets/icons/google.png')} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { height: 58, borderWidth: 1, borderColor: colors.border, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.65 },
  icon: { width: 22, height: 22 },
});
