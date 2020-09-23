import {render} from '@testing-library/react-native';
import React from 'react';
import {Text, View} from 'react-native';
import renderer from 'react-test-renderer';
import HeaderBar from '../HeaderBar';

test('renders correctly', () => {
  const tree = render(<HeaderBar />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when loading', () => {
  const tree = render(
    <HeaderBar isLoading loadingMessage={'Loading...'} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should renders with 3 children', () => {
  const {getByTestId} = render(
    <HeaderBar isLoading={false} loadingMessage={'Loading...'}>
      <Text children={'John'} />
      <Text children={'Doe'} />
      <Text children={'Bar'} />
    </HeaderBar>,
  );
  const headerBar = getByTestId('header-bar');
  expect(headerBar.children.length).toBe(3);
});
