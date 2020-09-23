import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Spacing, Typography, Mixins} from '../../styles';

export default function PhotoModal({
  onPressDelete,
  onPressCamera,
  onPressGallery,
  onPressAbort,
  hasPhoto,
  isVisible,
}) {
  return (
    <Modal
      testID={'pick-photo-modal'}
      onBackdropPress={onPressAbort}
      onBackButtonPress={onPressAbort}
      hideModalContentWhileAnimating={false}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriver={false}
      backdropOpacity={0.6}
      backdropTransitionOutTiming={0}
      isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>Ganti Foto</Text>
        <View style={styles.titleUnderline} />
        {hasPhoto && (
          <TouchableNativeFeedback
            testID={'photo-modal-delete-photo'}
            onPress={onPressDelete}>
            <View style={styles.button}>
              <Text style={styles.buttonItemText}>Hapus foto</Text>
            </View>
          </TouchableNativeFeedback>
        )}
        <TouchableNativeFeedback
          testID={'photo-modal-take-photo'}
          onPress={onPressCamera}>
          <View style={styles.button}>
            <Text style={styles.buttonItemText}>Ambil foto baru</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          testID={'photo-modal-select-gallery'}
          onPress={onPressGallery}>
          <View style={styles.button}>
            <Text style={styles.buttonItemText}>Pilih foto baru</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.cancelButtonContainer}>
          <View style={{...Mixins.buttonRounded}}>
            <TouchableNativeFeedback
              testID={'photo-modal-abort'}
              onPress={onPressAbort}>
              <View style={styles.cancelButtonView}>
                <Text style={styles.actionButtonText}>Batal</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: Mixins.borderRadius,
  },
  title: {...Typography.modalTitle, padding: Spacing.small},
  titleUnderline: {
    height: 1.5,
    backgroundColor: Colors.lightGray,
  },
  button: {
    padding: Spacing.small,
  },
  cancelButtonContainer: {
    alignSelf: 'flex-end',
  },
  cancelButtonView: {
    padding: Spacing.smaller,
  },
  actionButtonText: {
    ...Typography.modalButtonActionText,
  },
  buttonItemText: {
    ...Typography.modalButtonItemText,
  },
});
