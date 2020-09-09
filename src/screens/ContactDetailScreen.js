import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Alert,
} from 'react-native';
import DangerButton from '../components/common/DangerButton';
import NormalButton from '../components/common/NormalButton';
import {Colors, Mixins, Spacing, Typography} from '../styles';
import HeaderBar from '../components/common/HeaderBar';
import BackButton from '../components/common/BackButton';
import {Api} from '../services';
import {useDispatch, useSelector} from 'react-redux';
import * as ContactActions from '../redux/actions/contact';

export default function ContactDetailScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const windows = useWindowDimensions();
  const photoSize = useMemo(() => {
    return {
      width: windows.width * 0.3,
      height: windows.width * 0.3,
    };
  }, [windows.width]);
  const _id = route.params?.id;
  const contactList = useSelector((state) => state.contact.data);

  const contactDetail = useMemo(() => {
    const _detail = contactList.find((value) => value.id === _id);

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

  function deleteContact() {
    Api.deleteContact(_id)
      .then(() => {
        dispatch(ContactActions.deleteContact({id: _id}));
      })
      .catch((e) => {
        console.log(e.response.data);
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
        <BackButton onPress={_handleBackButton} />
      </HeaderBar>
      <Image
        style={styles.photo}
        source={{uri: contactDetail.photo}}
        {...photoSize}
      />
      <View style={styles.contentContainer}>
        <Text key={'name'} style={styles.name}>{`${
          contactDetail.firstName || 'Malik'
        } ${contactDetail.lastName || 'Banuaji'}`}</Text>
        {/* <View style={styles.divider} /> */}
        <Text key={'age'} style={styles.age}>
          {contactDetail.age || 23}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <NormalButton
          style={styles.button}
          text={'Ubah kontak'}
          onPress={_handlePressEdit}
        />
        <DangerButton
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
  photo: {
    borderRadius: Mixins.borderRadius,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    marginBottom: Spacing.base,
  },
  name: {
    ...Typography.contactTitle,
    marginHorizontal: Spacing.base,
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
  divider: {
    height: 2,
    backgroundColor: Colors.lightGray,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.small,
  },
});
