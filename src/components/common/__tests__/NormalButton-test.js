import React from 'react';
import renderer from 'react-test-renderer';
import NormalButton from '../NormalButton';

test('renders correctly', () => {
  const tree = renderer.create(<NormalButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when disabled', () => {
  const tree = renderer.create(<NormalButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});
