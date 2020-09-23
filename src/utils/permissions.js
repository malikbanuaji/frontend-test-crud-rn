const {PermissionsAndroid} = require('react-native');
import * as PopUp from './popUp';

export default class Permissions {
  static async Camera() {
    const multipleResult = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    if (Object.values(multipleResult).includes('never_ask_again')) {
      return 'never_ask_again';
    } else if (Object.values(multipleResult).includes('denied')) {
      return 'denied';
    } else {
      return 'granted';
    }
  }
  static async Gallery() {
    const multipleResult = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (Object.values(multipleResult).includes('never_ask_again')) {
      return 'never_ask_again';
    } else if (Object.values(multipleResult).includes('denied')) {
      return 'denied';
    } else {
      return 'granted';
    }
  }
}
