import React, { useCallback } from 'react';
import {StyleSheet} from 'react-native';
import {Mixins, Typography} from '../../styles';
import BaseButton from './BaseButton';

export default function NormalButton({
  text,
  onPress,
  textStyle,
  style,
  disabled,
}) {
  const handlePress = useCallback(() => {
    if (disabled !== true) {
      onPress();
    }
  }, [disabled, onPress]);
  return (
    <BaseButton
      disabled={disabled}
      text={text}
      onPress={handlePress}
      style={[styles.button, style]}
      textStyle={[styles.buttonText, textStyle]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    ...Mixins.buttonBorder,
    ...Mixins.buttonRounded,
  },
  buttonText: {
    ...Typography.buttonText,
  },
});
