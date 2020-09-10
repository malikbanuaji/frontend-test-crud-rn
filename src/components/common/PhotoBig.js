import React, {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {Colors, Mixins, Typography} from '../../styles';

export default function PhotoBig({onPress, photo, firstName, lastName}) {
  const windows = useWindowDimensions();
  const photoSize = useMemo(() => {
    return {
      width: windows.width * 0.3,
      height: windows.width * 0.3,
    };
  }, [windows.width]);
  return (
    <View style={styles.photo}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.photo]}>
          {photo === 'N/A' ? (
            <View style={[photoSize, styles.emptyPhoto]}>
              <Text style={styles.emptyText}>
                {`${firstName.substring(0, 1)}${lastName.substring(
                  0,
                  1,
                )}`.toUpperCase()}
              </Text>
            </View>
          ) : (
            <Image style={photoSize} {...photoSize} source={{uri: photo}} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

PhotoBig.defaultProps = {
  firstName: '',
  lastName: '',
  photo: 'N/A',
};

const styles = StyleSheet.create({
  photo: {
    ...Mixins.photo,
  },
  emptyPhoto: {
    ...Mixins.emptyPhoto,
  },
  emptyText: {
    ...Typography.photoBigEmptyText,
  },
});
