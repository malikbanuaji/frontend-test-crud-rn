import React from 'react';
import renderer from 'react-test-renderer';
import DangerButton from '../DangerButton';

test('renders correctly', () => {
  const tree = renderer.create(<DangerButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
