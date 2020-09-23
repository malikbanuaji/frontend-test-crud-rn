const {Alert} = require('react-native');

export function popAskPermissionCamera(onPressPositive) {
  Alert.alert(
    'Perizinan',
    'Untuk mengambil foto, izinkan Kontak Mu untuk mengakses kamera dan penyimpanan di perangkat Anda.',
    [
      {
        text: 'NANTI',
      },
      {
        text: 'LANJUTKAN',
        onPress: onPressPositive,
      },
    ],
    {cancelable: false},
  );
}

export function popAskPermissionGallery(onPressPositive = () => {}) {
  Alert.alert(
    'Perizinan',
    'Untuk menambahkan foto, izinkan Kontak Mu untuk mengakses penyimpanan di perangkat Anda.',
    [
      {
        text: 'NANTI',
      },
      {
        text: 'LANJUTKAN',
        onPress: onPressPositive,
      },
    ],
    {cancelable: false},
  );
}
