import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import AgePicker from '../components/common/AgePicker';
import BackButton from '../components/common/BackButton';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarButton from '../components/common/HeaderBarButton';
import HeaderBarTitle from '../components/common/HeaderBarTitle';
import HeaderLoading from '../components/common/HeaderLoading';
import PhotoBig from '../components/common/PhotoBig';
import PhotoModal from '../components/common/PhotoModal';
import useLoading from '../hook/useLoading';
import * as ContactActions from '../redux/actions/contact';
import {Api} from '../services';
import {Colors, Mixins, Spacing, Typography} from '../styles';
import Utils from '../utils';

export default function CreateEditContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('0');
  const [photo, setPhoto] = useState('N/A');

  const [validateStatus, setValidateStatus] = useState({
    firstName: true,
    lastName: true,
    age: true,
  });

  const {isLoading, startLoading, stopLoading} = useLoading();

  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

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

  function openGalleryPicker() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperStatusBarColor: Colors.primary,
      cropperCancelText: 'Batal',
      cropperChooseText: 'Pilih',
      cropperToolbarTitle: 'Ubah gambar',
      includeBase64: true,
      cropperToolbarColor: Colors.primary,
      multiple: false,
      cropperToolbarWidgetColor: Colors.white,
    })
      .then((value) => {
        setPhoto(`data:${value.mime};base64,${value.data}`);
        closeModal();
      })
      .catch((e) => {
        closeModal();
      });
  }

  function openPickCamera() {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropping: true,
      cropperStatusBarColor: Colors.primary,
      cropperCancelText: 'Batal',
      cropperChooseText: 'Pilih',
      cropperToolbarTitle: 'Ubah gambar',
      includeBase64: true,
      cropperToolbarColor: Colors.primary,
      multiple: false,
      cropperToolbarWidgetColor: Colors.white,
    })
      .then((value) => {
        setPhoto(`data:${value.mime};base64,${value.data}`);
        closeModal();
      })
      .catch((e) => {
        closeModal();
      });
  }

  function _handleGallery() {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]).then((multipleResult) => {
      if (Object.values(multipleResult).includes('never_ask_again')) {
        Utils.PopUp.popAskPermissionCamera(() => Linking.openSettings());
      } else if (Object.values(multipleResult).includes('denied')) {
        Utils.PopUp.popAskPermissionCamera(() => _handleGallery());
      } else {
        openGalleryPicker();
      }
    });
  }

  function _handleCamera() {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]).then((multipleResult) => {
      if (Object.values(multipleResult).includes('never_ask_again')) {
        Utils.PopUp.popAskPermissionCamera(() => Linking.openSettings());
      } else if (Object.values(multipleResult).includes('denied')) {
        Utils.PopUp.popAskPermissionCamera(() => _handleCamera());
      } else {
        openPickCamera();
      }
    });
  }

  function _handleOnPressSave() {
    const isFirstNameValid = Utils.Validator.firstNameValidator(firstName);
    const isLastNameValid = Utils.Validator.lastNameValidator(lastName);
    const isAgeValid = Number(age) <= 100 && Number(age) > 0;
    setValidateStatus({
      firstName: isFirstNameValid,
      lastName: isLastNameValid,
      age: isAgeValid,
    });
    if (isFirstNameValid && isLastNameValid && isAgeValid) {
      if (actionStatus === 'EDIT') {
        startLoading();
        Api.editContact({
          id: contactDetail.id,
          firstName: firstName,
          lastName: lastName,
          age: String(age),
          photo: photo,
        })
          .then(() => {
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
          })
          .catch((e) => {
            stopLoading();
            Utils.SmallMessage.showError();
            console.log(e.response.data);
          });
      } else {
        startLoading();
        Api.addContact({
          firstName: firstName,
          lastName: lastName,
          age: String(age),
          photo: photo,
        })
          .then(() => {
            Api.fetchAllContact()
              .then((response) => {
                stopLoading();
                dispatch(
                  ContactActions.setContactList({data: response.data.data}),
                );
                ToastAndroid.show(
                  'Kontak telah tersimpan.',
                  ToastAndroid.SHORT,
                );
                navigation.goBack();
              })
              .catch((e) => {
                stopLoading();
                Utils.SmallMessage.showError();
              });
          })
          .catch((e) => {
            stopLoading();
            Utils.SmallMessage.showError();
          });
      }
    }
  }

  return (
    <View style={styles.createEditContactScreen}>
      <HeaderBar>
        {isLoading ? (
          <HeaderLoading
            text={
              actionStatus === 'EDIT'
                ? 'Memperbarui kontak...'
                : 'Menyimpan kontak...'
            }
          />
        ) : (
          <>
            <BackButton onPress={_handleBackButton} />
            <HeaderBarTitle
              text={`${actionStatus === 'EDIT' ? 'Ubah' : 'Tambah'} kontak`}
            />
            <HeaderBarButton
              disabled={false}
              style={styles.saveButton}
              text={'Simpan'}
              onPress={_handleOnPressSave}
            />
          </>
        )}
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
        style={styles.textInput}
        placeholder={'Nama depan'}
        onChangeText={_handleOnChangeTextFirstName}
        value={firstName}
      />
      {validateStatus.firstName === false && (
        <Text style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
          {
            '* Terdiri dari 3 - 30 karakter\n* Hanya diperbolehkan alfanumerik (a-zA-Z0-9)'
          }
        </Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder={'Nama belakang'}
        onChangeText={_handleOnChangeTextLastName}
        value={lastName}
      />
      {validateStatus.lastName === false && (
        <Text style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
          {
            '* Terdiri dari 3 - 30 karakter\n* Hanya diperbolehkan alfanumerik (a-zA-Z0-9)'
          }
        </Text>
      )}
      <View style={styles.agePickerView}>
        <AgePicker
          maxAge={100}
          selectedValue={age}
          style={styles.agePicker}
          onValueChange={_handleOnChangeTextAge}
        />
      </View>
      {validateStatus.age === false && (
        <Text style={{color: Colors.danger, marginHorizontal: Spacing.base}}>
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
