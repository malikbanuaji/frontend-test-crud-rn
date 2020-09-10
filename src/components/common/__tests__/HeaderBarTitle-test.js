import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBarTitle from '../HeaderBarTitle';

test('renders correctly', () => {
  const tree = renderer.create(<HeaderBarTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props `text`', () => {
  const tree = renderer.create(<HeaderBarTitle text={'Hello'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
