import React from 'react';

import renderer from 'react-test-renderer';
import ContactListItem from '../ContactListItem';

test('renders correctly', () => {
  const tree = renderer.create(<ContactListItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without image', () => {
  const tree = renderer.create(<ContactListItem photo={'N/A'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders correctly only age', () => {
  const tree = renderer.create(<ContactListItem age={'23'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly only lastName', () => {
  const tree = renderer.create(<ContactListItem lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly only firstname', () => {
  const tree = renderer.create(<ContactListItem firstName={'John'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with full props', () => {
  const tree = renderer
    .create(
      <ContactListItem
        firstName={'John'}
        lastName={'Doe'}
        photo={
          'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
        }
        age={23}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
