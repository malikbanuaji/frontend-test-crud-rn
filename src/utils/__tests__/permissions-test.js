import {PermissionsAndroid} from 'react-native';
import {default as Permissions} from '../permissions';
import * as ReactNative from 'react-native';
import {Platform, Alert} from 'react-native';
import {cleanup} from '@testing-library/react-native';

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Platform: {
        ...ReactNative.Platform,
        OS: 'android',
        Version: 23,
        isTesting: true,
        select: (objs) => objs['android'],
      },
      PermissionsAndroid: {
        ...ReactNative.PermissionsAndroid,
        requestMultiple: () => jest.fn(),
      },
      Alert: {
        ...ReactNative.Alert,
        alert: jest.fn(),
      },
    },
    ReactNative,
  );
});

Platform.OS = 'android';

describe('permissions', () => {
  beforeEach(() => {
    jest.spyOn(PermissionsAndroid, 'requestMultiple');
    jest.spyOn(Alert, 'alert');
    PermissionsAndroid.requestMultiple.mockReset();
  });
  afterEach(cleanup);
  it('request correctly for camera', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.CAMERA]: 'granted',
      }),
    );
    const result = await Permissions.Camera();
    expect(PermissionsAndroid.requestMultiple).toBeCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    expect(result).toBe('granted');
  });

  it('request contain denied for camera', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]: 'denied',
        [PermissionsAndroid.PERMISSIONS.CAMERA]: 'granted',
      }),
    );
    const result = await Permissions.Camera();
    expect(PermissionsAndroid.requestMultiple).toBeCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    expect(result).toBe('denied');
  });

  it('request contain never_ask_again for camera', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]:
          'never_ask_again',
        [PermissionsAndroid.PERMISSIONS.CAMERA]: 'granted',
      }),
    );
    const result = await Permissions.Camera();
    expect(PermissionsAndroid.requestMultiple).toBeCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    expect(result).toBe('never_ask_again');
  });

  it('request correctly for gallery', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]: 'granted',
      }),
    );
    const result = await Permissions.Gallery();
    expect(PermissionsAndroid.requestMultiple).toHaveBeenCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    expect(result).toBe('granted');
  });

  it('request contain denied for gallery', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]: 'denied',
      }),
    );
    const result = await Permissions.Gallery();
    expect(PermissionsAndroid.requestMultiple).toBeCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    expect(result).toBe('denied');
  });

  it('request contain never_ask_again for gallery', async () => {
    PermissionsAndroid.requestMultiple.mockImplementationOnce(() =>
      Promise.resolve({
        [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]: 'granted',
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]:
          'never_ask_again',
      }),
    );
    const result = await Permissions.Gallery();
    expect(PermissionsAndroid.requestMultiple).toBeCalledWith([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    expect(result).toBe('never_ask_again');
  });
});
