import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {Mixins, Spacing, Colors, Typography} from '../../styles';
import Icon from 'react-native-vector-icons/Feather';

export default function ActionAddContact({onPress}) {
  return (
    <View style={styles.actionAddContact}>
      <TouchableNativeFeedback
        testID={'action-add-contact-button'}
        onPress={onPress}>
        <View style={styles.actionAddContactButton}>
          <Icon key={'icon'} name={'plus'} size={24} style={styles.icon} />
          <Text style={styles.caption}>{'Tambah kontak'}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  actionAddContact: {
    ...Mixins.baseRounded,
    overflow: 'hidden',
  },
  actionAddContactButton: {
    ...Mixins.baseRounded,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.small,
    backgroundColor: Colors.primary,
  },
  caption: {
    ...Typography.actionButtonText,
  },
  icon: {
    marginRight: Spacing.smallest,
  },
});
