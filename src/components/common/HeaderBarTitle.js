import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Spacing, Typography} from '../../styles';

export default function HeaderBarTitle({text}) {
  return <Text style={styles.headerBarTitle}>{text}</Text>;
}

const styles = StyleSheet.create({
  headerBarTitle: {
    ...Typography.headerBarTitle,
    flex: 1,
    marginLeft: Spacing.smaller,
  },
});
