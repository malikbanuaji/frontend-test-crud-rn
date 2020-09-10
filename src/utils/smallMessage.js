const {ToastAndroid} = require('react-native');

export function showError() {
  ToastAndroid.show(
    'Terjadi Kesalahan. Silahkan coba beberapa saat lagi.',
    ToastAndroid.SHORT,
  );
}
