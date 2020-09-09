import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {Typography, Colors, Mixins, Spacing} from '../../styles';

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
      <TouchableNativeFeedback onPress={_handlePress}>
        <View style={styles.contactListItemButton}>
          <Image
            style={styles.photo}
            source={{uri: photo}}
            width={40}
            height={40}
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
  contactListItem: {},
  contactListItemButton: {
    alignItems: 'center',
    // padding: Spacing.smaller,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.smaller,
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  photo: {
    ...Mixins.contactListItemPhoto,
    width: 40,
    height: 40,
    marginRight: Spacing.small,
  },
  name: {
    ...Typography.cardTitle,
  },
  age: {
    ...Typography.cardSubtitle,
  },
});
