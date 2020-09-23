import {cleanup, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as ReactNative from 'react-native';
import {Alert, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {act} from 'react-test-renderer';
import {configureStore} from '../../redux';
import {setContactList} from '../../redux/actions/contact';
import {Api} from '../../services';
import ContactDetailScreen from '../ContactDetailScreen';

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Redefine an export, like a component
      Button: 'MockedButton',

      // Mock out properties of an already mocked export
      LayoutAnimation: {
        ...ReactNative.LayoutAnimation,
        configureNext: jest.fn(),
      },

      // Mock a native module
      NativeModules: {
        ...ReactNative.NativeModules,
        Override: {great: 'success'},
      },

      Alert: {
        ...ReactNative.Alert,
        alert: jest.fn(),
      },

      ToastAndroid: {
        ...ReactNative.ToastAndroid,
        show: jest.fn(),
      },

      Platform: {
        ...ReactNative.Platform,
        OS: 'android',
        Version: 23,
        isTesting: true,
        select: (objs) => objs['android'],
      },
    },
    ReactNative,
  );
});

jest.mock('../../services');

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('ContactList', () => {
  let navigation;
  Platform.OS = 'android';

  const store = configureStore();
  // init state
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);

  beforeEach(() => {
    jest.spyOn(Alert, 'alert');
    Api.deleteContact.mockReset();
    Platform.OS = 'android';
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    store.dispatch(
      setContactList({
        data: [
          {
            id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
            firstName: 'Frodo',
            lastName: 'Baggins',
            age: 24,
            photo: 'N/A',
          },
          {
            id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
            firstName: 'Frodo',
            lastName: 'Baggins',
            age: 24,
            photo:
              'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
          },
        ],
      }),
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });

  it('loads contact with given id on route parameter', async () => {
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      },
    };
    const component = (
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {toJSON} = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  it('loads contact with given id on route parameter (with picture)', async () => {
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      },
    };
    const component = (
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {toJSON} = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handle delete contact button correctly', async () => {
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      },
    };
    const component = (
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByText} = render(component);
    const deleteButton = getByText('Hapus kontak');
    fireEvent.press(deleteButton.parent.parent);
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining([
        {
          text: 'BATAL',
        },
        {
          text: 'HAPUS',
          onPress: expect.any(Function),
        },
      ]),
    );
    await act(() => Alert.alert.mock.calls[0][2][1].onPress());
    expect(Api.deleteContact).toBeCalled();
    expect(navigation.goBack).toBeCalled();
  });

  it('handle edit contact button correctly', async () => {
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      },
    };
    const component = (
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByText} = render(component);

    const editContact = getByText('Ubah kontak');
    fireEvent.press(editContact.parent.parent);
    expect(navigation.navigate).toBeCalledWith(
      'CreateEditContact',
      expect.objectContaining({
        actionStatus: 'EDIT',
        contactDetail: expect.objectContaining({
          age: expect.any(Number),
          firstName: expect.any(String),
          id: expect.any(String),
          lastName: expect.any(String),
          photo: expect.any(String),
        }),
      }),
    );
  });
});
