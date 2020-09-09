import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Typography, Colors} from '../../styles';

export default function ContactListItem({photo, firstName, lastName, age}) {
  return (
    <View style={styles.contactListItem}>
      <Image
        style={styles.photo}
        source={{uri: photo}}
        borderRadius={8}
        width={40}
        height={40}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.age}>{age}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactListItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  photo: {
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  name: {
    ...Typography.CardTitle,
  },
  age: {
    ...Typography.CardSubtitle,
  },
});
