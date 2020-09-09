import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spacing} from '../../styles';

export default function HeaderBar({children}) {
  return <View style={styles.headerBar}>{children}</View>;
}

const styles = StyleSheet.create({
  headerBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    height: 72,
  },
});
