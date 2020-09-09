import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function SearchContact({onChangeText, value}) {
  return (
    <View style={styles.searchContact}>
      <View key={'leftIcon'} />
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.searchInput}
        placeholder={'Search contact...'}
      />
      <View key={'rightIcon'} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContact: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
  },
  searchInput: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
});
