import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ContactListItem from '../components/common/ContactListItem';
import SearchContact from '../components/common/SearchContact';
import ActionAddContact from '../components/common/ActionAddContact';

export default function ContactListScreen() {
  const [searchValue, setSearchValue] = useState('');

  function _renderItem({item, index}) {
    return (
      <ContactListItem
        firstName={item.firstName}
        lastName={item.lastName}
        age={item.age}
        photo={item.photo}
      />
    );
  }

  function _keyExtractor(item) {
    return item.id;
  }

  function _handlePressAddContact() {}
  function _handleOnChangeTextSearch(text) {
    setSearchValue(text);
  }

  return (
    <View style={styles.container}>
      <SearchContact
        onChangeText={_handleOnChangeTextSearch}
        value={searchValue}
      />
      <FlatList
        data={[]}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
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
});
