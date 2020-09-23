import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Spacing, Typography} from '../../styles';
import PhotoSmall from './PhotoSmall';

export default function ContactListItem({
  id,
  photo,
  firstName,
  lastName,
  age,
  onPress,
  style,
}) {
  function _handlePress() {
    onPress && onPress({id: id});
  }

  return (
    <View style={[styles.contactListItem, style]}>
      <TouchableNativeFeedback
        testID={'contact-list-item-button'}
        onPress={_handlePress}>
        <View style={styles.contactListItemButton}>
          <PhotoSmall
            style={styles.photoSmall}
            photo={photo}
            firstName={firstName}
            lastName={lastName}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.age}>{age}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  contactListItemButton: {
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.smaller,
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    ...Typography.cardTitle,
  },
  age: {
    ...Typography.cardSubtitle,
  },
  photoSmall: {
    marginRight: Spacing.smaller,
  },
});
