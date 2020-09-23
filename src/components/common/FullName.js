import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Spacing, Typography} from '../../styles';

export default function FullName({firstName, lastName}) {
  return (
    <Text key={'name'} style={styles.name}>{`${firstName} ${lastName}`}</Text>
  );
}

const styles = StyleSheet.create({
  name: {
    ...Typography.contactTitle,
    marginHorizontal: Spacing.base,
  },
});
