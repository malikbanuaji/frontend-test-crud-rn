import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Spacing, Typography, Mixins} from '../../styles';

export default function BaseButton({
  text,
  onPress,
  style,
  textStyle,
  disabled,
}) {
  const handlePress = useCallback(() => {
    if (disabled !== true) {
      onPress();
    }
  }, [disabled, onPress]);

  return (
    <View style={[style, disabled && styles.disabled]}>
      <TouchableNativeFeedback disabled={disabled} onPress={handlePress}>
        <View style={styles.button}>
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    ...Typography.buttonText,
  },
  button: {
    padding: Spacing.smaller,
  },
  disabled: {
    ...Mixins.disabled,
  },
});
