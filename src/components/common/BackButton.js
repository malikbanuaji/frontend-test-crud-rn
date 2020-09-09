import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function BackButton({onPress}) {
  return (
    <View style={styles.backButton}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.button}>
          <Icon name={'chevron-left'} size={24} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 8,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
