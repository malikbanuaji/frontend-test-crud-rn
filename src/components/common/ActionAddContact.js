import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';

export default function ActionAddContact({onPress}) {
  return (
    <View style={styles.actionAddContact}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.actionAddContactButton, styles.actionAddContact]}>
          <View key={'icon'} />
          <Text style={styles.caption}>{'Tambah kontak'}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  actionAddContact: {
    borderRadius: 8,
  },
  actionAddContactButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  caption: {},
});
