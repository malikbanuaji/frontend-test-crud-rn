import React from 'react';

import renderer from 'react-test-renderer';
import BaseButton from '../BaseButton';

test('renders correctly', () => {
  const tree = renderer.create(<BaseButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
