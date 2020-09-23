import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';
import * as ReactNative from 'react-native';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import {configureStore} from '../../redux';
import {setContactList} from '../../redux/actions/contact';
import {Api} from '../../services';
import Utils from '../../utils';
import CreateEditContactScreen from '../CreateEditContactScreen';

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Alert: {
        ...ReactNative.Alert,
        alert: jest.fn(),
      },
      Platform: {
        ...ReactNative.Platform,
        OS: 'android',
        Version: 23,
        isTesting: true,
        // eslint-disable-next-line dot-notation
        select: (objs) => objs['android'],
      },
      PermissionsAndroid: {
        ...ReactNative.PermissionsAndroid,
        requestMultiple: jest.fn(),
      },
    },
    ReactNative,
  );
});

jest.mock('../../services');
jest.mock('../../utils');

// actionStatus = 'CREATE' | 'EDIT'
/**
 * contactDetail = {
 * photo: 'N/A',
 * firstName: '',
 * lastName: '',
 * age: '0',
 * }
 */
describe('CreateEditContactScreen', () => {
  let navigation;
  const store = configureStore();
  // init state
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(ReactNative.ToastAndroid, 'show');
    jest.spyOn(Alert, 'alert');
    store.dispatch(
      setContactList({
        data: [],
      }),
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });

  it('render create correctly', () => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        actionStatus: 'CREATE',
      },
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {toJSON} = render(component);
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render edit correctly', async () => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Api.deleteContact.mockResolvedValue({
      data: {},
    });
    const route = {
      params: {
        actionStatus: 'EDIT',
        contactDetail: {
          firstName: 'Frodo',
          lastName: 'Baggins',
          age: 24,
          photo: 'N/A',
        },
      },
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {toJSON, getByText} = render(component);
    await waitFor(() => getByText('Ubah kontak'));
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('create new contact', async () => {
    Utils.Validator.firstNameValidator.mockReturnValue(true);
    Utils.Validator.lastNameValidator.mockReturnValue(true);
    Utils.Validator.ageValidator.mockReturnValue(true);
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Api.addContact.mockResolvedValue({
      message: 'contact saved',
    });
    Api.fetchAllContact.mockResolvedValue({
      data: {
        data: [
          {
            id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
            firstName: 'Frodo',
            lastName: 'Baggins',
            age: 24,
            photo: 'N/A',
          },
        ],
      },
    });
    const route = {
      params: {
        actionStatus: 'CREATE',
        contactDetail: {
          firstName: 'Frodo',
          lastName: 'Baggins',
          age: 24,
          photo: 'N/A',
        },
      },
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByText, getByTestId, toJSON} = render(component);
    const firstNameInput = getByTestId('first-name-text-input');
    const lastNameInput = getByTestId('last-name-text-input');
    const saveButton = getByText('Simpan');
    const agePicker = getByTestId('age-picker');

    const firstNameValue = 'Malik';
    const lastNameValue = 'Ridwan';
    const ageValue = '23';

    fireEvent.changeText(firstNameInput, firstNameValue);
    fireEvent.changeText(lastNameInput, lastNameValue);
    fireEvent(agePicker, 'onValueChange', ageValue);
    fireEvent.press(saveButton);

    expect(Utils.Validator.firstNameValidator).toBeCalledWith(firstNameValue);
    expect(Utils.Validator.lastNameValidator).toBeCalledWith(lastNameValue);
    expect(Utils.Validator.ageValidator).toBeCalledWith(ageValue);

    expect(Utils.Validator.firstNameValidator).toHaveReturnedWith(true);
    expect(Utils.Validator.lastNameValidator).toHaveReturnedWith(true);
    expect(Utils.Validator.ageValidator).toHaveReturnedWith(true);

    await waitForElementToBeRemoved(() => getByText('Menyimpan kontak...'));

    expect(Api.addContact).toBeCalled();
    expect(Api.fetchAllContact).toBeCalled();
    expect(ReactNative.ToastAndroid.show).toBeCalled();
    expect(navigation.goBack).toBeCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it('edit firstName lastName with non valid input', async () => {
    Utils.Validator.firstNameValidator.mockReturnValue(false);
    Utils.Validator.lastNameValidator.mockReturnValue(false);
    Utils.Validator.ageValidator.mockReturnValue(true);
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const route = {
      params: {
        actionStatus: 'EDIT',
        contactDetail: {
          firstName: 'Frodo',
          lastName: 'Baggins',
          age: 24,
          photo: 'N/A',
        },
      },
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByText, getByTestId, toJSON} = render(component);
    const firstNameInput = getByTestId('first-name-text-input');
    const lastNameInput = getByTestId('last-name-text-input');
    const saveButton = getByText('Simpan');

    const firstNameValue = 'Fr!';
    const lastNameValue = 'b@g';
    const ageValue = '24';

    fireEvent.changeText(firstNameInput, firstNameValue);
    fireEvent.changeText(lastNameInput, lastNameValue);
    fireEvent.press(saveButton);

    expect(Utils.Validator.firstNameValidator).toBeCalledWith(firstNameValue);
    expect(Utils.Validator.lastNameValidator).toBeCalledWith(lastNameValue);
    expect(Utils.Validator.ageValidator).toBeCalledWith(ageValue);

    expect(Utils.Validator.firstNameValidator).toHaveReturnedWith(false);
    expect(Utils.Validator.lastNameValidator).toHaveReturnedWith(false);
    expect(Utils.Validator.ageValidator).toHaveReturnedWith(true);

    await waitFor(() => getByTestId('last-name-error-message'));
    expect(Api.editContact).not.toBeCalled();
    expect(Api.fetchAllContact).not.toBeCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it('edit firstName lastName age with valid input', async () => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Utils.Validator.firstNameValidator.mockReturnValue(true);
    Utils.Validator.lastNameValidator.mockReturnValue(true);
    Utils.Validator.ageValidator.mockReturnValue(true);
    Api.editContact.mockResolvedValue({
      data: {
        message: 'Contact edited',
        data: {
          id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
          firstName: 'Harry',
          lastName: 'Potter',
          age: 26,
          photo: 'N/A',
        },
      },
    });
    const route = {
      params: {
        actionStatus: 'EDIT',
        contactDetail: {
          id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
          firstName: 'Harry',
          lastName: 'Potter',
          age: 24,
          photo: 'N/A',
        },
      },
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByText, getByTestId, toJSON} = render(component);

    const firstNameInput = getByTestId('first-name-text-input');
    const lastNameInput = getByTestId('last-name-text-input');
    const agePicker = getByTestId('age-picker');

    const saveButton = getByText('Simpan');

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const ageValue = '26';

    fireEvent.changeText(firstNameInput, firstNameValue);
    fireEvent.changeText(lastNameInput, lastNameValue);
    fireEvent(agePicker, 'onValueChange', ageValue);

    fireEvent.press(saveButton);
    expect(Utils.Validator.firstNameValidator).toBeCalledWith(firstNameValue);
    expect(Utils.Validator.lastNameValidator).toBeCalledWith(lastNameValue);
    expect(Utils.Validator.ageValidator).toBeCalledWith(ageValue);
    await waitForElementToBeRemoved(() => getByText('Memperbarui kontak...'));
    expect(Api.editContact).toBeCalled();
    expect(navigation.goBack).toBeCalled();

    expect(toJSON()).toMatchSnapshot();
  });

  it('open modal when pressing big photo', async () => {
    const route = {
      params: {
        actionStatus: 'CREATE',
      },
    };
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByTestId, getAllByTestId} = render(component);
    const photoBigButton = getByTestId('photo-big-button');
    const pickPhotoModal = getAllByTestId('pick-photo-modal')[0];

    fireEvent.press(photoBigButton);
    await waitFor(() => expect(pickPhotoModal.props.visible).toEqual(true));
  });

  it('create when form invalid', async () => {
    const route = {
      params: {
        actionStatus: 'CREATE',
      },
    };
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Utils.Validator.firstNameValidator.mockReturnValue(false);
    Utils.Validator.lastNameValidator.mockReturnValue(false);
    Utils.Validator.ageValidator.mockReturnValue(false);
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getByTestId, getByText, toJSON} = render(component);
    const saveButton = getByText('Simpan');
    fireEvent.press(saveButton);

    expect(Utils.Validator.firstNameValidator).toBeCalledWith('');
    expect(Utils.Validator.lastNameValidator).toBeCalledWith('');
    expect(Utils.Validator.ageValidator).toBeCalledWith('0');

    expect(Utils.Validator.firstNameValidator).toHaveReturnedWith(false);
    expect(Utils.Validator.lastNameValidator).toHaveReturnedWith(false);
    expect(Utils.Validator.ageValidator).toHaveReturnedWith(false);

    await waitFor(() => getByTestId('last-name-error-message'));

    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handle modal correctly photo', async () => {
    const route = {
      params: {
        actionStatus: 'CREATE',
      },
    };
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    Utils.Validator.firstNameValidator.mockReturnValue(false);
    Utils.Validator.lastNameValidator.mockReturnValue(false);
    Utils.Validator.ageValidator.mockReturnValue(false);
    const component = (
      <Provider store={store}>
        <CreateEditContactScreen navigation={navigation} route={route} />
      </Provider>
    );

    const {getAllByTestId, getByTestId, toJSON} = render(component);
    const photoBigButton = getByTestId('photo-big-button');
    const photoModal = getAllByTestId('pick-photo-modal')[0];
    fireEvent.press(photoBigButton);
    expect(photoModal.props.visible).toEqual(true);
    const tree1 = toJSON();
    expect(tree1).toMatchSnapshot();

    fireEvent(photoModal, 'onBackdropPress', undefined);

    await waitFor(() => expect(photoModal.props.visible).toEqual(false));
    expect(photoModal.props.visible).toEqual(false);
  });
});
