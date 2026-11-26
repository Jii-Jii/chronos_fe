import { Platform, StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  title: {
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
    color: colors.ink,
  },
  body: { fontSize: 15, lineHeight: 22, color: colors.muted },
  small: { fontSize: 14, lineHeight: 20, color: colors.muted },
  strong: { color: colors.ink, fontWeight: '600' },
});
