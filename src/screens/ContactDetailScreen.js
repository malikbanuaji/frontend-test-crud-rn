import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../components/common/BackButton';
import DangerButton from '../components/common/DangerButton';
import HeaderBar from '../components/common/HeaderBar';
import HeaderLoading from '../components/common/HeaderLoading';
import NormalButton from '../components/common/NormalButton';
import PhotoBig from '../components/common/PhotoBig';
import * as ContactActions from '../redux/actions/contact';
import {Api} from '../services';
import {Spacing, Typography} from '../styles';
import Utils from '../utils';
import FullName from '../components/common/FullName';

export default function ContactDetailScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const _id = route.params?.id;
  const contactList = useSelector((state) => state.contact.data);

  const contactDetail = useMemo(() => {
    const _detail = contactList.find((value) => value.id === _id) || {};

    return {
      id: _id,
      photo: _detail.photo,
      firstName: _detail.firstName,
      lastName: _detail.lastName,
      age: _detail.age,
    };
  }, [_id, contactList]);

  function _handleBackButton() {
    navigation.goBack();
  }

  const [isLoading, setIsLoading] = useState(false);

  function deleteContact() {
    setIsLoading(true);
    Api.deleteContact(_id)
      .then(() => {
        setIsLoading(false);
        dispatch(ContactActions.deleteContact({id: _id}));
        navigation.goBack();
      })
      .catch((e) => {
        setIsLoading(false);
        Utils.SmallMessage.showError();
      });
  }

  function _handlePressDelete() {
    Alert.alert('Hapus Kontak', 'Kontak ini akan dihapus', [
      {
        text: 'BATAL',
      },
      {
        text: 'HAPUS',
        onPress: deleteContact,
      },
    ]);
  }

  function _handlePressEdit() {
    navigation.navigate('CreateEditContact', {
      actionStatus: 'EDIT',
      contactDetail: contactDetail,
    });
  }

  return (
    <View>
      <HeaderBar>
        {isLoading ? (
          <HeaderLoading text={'Menghapus kontak...'} />
        ) : (
          <BackButton onPress={_handleBackButton} />
        )}
      </HeaderBar>
      <View style={styles.photoButtonView}>
        <PhotoBig
          photo={contactDetail.photo}
          firstName={contactDetail.firstName}
          lastName={contactDetail.lastName}
        />
      </View>
      <View style={styles.contentContainer}>
        <FullName
          firstName={contactDetail.firstName}
          lastName={contactDetail.lastName}
        />
        <Text key={'age'} style={styles.age}>
          {`${contactDetail.age}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <NormalButton
          disabled={isLoading === true}
          style={styles.button}
          text={'Ubah kontak'}
          onPress={_handlePressEdit}
        />
        <DangerButton
          disabled={isLoading === true}
          style={styles.button}
          text={'Hapus kontak'}
          onPress={_handlePressDelete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: Spacing.base,
  },
  photoButtonView: {
    marginBottom: Spacing.base,
    alignItems: 'center',
  },

  age: {
    ...Typography.contactSubtitle,
    marginHorizontal: Spacing.base,
  },
  buttonContainer: {
    marginTop: Spacing.smaller,
  },
  button: {
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.smaller,
  },
});
