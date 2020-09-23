import React from 'react';

import renderer from 'react-test-renderer';
import ContactList from '../ContactList';

test('renders correctly when empty', () => {
  const onRefreshMock = jest.fn();
  const onPressItemMock = jest.fn();

  const tree = renderer
    .create(
      <ContactList
        refreshing={false}
        onRefresh={onRefreshMock}
        onPressItem={onPressItemMock}
        data={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
