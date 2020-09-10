import React from 'react';
import renderer from 'react-test-renderer';
import HeaderLoading from '../HeaderLoading';

test('renders correctly', () => {
  const tree = renderer.create(<HeaderLoading />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props `text`', () => {
  const tree = renderer.create(<HeaderLoading text={'Menunggu'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
