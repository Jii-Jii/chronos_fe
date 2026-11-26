import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const cells = [0, 1, 2, 3, 4, 5];

export function OTPInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.row}>
      {cells.map(index => (
        <View key={index} accessible={false} style={[styles.cell, focused && value.length === index && styles.active]}>
          <Text style={styles.digit}>{value[index]}</Text>
        </View>
      ))}
      <TextInput accessibilityLabel="Six-digit verification code" value={value}
        onChangeText={text => onChange(text.replace(/\D/g, '').slice(0, 6))}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        inputMode="numeric" autoComplete="one-time-code" textContentType="oneTimeCode"
        selectionColor="transparent" caretHidden style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  cell: { flex: 1, height: 62, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  active: { borderColor: colors.focus, borderWidth: 2 },
  digit: { ...typography.title, fontSize: 30 },
  input: { ...StyleSheet.absoluteFill, color: 'transparent', backgroundColor: 'transparent' },
});
