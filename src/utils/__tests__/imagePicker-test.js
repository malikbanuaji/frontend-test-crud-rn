import {PermissionsAndroid} from 'react-native';
import * as ReactNative from 'react-native';
import {Platform, Alert, Linking} from 'react-native';
import {cleanup, waitFor} from '@testing-library/react-native';
import Permissions from '../permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import UImagePicker from '../imagePicker';

jest.mock('react-native-image-crop-picker', () => {
  return {openCamera: jest.fn(), openPicker: jest.fn()};
});
jest.mock('../permissions');

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
      Linking: {
        ...ReactNative.Linking,
        openSettings: jest.fn(),
      },
    },
    ReactNative,
  );
});

Platform.OS = 'android';

describe('permissions camera', () => {
  beforeEach(() => {
    jest.spyOn(PermissionsAndroid, 'requestMultiple');
    jest.spyOn(Alert, 'alert');
    jest.spyOn(Linking, 'openSettings');
    Permissions.Camera.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test('when granted', (done) => {
    function mockOnSuccess(data) {
      try {
        expect(data).toBe('data:image/jpeg;base64,test');
        done();
      } catch (error) {
        done(error);
      }
    }
    const mockOnDenied = jest.fn();
    Permissions.Camera.mockImplementationOnce(() => Promise.resolve('granted'));
    ImageCropPicker.openCamera.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test'}),
    );
    UImagePicker.takePhoto(mockOnDenied, mockOnSuccess);
  });

  it('when denied', (done) => {
    const mockOnDenied = jest.fn();
    function mockOnSuccess(data) {
      try {
        expect(data).toBe(null);
        expect(Alert.alert).toBeCalledWith(
          expect.any(String),
          expect.any(String),
          expect.arrayContaining([
            expect.objectContaining({
              text: 'NANTI',
            }),
            expect.objectContaining({
              onPress: expect.any(Function),
              text: 'LANJUTKAN',
            }),
          ]),
          expect.objectContaining({cancelable: false}),
        );
        Alert.alert.mock.calls[0][2][1].onPress();
        expect(mockOnDenied).toBeCalled();
        done();
      } catch (error) {
        done(error);
      }
    }
    Permissions.Camera.mockImplementationOnce(() => Promise.resolve('denied'));
    ImageCropPicker.openCamera.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test1'}),
    );
    UImagePicker.takePhoto(mockOnDenied, mockOnSuccess);
  });

  it('when never_ask_again', (done) => {
    const mockOnDenied = jest.fn();
    function mockOnSuccess(data) {
      try {
        expect(data).toBe(null);
        expect(Alert.alert).toBeCalledWith(
          expect.any(String),
          expect.any(String),
          expect.arrayContaining([
            expect.objectContaining({
              text: 'NANTI',
            }),
            expect.objectContaining({
              onPress: expect.any(Function),
              text: 'LANJUTKAN',
            }),
          ]),
          expect.objectContaining({cancelable: false}),
        );
        Alert.alert.mock.calls[0][2][1].onPress();
        expect(Linking.openSettings).toBeCalled();
        done();
      } catch (error) {
        done(error);
      }
    }
    Permissions.Camera.mockImplementationOnce(() =>
      Promise.resolve('never_ask_again'),
    );
    ImageCropPicker.openCamera.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test1'}),
    );
    UImagePicker.takePhoto(mockOnDenied, mockOnSuccess);
  });
});
describe('permissions gallery', () => {
  beforeEach(() => {
    jest.spyOn(PermissionsAndroid, 'requestMultiple');
    jest.spyOn(Alert, 'alert');
    jest.spyOn(Linking, 'openSettings');
    Permissions.Camera.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('when granted', (done) => {
    function mockOnSuccess(data) {
      try {
        expect(data).toBe('data:image/jpeg;base64,test');
        done();
      } catch (error) {
        done(error);
      }
    }
    const mockOnDenied = jest.fn();
    Permissions.Gallery.mockImplementationOnce(() =>
      Promise.resolve('granted'),
    );
    ImageCropPicker.openPicker.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test'}),
    );
    UImagePicker.selectGallery(mockOnDenied, mockOnSuccess);
  });

  it('when denied', (done) => {
    const mockOnDenied = jest.fn();
    function mockOnSuccess(data) {
      try {
        expect(data).toBe(null);
        expect(Alert.alert).toBeCalledWith(
          expect.any(String),
          expect.any(String),
          expect.arrayContaining([
            expect.objectContaining({
              text: 'NANTI',
            }),
            expect.objectContaining({
              onPress: expect.any(Function),
              text: 'LANJUTKAN',
            }),
          ]),
          expect.objectContaining({cancelable: false}),
        );
        Alert.alert.mock.calls[0][2][1].onPress();
        expect(mockOnDenied).toBeCalled();
        done();
      } catch (error) {
        done(error);
      }
    }
    Permissions.Gallery.mockImplementationOnce(() => Promise.resolve('denied'));
    ImageCropPicker.openPicker.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test1'}),
    );
    UImagePicker.selectGallery(mockOnDenied, mockOnSuccess);
  });

  it('when never_ask_again', (done) => {
    const mockOnDenied = jest.fn();
    function mockOnSuccess(data) {
      try {
        expect(data).toBe(null);
        expect(Alert.alert).toBeCalledWith(
          expect.any(String),
          expect.any(String),
          expect.arrayContaining([
            expect.objectContaining({
              text: 'NANTI',
            }),
            expect.objectContaining({
              onPress: expect.any(Function),
              text: 'LANJUTKAN',
            }),
          ]),
          expect.objectContaining({cancelable: false}),
        );
        Alert.alert.mock.calls[0][2][1].onPress();
        expect(Linking.openSettings).toBeCalled();
        done();
      } catch (error) {
        done(error);
      }
    }
    Permissions.Gallery.mockImplementationOnce(() =>
      Promise.resolve('never_ask_again'),
    );
    ImageCropPicker.openPicker.mockImplementationOnce(() =>
      Promise.resolve({mime: 'image/jpeg', data: 'test1'}),
    );
    UImagePicker.selectGallery(mockOnDenied, mockOnSuccess);
  });
});
