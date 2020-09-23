import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AgePicker} from '../components/common';
import BackButton from '../components/common/BackButton';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarButton from '../components/common/HeaderBarButton';
import HeaderBarTitle from '../components/common/HeaderBarTitle';
import PhotoBig from '../components/common/PhotoBig';
import PhotoModal from '../components/common/PhotoModal';
import useLoading from '../hook/useLoading';
import * as ContactActions from '../redux/actions/contact';
import {Api} from '../services';
import {Colors, Mixins, Spacing, Typography} from '../styles';
import Utils from '../utils';

export default function CreateEditContactScreen({navigation, route}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('0');
  const [photo, setPhoto] = useState('N/A');

  const dispatch = useDispatch();

  const [validateStatus, setValidateStatus] = useState({
    firstName: true,
    lastName: true,
    age: true,
  });

  const {isLoading, startLoading, stopLoading} = useLoading();
  const actionStatus = route.params?.actionStatus;
  const contactDetail = route.params?.contactDetail || {
    photo: 'N/A',
    firstName: '',
    lastName: '',
    age: '0',
  };
  useEffect(() => {
    if (actionStatus === 'EDIT') {
      setFirstName(contactDetail.firstName);
      setLastName(contactDetail.lastName);
      setAge(String(contactDetail.age));
      setPhoto(contactDetail.photo);
    }
  }, [
    actionStatus,
    contactDetail.firstName,
    contactDetail.lastName,
    contactDetail.photo,
    contactDetail.age,
  ]);

  function _handleBackButton() {
    navigation.goBack();
  }

  function _handleOnChangeTextFirstName(text) {
    setFirstName(text);
  }
  function _handleOnChangeTextLastName(text) {
    setLastName(text);
  }
  function _handleOnChangeTextAge(text) {
    setAge(text);
  }

  const [modal, setModal] = useState('');
  function openModal() {
    setModal('PHOTO');
  }
  function closeModal() {
    setModal('');
  }

  function _handleDelete() {
    setPhoto('N/A');
    closeModal();
  }

  async function _handleGallery() {
    try {
      Utils.UImagePicker.selectGallery(_handleGallery, (value) => {
        if (value !== null) {
          setPhoto(value);
        }
      });
    } catch (error) {}
  }

  async function _handleCamera() {
    try {
      Utils.UImagePicker.takePhoto(_handleCamera, (value) => {
        if (value !== null) {
          setPhoto(value);
        }
      });
    } catch (e) {}
  }

  async function _handleOnPressSave() {
    const isFirstNameValid = Utils.Validator.firstNameValidator(firstName);
    const isLastNameValid = Utils.Validator.lastNameValidator(lastName);
    const isAgeValid = Utils.Validator.ageValidator(age);
    setValidateStatus({
      firstName: isFirstNameValid,
      lastName: isLastNameValid,
      age: isAgeValid,
    });
    if (isFirstNameValid && isLastNameValid && isAgeValid) {
      if (actionStatus === 'EDIT') {
        startLoading();
        try {
          await Api.editContact({
            id: contactDetail.id,
            firstName: firstName,
            lastName: lastName,
            age: String(age),
            photo: photo,
          });
          stopLoading();
          dispatch(
            ContactActions.updateContact({
              id: contactDetail.id,
              firstName: firstName,
              lastName: lastName,
              age: String(age),
              photo: photo,
            }),
          );
          ToastAndroid.show('Kontak telah diperbarui.', ToastAndroid.SHORT);
          navigation.goBack();
        } catch (e) {
          stopLoading();
          Utils.SmallMessage.showError();
          console.log(e.response.data);
        }
      } else {
        startLoading();
        try {
          await Api.addContact({
            firstName: firstName,
            lastName: lastName,
            age: String(age),
            photo: photo,
          });
          const response = await Api.fetchAllContact();
          stopLoading();
          dispatch(ContactActions.setContactList({data: response.data.data}));
          ToastAndroid.show('Kontak telah tersimpan.', ToastAndroid.SHORT);
          navigation.goBack();
        } catch (error) {
          stopLoading();
          Utils.SmallMessage.showError();
          console.log(error);
        }
      }
    }
  }

  return (
    <View style={styles.createEditContactScreen}>
      <HeaderBar
        isLoading={isLoading}
        loadingMessage={
          actionStatus === 'EDIT'
            ? 'Memperbarui kontak...'
            : 'Menyimpan kontak...'
        }>
        <BackButton onPress={_handleBackButton} />
        <HeaderBarTitle
          text={`${actionStatus === 'EDIT' ? 'Ubah' : 'Tambah'} kontak`}
        />
        <HeaderBarButton text={'Simpan'} onPress={_handleOnPressSave} />
      </HeaderBar>
      <View style={[styles.photoButtonView]}>
        <PhotoBig
          onPress={openModal}
          photo={photo}
          firstName={firstName}
          lastName={lastName}
        />
      </View>
      <TextInput
        testID={'first-name-text-input'}
        style={styles.textInput}
        placeholder={'Nama depan'}
        onChangeText={_handleOnChangeTextFirstName}
        value={firstName}
      />
      {validateStatus.firstName === false && (
        <Text
          testID={'first-name-error-message'}
          style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
          {
            '* Terdiri dari 3 - 30 karakter\n* Hanya diperbolehkan alfanumerik (a-zA-Z0-9)'
          }
        </Text>
      )}
      <TextInput
        testID={'last-name-text-input'}
        style={styles.textInput}
        placeholder={'Nama belakang'}
        onChangeText={_handleOnChangeTextLastName}
        value={lastName}
      />
      {validateStatus.lastName === false && (
        <Text
          testID={'last-name-error-message'}
          style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
          {
            '* Terdiri dari 3 - 30 karakter\n* Hanya diperbolehkan alfanumerik (a-zA-Z0-9)'
          }
        </Text>
      )}
      <View style={styles.agePickerView}>
        <AgePicker
          selectedValue={age}
          style={styles.agePicker}
          onValueChange={_handleOnChangeTextAge}
        />
      </View>
      {validateStatus.age === false && (
        <Text
          testID={'age-error-message'}
          style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
          {'* Rentang umur 1 - 100'}
        </Text>
      )}
      <PhotoModal
        onPressAbort={closeModal}
        hasPhoto={photo !== 'N/A'}
        isVisible={modal === 'PHOTO'}
        onPressCamera={_handleCamera}
        onPressGallery={_handleGallery}
        onPressDelete={_handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  createEditContactScreen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  textInput: {
    ...Typography.baseText,
    ...Mixins.textInputBottomBorder,
    marginHorizontal: Spacing.base,
  },
  photoButtonView: {
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  agePickerView: {
    ...Mixins.textInputBottomBorder,
    marginHorizontal: Spacing.base,
    padding: 0,
  },
  agePicker: {
    ...Typography.baseText,
  },
});
