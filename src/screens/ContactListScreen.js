import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, StatusBar} from 'react-native';
import ActionAddContact from '../components/common/ActionAddContact';
import ContactListItem from '../components/common/ContactListItem';
import {Typography, Spacing, Colors} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {Api} from '../services';
import {useDispatch, useSelector} from 'react-redux';
import {setContactList} from '../redux/actions/contact';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarTitle from '../components/common/HeaderBarTitle';

export default function ContactListScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const _handlePressContactListItem = useCallback(
    (item) => {
      console.log(item);
      navigation.navigate('ContactDetail', {id: item.id});
    },
    [navigation],
  );
  const dispatch = useDispatch();

  const fetchAllContact = useCallback(() => {
    setIsLoading(true);
    Api.fetchAllContact()
      .then((response) => {
        dispatch(setContactList({data: response.data.data}));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchAllContact();
  }, [fetchAllContact]);

  const contactList = useSelector((state) => state.contact.data);

  function _renderItem({item}) {
    return (
      <ContactListItem
        id={item.id}
        firstName={item.firstName}
        lastName={item.lastName}
        age={item.age}
        photo={item.photo}
        onPress={_handlePressContactListItem}
      />
    );
  }

  function _keyExtractor(item) {
    return item.id;
  }

  function _handlePressAddContact() {
    navigation.navigate('CreateEditContact');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'dark-content'} />
      <HeaderBar>
        <HeaderBarTitle text={'Kontak Mu'} />
      </HeaderBar>
      <FlatList
        refreshing={isLoading}
        onRefresh={fetchAllContact}
        data={contactList}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        ListFooterComponent={<View style={{marginBottom: Spacing.largest}} />}
      />
      <View style={styles.actionContainer}>
        <ActionAddContact onPress={_handlePressAddContact} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  actionContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  headerTitle: {
    ...Typography.headerTitle,
    paddingVertical: Spacing.base,
  },
  headerDivider: {
    marginHorizontal: Spacing.largest,
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.gray,
    marginBottom: Spacing.base,
  },
});
