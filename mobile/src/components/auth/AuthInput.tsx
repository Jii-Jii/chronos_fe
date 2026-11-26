import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { AuthIcon, type IconName } from './AuthIcon';

type Props = TextInputProps & {
  label: string;
  icon: IconName;
  accessory?: ReactNode;
  hidePlaceholderOnFocus?: boolean;
};

export function AuthInput({ label, icon, accessory, hidePlaceholderOnFocus = false, placeholder, onChangeText, ...props }: Props) {
  const [focused, setFocused] = useState(false);
  const [placeholderHidden, setPlaceholderHidden] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={typography.small}>{label}</Text>
      <View style={[styles.box, focused && styles.focused]}>
        <AuthIcon name={icon} />
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          selectionColor={colors.focus}
          {...props}
          placeholder={placeholderHidden ? '' : placeholder}
          onFocus={event => {
            setFocused(true);
            setPlaceholderHidden(hidePlaceholderOnFocus);
            props.onFocus?.(event);
          }}
          onBlur={event => {
            setFocused(false);
            setPlaceholderHidden(false);
            props.onBlur?.(event);
          }}
          onChangeText={hidePlaceholderOnFocus ? text => {
            setPlaceholderHidden(false);
            onChangeText?.(text);
          } : onChangeText}
          style={[styles.input, props.style]}
        />
        {accessory}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  box: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  focused: { borderColor: colors.focus, borderWidth: 2, paddingHorizontal: 15 },
  input: { flex: 1, minHeight: 54, paddingVertical: 8, color: colors.ink, fontSize: 16 },
});
