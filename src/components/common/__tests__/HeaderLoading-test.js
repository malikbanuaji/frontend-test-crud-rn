import {render} from '@testing-library/react-native';
import React from 'react';
import HeaderLoading from '../HeaderLoading';

test('renders correctly', () => {
  const tree = render(<HeaderLoading />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props `text`', () => {
  const tree = render(<HeaderLoading text={'Menunggu'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
