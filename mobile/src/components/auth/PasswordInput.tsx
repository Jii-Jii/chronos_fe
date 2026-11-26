import { useState, type ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { AuthInput } from './AuthInput';
import { AuthIcon } from './AuthIcon';

export function PasswordInput(props: Omit<ComponentProps<typeof AuthInput>, 'icon' | 'label' | 'accessory'>) {
  const [visible, setVisible] = useState(false);
  return (
    <AuthInput {...props} label="Password" icon="lock" autoCapitalize="none" autoCorrect={false}
      secureTextEntry={!visible}
      accessory={
        <Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          hitSlop={10} onPress={() => setVisible(value => !value)}>
          <AuthIcon name="eye" />
        </Pressable>
      }
    />
  );
}
