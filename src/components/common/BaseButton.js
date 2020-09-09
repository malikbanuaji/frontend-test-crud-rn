import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Spacing, Typography} from '../../styles';

export default function BaseButton({text, onPress, style, textStyle}) {
  return (
    <View style={[style]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.actionButton}>
          <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonText: {
    ...Typography.buttonText,
  },
  actionButton: {
    padding: Spacing.smaller,
  },
});
