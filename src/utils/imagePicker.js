import {Linking} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Colors} from '../styles';
import Permissions from './permissions';
import * as PopUp from './popUp';

export default class UImagePicker {
  static baseSettings = {
    width: 300,
    height: 300,
    cropping: true,
    cropperStatusBarColor: Colors.primary,
    cropperCancelText: 'Batal',
    cropperChooseText: 'Pilih',
    cropperToolbarTitle: 'Ubah gambar',
    includeBase64: true,
    cropperToolbarColor: Colors.primary,
    multiple: false,
    cropperToolbarWidgetColor: Colors.white,
  };

  static async selectGallery(onPopUpDenied, onResult) {
    try {
      const result = await Permissions.Gallery();
      if (result === 'never_ask_again') {
        PopUp.popAskPermissionCamera(() => Linking.openSettings());
        onResult(null);
      } else if (result === 'denied') {
        PopUp.popAskPermissionCamera(() => onPopUpDenied && onPopUpDenied());
        onResult(null);
      } else {
        const value = await ImageCropPicker.openPicker(this.baseSettings);
        onResult(`data:${value.mime};base64,${value.data}`);
      }
    } catch (error) {
      throw error;
    }
  }
  static async takePhoto(onPopUpDenied = () => {}, onResult = () => {}) {
    try {
      const result = await Permissions.Camera();
      if (result === 'never_ask_again') {
        PopUp.popAskPermissionCamera(() => Linking.openSettings());
        onResult(null);
      } else if (result === 'denied') {
        PopUp.popAskPermissionCamera(() => onPopUpDenied && onPopUpDenied());
        onResult(null);
      } else {
        const value = await ImageCropPicker.openCamera(this.baseSettings);
        onResult(`data:${value.mime};base64,${value.data}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
