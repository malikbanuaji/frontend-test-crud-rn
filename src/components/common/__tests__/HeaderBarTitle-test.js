import {render} from '@testing-library/react-native';
import React from 'react';
import HeaderBarTitle from '../HeaderBarTitle';

test('renders correctly', () => {
  const tree = render(<HeaderBarTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props `text`', () => {
  const tree = render(<HeaderBarTitle text={'Hello'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
