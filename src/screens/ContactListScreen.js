import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActionAddContact from '../components/common/ActionAddContact';
import HeaderBar from '../components/common/HeaderBar';
import HeaderBarTitle from '../components/common/HeaderBarTitle';
import ContactList from '../components/contact/ContactList';
import {setContactList} from '../redux/actions/contact';
import {Api} from '../services';
import {Colors, Spacing} from '../styles';
import Utils from '../utils';

export default function ContactListScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false);

  const _handlePressContactListItem = useCallback(
    (item) => {
      navigation.navigate('ContactDetail', {id: item.id});
    },
    [navigation],
  );
  const dispatch = useDispatch();

  const fetchAllContact = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Api.fetchAllContact();
      dispatch(setContactList({data: response.data.data}));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Utils.SmallMessage.showError();
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllContact();
  }, [fetchAllContact]);

  const contactList = useSelector((state) => state.contact.data);

  function _handlePressAddContact() {
    navigation.navigate('CreateEditContact');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'dark-content'} />
      <HeaderBar isLoading={false}>
        <HeaderBarTitle text={'KontakMu'} />
      </HeaderBar>
      <ContactList
        refreshing={isLoading}
        onRefresh={fetchAllContact}
        data={contactList}
        onPressItem={_handlePressContactListItem}
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
