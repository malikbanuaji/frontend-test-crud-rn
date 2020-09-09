import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableNativeFeedback,
  Image,
  useWindowDimensions,
} from 'react-native';
import BackButton from '../components/common/BackButton';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarButton from '../components/common/HeaderBarButton';
import {Colors, Spacing, Typography, Mixins} from '../styles';
import HeaderBarTitle from '../components/common/HeaderBarTitle';
import {Api} from '../services';
import {useDispatch} from 'react-redux';
import * as ContactActions from '../redux/actions/contact';

export default function CreateEditContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('N/A');

  const navigation = useNavigation();
  const route = useRoute();

  const windows = useWindowDimensions();
  const photoSize = useMemo(() => {
    return {
      width: windows.width * 0.3,
      height: windows.width * 0.3,
    };
  }, [windows.width]);
  const dispatch = useDispatch();

  const actionStatus = route.params?.actionStatus;
  const contactDetail = route.params?.contactDetail || {};
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

  function _handleOnPickPhoto() {
    setPhoto();
  }

  function _handleOnPressSave() {
    if (actionStatus === 'EDIT') {
      Api.editContact({
        id: contactDetail.id,
        firstName: firstName,
        lastName: lastName,
        age: String(age),
        photo: photo,
      })
        .then((response) => {
          dispatch(
            ContactActions.updateContact({
              id: contactDetail.id,
              firstName: firstName,
              lastName: lastName,
              age: String(age),
              photo: photo,
            }),
          );
        })
        .catch((e) => {});
    } else {
      Api.addContact({
        firstName: firstName,
        lastName: lastName,
        age: String(age),
        photo: photo,
      })
        .then((response) => {
          dispatch(
            ContactActions.addNewContact({
              id: response.data.id,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              age: String(response.data.age),
              photo: response.data.photo,
            }),
          );
        })
        .catch((e) => {});
    }
  }

  const _isDisabled = useMemo(() => {
    return firstName.length <= 0 || lastName.length <= 0 || age.length <= 0;
  }, [age.length, firstName.length, lastName.length]);

  return (
    <View style={styles.createEditContactScreen}>
      <HeaderBar>
        <BackButton onPress={_handleBackButton} />
        <HeaderBarTitle
          text={`${actionStatus === 'EDIT' ? 'Ubah' : 'Tambah'} kontak`}
        />
        <HeaderBarButton
          disabled={_isDisabled}
          style={styles.saveButton}
          text={'Simpan'}
          onPress={_handleOnPressSave}
        />
      </HeaderBar>
      <View style={[styles.photoButtonView]}>
        <View style={styles.photo}>
          <TouchableNativeFeedback>
            <View style={[styles.emptyPhoto, styles.photo]}>
              <Image
                source={{uri: photo === 'N/A' ? null : photo}}
                {...photoSize}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={'Nama depan'}
        onChangeText={_handleOnChangeTextFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Nama belakang'}
        onChangeText={_handleOnChangeTextLastName}
        value={lastName}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Umur'}
        keyboardType={'decimal-pad'}
        onChangeText={_handleOnChangeTextAge}
        value={age}
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

  saveButton: {},
  textInput: {
    ...Typography.baseText,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginHorizontal: Spacing.base,
  },
  photo: {
    borderRadius: Mixins.borderRadius,
    overflow: 'hidden',
  },
  photoButtonView: {
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  emptyPhoto: {
    backgroundColor: Colors.primary,
  },
});
