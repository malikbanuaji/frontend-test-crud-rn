import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Mixins, Typography} from '../../styles';

export default function PhotoSmall({photo, firstName, lastName, style}) {
  return (
    <View style={[style]}>
      {photo === 'N/A' ? (
        <View style={[styles.emptyPhoto]}>
          <Text style={styles.emptyText}>
            {`${firstName.substring(0, 1)}${lastName.substring(
              0,
              1,
            )}`.toUpperCase()}
          </Text>
        </View>
      ) : (
        <Image
          style={styles.photo}
          source={{uri: photo}}
          width={40}
          height={40}
        />
      )}
    </View>
  );
}

PhotoSmall.defaultProps = {
  firstName: '',
  lastName: '',
  photo: 'N/A',
};

const styles = StyleSheet.create({
  photo: {
    ...Mixins.photoSmallDimension,
    ...Mixins.photo,
  },
  emptyPhoto: {
    ...Mixins.emptyPhoto,
    ...Mixins.photoSmallDimension,
  },
  emptyText: {
    ...Typography.photoSmallEmptyText,
  },
});
