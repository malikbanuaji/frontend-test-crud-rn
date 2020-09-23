import React from 'react';
import {FlatList, View} from 'react-native';
import {Spacing} from '../../styles';
import ContactListItem from '../common/ContactListItem';

function ContactList({refreshing, onRefresh, data, onPressItem}) {
  function _renderItem({item}) {
    return (
      <ContactListItem
        id={item.id}
        firstName={item.firstName}
        lastName={item.lastName}
        age={item.age}
        photo={item.photo}
        onPress={onPressItem}
      />
    );
  }

  function _keyExtractor(item) {
    return item.id;
  }

  return (
    <FlatList
      testID={'contact-list'}
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      ListFooterComponent={<View style={{marginBottom: Spacing.largest}} />}
    />
  );
}

export default ContactList;
