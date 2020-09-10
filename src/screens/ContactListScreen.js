import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActionAddContact from '../components/common/ActionAddContact';
import ContactListItem from '../components/common/ContactListItem';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarTitle from '../components/common/HeaderBarTitle';
import {setContactList} from '../redux/actions/contact';
import {Api} from '../services';
import {Colors, Spacing, Typography} from '../styles';
import Utils from '../utils';

export default function ContactListScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const _handlePressContactListItem = useCallback(
    (item) => {
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
        Utils.SmallMessage.showError();
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
        <HeaderBarTitle text={'KontakMu'} />
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
    right: Spacing.base,
    bottom: Spacing.base,
  },
});
