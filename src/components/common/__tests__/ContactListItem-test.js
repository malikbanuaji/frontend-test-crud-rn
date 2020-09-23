import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import ContactListItem from '../ContactListItem';

test('renders correctly', () => {
  const tree = render(<ContactListItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without image', () => {
  const tree = render(<ContactListItem photo={'N/A'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly only age', () => {
  const tree = render(<ContactListItem age={'23'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly only lastName', () => {
  const tree = render(<ContactListItem lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly only firstname', () => {
  const tree = render(<ContactListItem firstName={'John'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with full props', () => {
  const tree = render(
    <ContactListItem
      firstName={'John'}
      lastName={'Doe'}
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
      age={23}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press', () => {
  const mockOnPress = jest.fn();
  const {getByTestId} = render(
    <ContactListItem
      id={'1'}
      onPress={mockOnPress}
      firstName={'John'}
      lastName={'Doe'}
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
      age={23}
    />,
  );
  const button = getByTestId('contact-list-item-button');
  fireEvent.press(button);
  expect(mockOnPress).toBeCalledWith(expect.objectContaining({id: '1'}));
});
