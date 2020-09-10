import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';

export default function HeaderLoading({text}) {
  return (
    <View style={styles.headerLoading}>
      <View style={styles.content}>
        <ActivityIndicator
          color={Colors.primary}
          animating={true}
          size={30}
          style={{marginRight: Spacing.smaller}}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...Typography.headerLoadingText,
  },
});
