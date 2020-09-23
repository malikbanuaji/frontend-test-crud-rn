import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Spacing, Typography, Mixins} from '../../styles';

export default function HeaderBarButton({text, onPress, style, textStyle}) {
  return (
    <View style={[styles.baseButton, style]}>
      <TouchableNativeFeedback testID={'header-bar-button'} onPress={onPress}>
        <View style={styles.actionButton}>
          <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonText: {
    ...Typography.headerButtonText,
  },
  actionButton: {
    padding: Spacing.smaller,
  },
  baseButton: {
    ...Mixins.buttonRounded,
    ...Mixins.buttonBorder,
  },
});
