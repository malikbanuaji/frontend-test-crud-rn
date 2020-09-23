import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spacing} from '../../styles';
import HeaderLoading from './HeaderLoading';

export default function HeaderBar({children, isLoading, loadingMessage}) {
  return (
    <View testID={'header-bar'} style={styles.headerBar}>
      {isLoading ? <HeaderLoading text={loadingMessage} /> : children}
    </View>
  );
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
